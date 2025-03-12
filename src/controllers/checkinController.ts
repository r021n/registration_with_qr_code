import {Request, Response} from "express";
import { getReservationById, updateReservationStatusById } from "../models/reservationModel";

export const checkIn = async (req: Request, res: Response): Promise<void> => {
    try {
        // ambil data qr code dari body, yang diharapkan berupa string id
        const {qrCode} = req.body;
        if(!qrCode) {
            res.status(400).json({message: "QR code tidak diberikan"});
        }

        // cek data peserta apakah ada di database
        const reservation = await getReservationById(qrCode)
        if (reservation) {
            // jika ada, perbarui status menjadi terkonfirmasi
            await updateReservationStatusById(qrCode, "terkonfirmasi");
            res.json({message: "terdaftar"});
        } else {
            res.json({message: "tidak terdaftar"})
        }
    } catch (error) {
        console.error("Error pada proses check in: ", error);
        res.status(500).json({message: "terjadi kesalahan pada proses check in"})
    }
}