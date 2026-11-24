import express from "express";
import { getCurrentUser } from "../controllers/authController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// Protected route
router.get("/me", requireAuth, getCurrentUser);

export default router;