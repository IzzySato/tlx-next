import nodemailer from 'nodemailer';
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const init = () => {
  const oauth2Client = new OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.MAIL_REFRESH_TOKEN
  });

  return oauth2Client;
};

const sendEmail = async ({
  fName,
  lName,
  email,
  tel,
  address,
  service,
  comments}) => {

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: 'A Customer Requested an estimation',
      text: `Customer Infomation:
        Name: ${fName} ${lName}
        email: ${email}
        phone: ${tel}
        address: ${address}
        service: ${service}
        comments: ${comments}
      `
    };

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME, 
          clientId: process.env.MAIL_CLIENT_ID,
          clientSecret: process.env.MAIL_CLIENT_SECRET,
          refreshToken: process.env.MAIL_REFRESH_TOKEN,
          accessToken: init().getAccessToken()
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    try {
      smtpTransport.sendMail(mailOptions, (error, response) => {
        return (error) ? { status: false } : { status: true }
      });
    } catch (err) {
      console.log(err);
    } finally {
      smtpTransport.close();
    };
};

export {
  sendEmail
}
