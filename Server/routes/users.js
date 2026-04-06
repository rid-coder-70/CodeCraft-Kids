import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/platform-stats", async (req, res) => {
  try {
    const totalCount = await User.countDocuments();
    const ageResult = await User.aggregate([
      { $group: { _id: null, avgAge: { $avg: "$age" } } }
    ]);

    const avgAge = ageResult.length > 0 ? Math.round(ageResult[0].avgAge) : 11;

    res.json({
      success: true,
      stats: {
        totalUsers: 500 + totalCount,
        pythonLevels: 10,
        badgesToEarn: 10,
        averageAge: avgAge
      }
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
      .select("name profilePic currentBadge badges completedLevels gems experiencePoints streak createdAt")
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

router.get("/leaderboard", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find({})
      .select("name profilePic currentBadge badges completedLevels gems experiencePoints streak createdAt")
      .lean();

    const sorted = users
      .sort((a, b) => {
        const levelDiff = (b.completedLevels?.length || 0) - (a.completedLevels?.length || 0);
        if (levelDiff !== 0) return levelDiff;
        const gemDiff = (b.gems || 0) - (a.gems || 0);
        if (gemDiff !== 0) return gemDiff;
        const xpDiff = (b.experiencePoints || 0) - (a.experiencePoints || 0);
        if (xpDiff !== 0) return xpDiff;
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

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("name profilePic currentBadge badges completedLevels gems experiencePoints streak createdAt");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;