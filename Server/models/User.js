import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"] },
  password: { type: String, required: true, minlength: 6 },
  profilePic: { type: String, default: "" },
  badge: { type: String, default: "" }, // badge path
  completedLevels: { type: [Number], default: [] }, // track completed levels
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

// 🔹 Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔹 Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
