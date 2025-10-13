import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

// 🔹 Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 🔹 Check if email exists
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });
    
    res.json({
      success: true,
      exists: !!existingUser
    });
  } catch (err) {
    console.error("Check email error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // ✅ Let pre-save hook hash the password
    const newUser = await User.create({ name, email, password });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Exclude password in response
    const { password: _, ...userWithoutPass } = newUser.toObject();
    res.status(201).json({ token, user: userWithoutPass });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: _, ...userWithoutPass } = user.toObject();
    res.json({ token, user: userWithoutPass });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    console.error("Profile GET error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Update profile / level completion
router.put("/profile", authMiddleware, upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, completedLevel } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (req.file) user.profilePic = `/uploads/${req.file.filename}`;

    let badgeEarned = null;

    // Level completion & badge update
    if (completedLevel !== undefined) {
      const level = Number(completedLevel);
      if (!user.completedLevels.includes(level)) {
        user.completedLevels.push(level);
        
        // Award badge for the completed level
        const badgeAdded = user.addBadge(level);
        if (badgeAdded) {
          // Get the badge that was just added
          const newBadge = user.badges[user.badges.length - 1];
          badgeEarned = {
            name: newBadge.name,
            icon: newBadge.icon,
            description: newBadge.description,
            level: newBadge.level
          };
        }
      }
    }

    await user.save();

    res.json({
      success: true,
      message: badgeEarned
        ? `🎉 You completed Level ${completedLevel} & earned the ${badgeEarned.name} badge!`
        : "Profile updated successfully.",
      user,
      badgeEarned,
    });
  } catch (err) {
    console.error("Profile PUT error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;