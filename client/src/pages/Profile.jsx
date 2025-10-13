import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewPic, setPreviewPic] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUsername(res.data.user.name);
          setEmail(res.data.user.email);
          setProfilePic(res.data.user.profilePic || "");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("email", email);
      if (selectedFile) formData.append("profilePic", selectedFile);

      const res = await axios.put("http://localhost:5000/api/auth/profile", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessage("✅ Profile updated successfully!");
        setProfilePic(res.data.user.profilePic);
        setSelectedFile(null);
        setPreviewPic("");
        setEditing(false);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setMessage("❌ Failed to update profile!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleExit = () => {
    setEditing(false);
    setSelectedFile(null);
    setPreviewPic("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Glow accents */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl opacity-30"></div>

      <div className="relative z-10 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-8 md:p-12 w-full max-w-md animate-floating">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center space-x-3 mb-4">
            
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              CodeCraft Kids
            </h1>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {username ? `${username}'s Profile` : "Your Profile"}
          </h2>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              previewPic
                ? previewPic
                : profilePic
                ? `http://localhost:5000${profilePic}`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-purple-500/50 shadow-2xl object-cover"
          />

          {editing && (
            <label className="mt-4 cursor-pointer relative px-4 py-2 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden">
              <span className="relative z-10">Choose File</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Username */}
        <div className="mb-4 w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!editing}
            className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none transition duration-300 ${
              !editing 
                ? "border-white/10 opacity-70 cursor-not-allowed" 
                : "border-white/10 focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            }`}
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-6 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editing}
            className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none transition duration-300 ${
              !editing 
                ? "border-white/10 opacity-70 cursor-not-allowed" 
                : "border-white/10 focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            }`}
            placeholder="Enter your email"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mb-4 w-full">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Edit Profile</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] group overflow-hidden"
              >
                <span className="relative z-10">Save Changes</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={handleExit}
                className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] group overflow-hidden"
              >
                <span className="relative z-10">Cancel</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </>
          )}
        </div>

        {message && (
          <div className={`p-3 rounded-xl backdrop-blur-sm text-center ${
            message.includes("✅") 
              ? "bg-green-500/20 border border-green-400/30 text-green-300" 
              : "bg-red-500/20 border border-red-400/30 text-red-300"
          }`}>
            {message}
          </div>
        )}
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}