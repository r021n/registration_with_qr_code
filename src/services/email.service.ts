import nodemailer from "nodemailer";
import {compile} from "handlebars";
import { readFileSync } from "fs";
import {join} from "path";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const emailTemplate = compile(readFileSync(join(__dirname, '../views/email-template.hbs'), 'utf8'));

export const sendConfirmationEmail = async (email: string, qrCodeUrl: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Konfirmasi Reservasi",
        html: emailTemplate({qrCodeUrl})
    }

    await transporter.sendMail(mailOptions);
}