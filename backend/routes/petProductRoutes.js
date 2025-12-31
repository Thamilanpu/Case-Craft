import express from "express";
import {
  adminCreatePetProduct,
  adminDeletePetProduct,
  adminAddTemplateToPet,
  adminRemoveTemplateFromPet,
  adminUpdatePetMockup,
  fetchPetProducts
} from "../controllers/petProductController.js";

const router = express.Router();

// Public
router.get("/", fetchPetProducts);

// Admin
router.post("/", adminCreatePetProduct);
router.delete("/:id",  adminDeletePetProduct);
router.post("/:id/templates", adminAddTemplateToPet);
router.delete("/:id/templates/:index",  adminRemoveTemplateFromPet);
router.put("/:id/mockup",  adminUpdatePetMockup);

export default router;
