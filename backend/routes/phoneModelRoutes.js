import { Router } from "express";
import { getPhoneModels } from "../controllers/phoneModelController.js";

const router = Router();

// Public: list available phone models and their templates
router.get("/", getPhoneModels);

export default router;


