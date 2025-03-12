import {Request, Response} from "express";
import {v4 as uuidv4} from "uuid";
import { insertReservation } from "../models/reservationModel";
import { generateQRCode } from "../services/qrcodeService";
import { sendQRMail } from "../services/emailService";

export const postRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, email, gender, reservation_date} = req.body;

        // validasi input
        if (!name || !email || !gender || !reservation_date) {
            res.status(400).json({
                message: "data yang diberikan tidak lengkap"
            });
        }

        // generate unik id dengan uuid
        const id = uuidv4();
        const status = "belum konfirmasi"

        // simpan data reservasi ke database
        await insertReservation({id, name, email, gender, reservation_date, status});

        // generate qr code dari id unik
        const qrCodeDataUrl = await generateQRCode(id);

        // ubah tanggal menjadi lebih mudah dibaca
        const date = new Date(reservation_date);
        const options = {day: '2-digit', month: 'long', year: 'numeric'} as const;
        const formattedDate = date.toLocaleDateString('id-ID', options)

        // kirim qr code ke email pendaftar
        await sendQRMail(email, qrCodeDataUrl, name, formattedDate);

        // redirect ke halaman awal
        return res.redirect("/");
    } catch (error) {
        console.error("Terjadi error pada proses registrasi: ", error);
        res.status(500).json({
            message: "Terjadi kesalahan pada proses registrasi",
        });
    }
}