import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { uploadContractFile } from "../middleware/uploadMiddleware.js";
import { uploadMainContract } from "../controllers/mainContractController.js";

const router = express.Router();

router.post(
  "/upload",
  requireAuth,
  requireAdmin,
  uploadContractFile,
  uploadMainContract
);

export default router;