import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "../../../../lib/prismadb"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // check user existance
        const result = await prisma.user.findUnique({
          where: {
            employeeId: credentials.employeeId,
          },
        });

        if (!result) {
          throw new Error("No user found");
        }

        // compare password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.employeeId !== credentials.employeeId) {
          throw new Error("User or password does not match!");
        }


        return result;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        return { ...token, ...user };
    },
    async session({ session, token}) {

      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.employeeId = token.employeeId
      
      return session
    },
},
  secret: `${process.env.SECRET}`,
});
