import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";
import {
  FaUser, FaEnvelope, FaCamera, FaEdit, FaSave,
  FaTimes, FaArrowLeft, FaTrophy, FaStar
} from "react-icons/fa";
import { useToast } from "../components/Toast";

// Color generator for avatars
const avatarColors = [
  "from-[#f4a261] to-[#e76f51]", "from-[#2a9d8f] to-[#264653]",
  "from-[#e9c46a] to-[#f4a261]", "from-[#a0cc5b] to-[#8ebb4a]",
];
const getAvatarColor = (name = "") => {
  let s = 0; for (let c of name) s += c.charCodeAt(0);
  return avatarColors[s % avatarColors.length];
};

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewPic, setPreviewPic] = useState("");
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          const u = res.data.user;
          setUser(u);
          setUsername(u.name);
          setEmail(u.email);
          setProfilePic(u.profilePic || "");
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
      if (file.size > 5 * 1024 * 1024) {
        toast("Image too big! Max 5MB.", "error");
        return;
      }
      setSelectedFile(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!username.trim()) { toast("Name can't be empty!", "error"); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", username.trim());
      formData.append("email", email.trim());
      if (selectedFile) formData.append("profilePic", selectedFile);

      const res = await axios.put(`${API_BASE}/api/auth/profile`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast("Profile updated successfully!", "success");
        setProfilePic(res.data.user.profilePic || "");
        setSelectedFile(null);
        setPreviewPic("");
        setEditing(false);
        setUser(res.data.user);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast("Couldn't update profile. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedFile(null);
    setPreviewPic("");
    if (user) { setUsername(user.name); setEmail(user.email); }
  };

  const avatarSrc = previewPic || (profilePic ? `${API_BASE}${profilePic}` : null);

  return (
    <div className="min-h-screen bg-[#f9faec] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-md w-full mx-auto mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition-colors w-fit"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>

      <div className="relative z-10 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-8 md:p-10 w-full max-w-md mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
            My Profile
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            {username ? `${username}'s CodeCraft Account` : "Your profile"}
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer inline-block">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${getAvatarColor(username)} flex items-center justify-center text-4xl font-bold text-white shadow-md border-4 border-white transition-transform group-hover:scale-105 select-none`}>
                {username ? username[0].toUpperCase() : "?"}
              </div>
            )}
            {editing && (
              <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <FaCamera className="text-white text-2xl" />
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}
          </div>
          {editing && (
            <label className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-bold cursor-pointer transition-colors border border-gray-200 text-sm">
              <FaCamera /> Change Photo
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          )}
        </div>

        {/* Stats Row */}
        {user && (
          <div className="flex justify-center gap-8 mb-8 pb-8 border-b border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-green-500 text-xl font-extrabold">
                <FaTrophy /> {user.completedLevels?.length || 0}
              </div>
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Levels</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-orange-400 text-xl font-extrabold">
                <FaStar /> {user.badges?.length || 0}
              </div>
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Badges</div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!editing}
                className={`appearance-none block w-full pl-11 pr-4 py-3 border rounded-xl shadow-sm text-sm transition-colors ${
                  editing
                    ? "border-gray-300 text-gray-900 focus:outline-none focus:ring-green-400 focus:border-green-400 bg-white"
                    : "border-transparent bg-gray-50 text-gray-500 cursor-not-allowed"
                }`}
                placeholder="Your name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editing}
                className={`appearance-none block w-full pl-11 pr-4 py-3 border rounded-xl shadow-sm text-sm transition-colors ${
                  editing
                    ? "border-gray-300 text-gray-900 focus:outline-none focus:ring-green-400 focus:border-green-400 bg-white"
                    : "border-transparent bg-gray-50 text-gray-500 cursor-not-allowed"
                }`}
                placeholder="Your email"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-[#a0cc5b] hover:bg-[#8ebb4a] rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : <><FaSave /> Save</>}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl shadow-sm transition-colors"
               >
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}