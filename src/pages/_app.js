import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function App({ Component, pageProps }) {
  return (
    <ProSidebarProvider>
      <SessionProvider session={pageProps.session}>
        <ToastContainer />
        <Component {...pageProps} />
      </SessionProvider>
    </ProSidebarProvider>
  );
}
