import {Request, Response} from "express";
import QRCode from "qrcode";
import { createRegistration } from "../models/database.model";
import { sendConfirmationEmail } from "../services/email.service";

export const showRegistrationForm = (req: Request, res: Response) => {
    res.render("register");
}

export const submitRegistration = async (req: Request, res: Response) => {
    try {
        const {nama, email, jenis_kelamin, tanggal_reservasi} = req.body;

        // generate QR code
        const id = createRegistration(
            {nama,
            email,
            jenis_kelamin,
            tanggal_reservasi: tanggal_reservasi}
        )

        const qrCodeUrl = await QRCode.toDataURL(id);

        // send email
        await sendConfirmationEmail(email, qrCodeUrl);

        res.redirect("/");
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Internal Server Error");
    }
}