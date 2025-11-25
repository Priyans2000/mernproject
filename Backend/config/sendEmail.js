// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// //load env variables
// dotenv.config();

// //create transporter
// const sendMail = async (to, resetToken) => {
//     try {
//         // Check if required environment variables are set
//         if (!process.env.GMAIL_USER || !process.env.App_Pwd) {
//             throw new Error("GMAIL_USER and App_Pwd must be set in .env file");
//         }

//         //create transporter object 
//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 587,
//             secure: false, // true for 465, false for other ports
//             auth: {
//                 user: process.env.GMAIL_USER, //your gmail address to get env variable
//                 pass: process.env.App_Pwd, //your gmail app password to get env variable
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         });

//         // Verify transporter configuration
//         await transporter.verify();
//         // console.log("Email server is ready to send messages");

//         //send mail and create the mail 
//         const message = {
//             from: `"Your App" <${process.env.GMAIL_USER}>`, // sender address
//             to, // list of receivers
//             subject: "Reset Password", // Subject line
//             html: `<h1>Reset Password</h1>
//               You are receiving this email because you (or someone else) requested a password reset for your account.
//     Please click on the link below, or paste it into your browser to complete the process:<br><br>
//     https://localhost:5000/reset-password/${resetToken}<br><br>
//     If you did not request this, please ignore this email and your password will remain unchanged.`,
//         };
        
//         //send mail
//         const info = await transporter.sendMail(message);
//         console.log("Message sent: %s", info.messageId);
//         return { success: true, messageId: info.messageId };
//     } catch (error) {
//         console.error("Error sending email:", error.message);
        
//         // Provide helpful error messages
//         if (error.code === 'EAUTH') {
//             console.error("\n❌ Authentication failed! Please check:");
//             console.error("1. Make sure you're using Gmail App Password (not regular password)");
//             console.error("2. Enable 2-Step Verification in your Google Account");
//             console.error("3. Generate App Password: https://myaccount.google.com/apppasswords");
//             console.error("4. Use the 16-character App Password in your .env file");
//         }
        
//         return { success: false, error: error.message };
//     }
// }

// module.exports = sendMail;


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
                rejectUnauthorized: false
            }
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