import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

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

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

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

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({ 
      name, 
      email, 
      password,
      age: parseInt(age) || 10 
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: _, ...userWithoutPass } = newUser.toObject();
    res.status(201).json({ token, user: userWithoutPass });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

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

router.put("/profile", authMiddleware, upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, completedLevel } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (req.file) user.profilePic = `/uploads/${req.file.filename}`;

    let badgeEarned = null;


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user.lastActiveDate) {
      const lastActive = new Date(user.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
    } else {
      user.streak = 1;
    }
    user.lastActiveDate = today;

    if (completedLevel !== undefined) {
      const level = Number(completedLevel);
      if (!user.completedLevels.includes(level)) {
        user.completedLevels.push(level);
        
        user.gems += 50;
        user.experiencePoints += 100;

        const badgeAdded = user.addBadge(level);
        if (badgeAdded) {
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
        ? `You completed Level ${completedLevel} & earned the ${badgeEarned.name} badge!`
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