import { Router } from "express";
import {
  getOrders,
  deleteOrder,
  getStats,
  confirmOrder,
  getUsers,
  updateUserRole,
  deleteUser
} from "../controllers/adminController.js";
import {
  createPhoneModel,
  deletePhoneModel,
  getPhoneModels,
  addTemplateToModel,
  removeTemplateFromModel,
  updatePhoneModelMockup
} from "../controllers/phoneModelController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = Router();

router.get("/orders", protect, adminOnly, getOrders);
router.delete("/orders/:id", protect, adminOnly, deleteOrder);
router.get("/stats", protect, adminOnly, getStats);

// Phone model management (admin)
router.get("/phone-models", protect, adminOnly, getPhoneModels);
router.post("/phone-models", protect, adminOnly, createPhoneModel);
router.delete("/phone-models/:id", protect, adminOnly, deletePhoneModel);
router.post("/phone-models/:id/templates", protect, adminOnly, addTemplateToModel);
router.delete("/phone-models/:id/templates/:templateIndex", protect, adminOnly, removeTemplateFromModel);
router.patch("/phone-models/:id/mockup", protect, adminOnly, updatePhoneModelMockup);

// Order confirmation
router.post("/orders/:id/confirm", protect, adminOnly, confirmOrder);

// User management (admin)
router.get("/users", protect, adminOnly, getUsers);
router.patch("/users/:id/role", protect, adminOnly, updateUserRole);
router.delete("/users/:id", protect, adminOnly, deleteUser);

export default router;

