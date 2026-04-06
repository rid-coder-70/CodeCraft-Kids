import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"] },
  password: { type: String, required: true, minlength: 6 },
  profilePic: { type: String, default: "" },
  badges: { 
    type: [{
      name: String,
      icon: String,
      description: String,
      earnedAt: { type: Date, default: Date.now },
      level: Number
    }], 
    default: [] 
  },
  completedLevels: { type: [Number], default: [] }, 
  currentBadge: { type: String, default: "FaStar" }, 
  gems: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  age: { type: Number, default: 10 },
  lastActiveDate: { type: Date, default: null },
  experiencePoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.addBadge = function(level) {
  const badgeConfig = {
    1: { name: "Python Beginner", icon: "FaPython", description: "Completed Level 1 - Hello World!" },
    2: { name: "Code Explorer", icon: "FaBoxOpen", description: "Completed Level 2 - Variables & Input" },
    3: { name: "Logic Master", icon: "FaCalculator", description: "Completed Level 3 - If/Else Statements" },
    4: { name: "Loop Champion", icon: "FaQuestionCircle", description: "Completed Level 4 - Loops & Patterns" },
    5: { name: "Function Wizard", icon: "FaCrown", description: "Completed Level 5 - Functions" },
    6: { name: "Data Expert", icon: "FaChartBar", description: "Completed Level 6 - Lists & Data" },
    7: { name: "Algorithm Pro", icon: "FaBolt", description: "Completed Level 7 - Algorithms" },
    8: { name: "Project Creator", icon: "FaRocket", description: "Completed Level 8 - Mini Projects" },
    9: { name: "Code Artist", icon: "FaPalette", description: "Completed Level 9 - Creative Coding" },
    10: { name: "Python Master", icon: "FaTrophy", description: "Completed Level 10 - Final Challenge" }
  };

  const existingBadge = this.badges.find(badge => badge.level === level);
  if (!existingBadge && badgeConfig[level]) {
    this.badges.push({
      ...badgeConfig[level],
      level: level,
      earnedAt: new Date()
    });
    
    this.currentBadge = badgeConfig[level].icon;
    return true; 
  }
  return false; 
};

const User = mongoose.model("User", userSchema);
export default User;