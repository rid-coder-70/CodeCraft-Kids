// --------------------------- Imports ---------------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

// --------------------------- Config Setup ---------------------------
dotenv.config();

const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------- Middleware ---------------------------
app.use(cors());
app.use(express.json());

// --------------------------- Routes ---------------------------
app.use("/api/auth", authRoutes);

// Serve static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// --------------------------- MongoDB Connection ---------------------------
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("❌ MONGODB_URI is not defined in .env");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("🧠 Full Error Details:", error);
    process.exit(1); // Stop the server if MongoDB fails
  }
};

connectDB();

// --------------------------- Server Setup ---------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
