const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendMail = async (to, resetToken) => {
  try {
    if (!process.env.GMAIL_USER || !process.env.App_Pwd) {
      throw new Error("GMAIL_USER and App_Pwd must be set in .env file");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.App_Pwd,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const message = {
      from: `"Your App" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Reset Password",
      html: `
                <h1>Reset Password</h1>
                You are receiving this email because you (or someone else) requested a password reset for your account.
                Please click on the link below, or paste it into your browser to complete the process:<br><br>
                https://localhost:5000/reset-password/${resetToken}<br><br>
                If you did not request this, please ignore this email and your password will remain unchanged.
            `,
     };

    const info = await transporter.sendMail(message);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = sendMail;
