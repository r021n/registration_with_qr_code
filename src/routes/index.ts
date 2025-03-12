import { Router } from "express";
import { getReservationCount } from "../controllers/homeController";
import { postRegister } from "../controllers/registerController";
import { checkIn } from "../controllers/checkinController";

const router = Router();

// endpoint untuk update jumlah registrasi realtime
router.get("/api/count", getReservationCount);

// endpoint untuk menerima registrasi
router.post("/register", postRegister);

// endpoint untuk check kehadiran melalui qr code
router.post("/checkin", checkIn);

export default router;