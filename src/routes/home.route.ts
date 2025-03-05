import { Router } from "express";
import { showHomePage } from "../controllers/home.controller";

const router = Router();

router.get("/", showHomePage);

export default router;