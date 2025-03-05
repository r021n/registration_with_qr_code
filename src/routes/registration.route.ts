import { Router } from "express";
import { showRegistrationForm, submitRegistration } from "../controllers/registration.controller";

const router = Router();

router.get("/", showRegistrationForm);
router.post("/", submitRegistration);

export default router;