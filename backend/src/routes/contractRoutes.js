import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { uploadContractFile } from "../middleware/uploadMiddleware.js";

import {
  uploadContract,
  getUserContracts,
  deleteUserContract,
  reviewUserContract,
} from "../controllers/contractController.js";

const router = express.Router();

// Upload a contract
router.post(
  "/upload",
  requireAuth,
  uploadContractFile,
  uploadContract
);

// Get all contracts belonging to the logged-in user
router.get(
  "/",
  requireAuth,
  getUserContracts,

);

router.post(
  "/:contractId/review",
  requireAuth,
  reviewUserContract
);

// delte User contract
router.delete(
  "/:contractId",
  requireAuth,
  deleteUserContract
);

export default router;
