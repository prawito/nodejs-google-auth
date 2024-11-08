import { Router } from "express";
import { googleLogin, googleCallback } from "./login.controller.js";

const router = Router();

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router;