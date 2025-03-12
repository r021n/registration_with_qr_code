import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// buat transporter untuk mengirim email
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // gunakan true jika port SMTP 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendQRMail(to: string, qrCodeDataUrl: string, registrantName: string, reservationDate:string): Promise<void> {
    // formating nama file
    const filename = `${registrantName}_${reservationDate}.png`;

    // ekstrak bagian base64 dari data URL
    const base64Data = qrCodeDataUrl.split('base64,')[1];
    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject: "Konfirmasi reservasi dan QR code",
        html: `<p>Terimakasih telah melakukan reservasi. silahkan cer lampiran untuk QR code reservasi anda</p>`,
        attachments: [
            {
                filename,
                content: base64Data,
                encoding: 'base64'
            }
        ]
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log(`email berhasil terkirim ke ${to}`)
    } catch (error) {
        console.error(`gagalm mengirim email ke ${to}: `, error);
        throw error;
    }
}