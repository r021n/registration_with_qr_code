import {Request, Response} from "express";
import { getTotalReservations } from "../models/reservationModel";

export const getReservationCount = async (req: Request, res: Response) => {
    try {
        const count = await getTotalReservations();
        res.status(200).json({count});
    } catch (error) {
        console.error("Error mengambil data: ", error);
        res.status(500).json({count: 0})
    }
}