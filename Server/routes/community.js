// backend/routes/community.js
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import Post from "../models/Post.js";

const router = express.Router();

// 🔹 Multer config for post images
const storage = multer.diskStorage({
  destination: "uploads/posts/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

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

// 🔹 Create a new post
router.post("/posts", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, content, tags, activityType, levelCompleted, isPublic } = req.body;
    
    const post = new Post({
      title,
      content,
      author: req.userId,
      tags: tags ? JSON.parse(tags) : [],
      activityType,
      levelCompleted: levelCompleted || null,
      isPublic: isPublic !== 'false',
      image: req.file ? `/uploads/posts/${req.file.filename}` : ""
    });

    await post.save();
    
    // Populate author info for response
    await post.populate('author', 'name profilePic badge completedLevels');
    
    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post
    });
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Delete post (author only)
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: "Post not found" 
      });
    }
    
    // Check if the current user is the author of the post
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false,
        message: "Not authorized to delete this post" 
      });
    }

    await Post.findByIdAndDelete(req.params.postId);
    
    res.json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
});

// 🔹 Get all posts (with pagination)
router.get("/posts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ isPublic: true })
      .populate('author', 'name profilePic badge completedLevels')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ isPublic: true });

    res.json({
      success: true,
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get posts by user
router.get("/posts/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ 
      author: req.params.userId,
      isPublic: true 
    })
    .populate('author', 'name profilePic badge completedLevels')
    .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (err) {
    console.error("Get user posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Like/Unlike a post
router.post("/posts/:postId/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const hasLiked = post.likes.includes(req.userId);
    
    if (hasLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== req.userId);
    } else {
      // Like
      post.likes.push(req.userId);
    }

    await post.save();
    
    res.json({
      success: true,
      liked: !hasLiked,
      likesCount: post.likes.length
    });
  } catch (err) {
    console.error("Like post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Add comment to post
router.post("/posts/:postId/comment", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.userId,
      text
    };

    post.comments.push(comment);
    await post.save();

    // Populate the new comment's user info
    await post.populate('comments.user', 'name profilePic');

    const newComment = post.comments[post.comments.length - 1];
    
    res.status(201).json({
      success: true,
      message: "Comment added successfully!",
      comment: newComment
    });
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Delete post (author only)
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.postId);
    
    res.json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;