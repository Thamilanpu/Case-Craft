import { Router } from "express";
import {
  adminLogin,
  forgotPassword,
  getProfile,
  loginUser,
  registerUser,
  resetPassword,
  syncCart,
  getCart
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/admin/login", adminLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/cart", protect, getCart);
router.post("/cart", protect, syncCart);

export default router;

