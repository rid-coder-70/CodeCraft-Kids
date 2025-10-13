// backend/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  image: { type: String, default: "" },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  comments: [{
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  tags: [{ type: String }],
  activityType: { 
    type: String, 
    enum: ['project', 'achievement', 'question', 'tip', 'milestone'], 
    required: true 
  },
  levelCompleted: { type: Number },
  isPublic: { type: Boolean, default: true }
}, { 
  timestamps: true,
  versionKey: false 
});

const Post = mongoose.model("Post", postSchema);
export default Post;