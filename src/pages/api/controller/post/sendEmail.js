var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "",
    pass: "",
  },
  secure: true,
});

async function sendEmail({admin}){
  let mailOptions = {
    from: `"[ARITMA]" <Ekoten Fabrics>`, // sender address
    to: `${admin.email}`, // list of receivers
    subject: `[ARITMA] | Sistem tarafından size bir email gönderildi.`,
    html: `
    <body style="background-color: #2d2d2d; margin: 0 !important; padding: 0 !important;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td bgcolor="#2d2d2d" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                      <td bgcolor="#2d2d2d" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 400; line-height: 48px;">
                          <p style="font-size: 30px; color: #fbfbf1; font-weight: 400; margin: 2;">Arıtma Programı Sistem Mesajı</p> 
                      </td>
                  </tr>
              </table>
          </td>
      </tr>

      <tr>
            <td bgcolor="#2d2d2d" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#2d2d2d" align="center" style="padding: 20px 30px 40px 30px; color: #e4e8d5; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                             <p align="center" style="border-radius: 3px; font-weight: bold; color: #fbfbf1; margin: 4px 0px;" bgcolor="#FFA73B">Mesaj</p>    
                             <p style="margin: 0;">Zamanında veri girişi gerçekleşmeyen form(lar) bulunmaktadır.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#2d2d2d" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#2d2d2d" align="left" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <p align="left" style="border-radius: 3px; font-size:16px; font-weight: bold; color: #fbfbf1; margin: 4px 0px;" bgcolor="#FFA73B">Ekoten Fabrics</p>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                </table>
            </td>
        </tr>
      </table>
    </body>`
  }


  return transporter.sendMail(mailOptions);

}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const emailRes = await sendEmail(req.body);
    if (emailRes.messageId) {
      return res.status(200).json({ message: `Email sent successfuly` });
    }

    return res.status(400).json({ message: 'Error sending email' });
  }

  return res.status(400).json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });
}
