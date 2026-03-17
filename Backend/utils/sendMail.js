const { model } = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (to,subject,text) => {
    try {
        const transporter = nodemailer.createTransport({
            secure:true,
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.MYEMAIL,
                pass: process.env.MYPASSWORD
            }
        })

        const mailOptions = {
            from: `"Car Rental" <${process.env.MYEMAIL}>`,
            to:to,
            subject:subject,
            text:text
        };

        await transporter.sendMail(mailOptions);

         const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info);
    } catch (err) {
        console.log('Error while sending email: ',err);
    }
}

module.exports = sendMail;