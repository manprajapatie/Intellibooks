import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import { db } from "./prisma/db.js";
import mainContractRoutes from "./routes/mainContractRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import { requireAuth } from "./middleware/requireAuth.js";

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

// Clerk middleware must run before protected routes
app.use(clerkMiddleware());


app.use(express.json());

app.use("/api/main-contract", mainContractRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contracts", contractRoutes);

app.get("/", (req, res) => {
  res.json({ message: "IntelliBooks API is running" });
});

app.get("/api/health/db", async (req, res) => {
  try {
    await db.connect();
    res.json({ message: "Database connected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/api/protected", requireAuth, (req, res) => {
  res.json({
    message: "Authentication successful",
    clerkUserId: req.userId
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});