import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// buat transporter untuk mengirim email
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // gunakan true jika port SMTP 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendQRMail(to: string, qrCodeDataUrl: string): Promise<void> {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject: "Konfirmasi reservasi dan QR code",
        html: `<p>Terimakasih telah melakukan reservasi. Berikut adalah QR code reservasi anda:</p>
                <img src=${qrCodeDataUrl} alt="QR Code">`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log(`email berhasil terkirim ke ${to}`)
    } catch (error) {
        console.error(`gagalm mengirim email ke ${to}: `, error);
        throw error;
    }
}