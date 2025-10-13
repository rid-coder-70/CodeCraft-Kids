import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Get all users (public profiles)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
      .select("name profilePic badge completedLevels createdAt")
      .sort({ completedLevels: -1, createdAt: -1 });

    res.json({
      success: true,
      users,
      totalUsers: users.length
    });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get user by ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("name profilePic badge completedLevels createdAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;