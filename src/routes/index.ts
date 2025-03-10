import { Router } from "express";
import { getReservationCount } from "../controllers/homeController";
import { postRegister } from "../controllers/registerController";

const router = Router();

// endpoint untuk update jumlah registrasi realtime
router.get("/api/count", getReservationCount);

// endpoint untuk menerima registrasi
router.post("/register", postRegister);

export default router;