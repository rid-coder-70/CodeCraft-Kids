import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Get all users (public profiles) — fixed field from 'badge' to 'currentBadge badges'
router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
      .select("name profilePic currentBadge badges completedLevels createdAt")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
      totalUsers: users.length
    });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Get leaderboard (top users by levels completed)
router.get("/leaderboard", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find({})
      .select("name profilePic currentBadge badges completedLevels createdAt")
      .lean();

    // Sort by completedLevels length then by join date
    const sorted = users
      .sort((a, b) => {
        const diff = (b.completedLevels?.length || 0) - (a.completedLevels?.length || 0);
        if (diff !== 0) return diff;
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
      .slice(0, limit)
      .map((u, idx) => ({ ...u, rank: idx + 1 }));

    res.json({ success: true, leaderboard: sorted });
  } catch (err) {
    console.error("Get leaderboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get user by ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("name profilePic currentBadge badges completedLevels createdAt");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;