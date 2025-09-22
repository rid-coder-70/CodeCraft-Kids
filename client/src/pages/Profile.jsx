import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewPic, setPreviewPic] = useState(""); // 🔹 preview before save
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

  // 🔹 Preview selected image before saving
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
        setPreviewPic(""); // clear preview after successful save
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
    setPreviewPic(""); // discard preview
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 px-4 pt-24 text-white box-border">
      <div className="relative bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-3xl text-center flex flex-col items-center box-border">

        {/* 🔹 Back to Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-4 left-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          ← Back
        </button>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-lg">
          {username ? `${username}'s Profile` : "Your Profile"}
        </h1>

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
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-purple-600 shadow-lg object-cover"
          />

          {editing && (
            <label className="mt-3 cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-full shadow-lg transition duration-300 hover:scale-105">
              Choose File
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
        <div className="mb-4 w-full max-w-md">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!editing}
            className={`w-full px-4 py-2 rounded-xl border border-purple-600 bg-gray-900 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 box-border ${
              !editing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Email */}
        <div className="mb-4 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editing}
            className={`w-full px-4 py-2 rounded-xl border border-purple-600 bg-gray-900 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 box-border ${
              !editing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-4 w-full max-w-md">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex-1 bg-purple-600 py-2 px-4 rounded-full font-bold shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-2xl"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 py-2 px-4 rounded-full font-bold shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-2xl"
              >
                Save
              </button>
              <button
                onClick={handleExit}
                className="flex-1 bg-red-600 py-2 px-4 rounded-full font-bold shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-2xl"
              >
                Exit
              </button>
            </>
          )}
        </div>

        {message && <p className="text-green-400 font-semibold mt-4">{message}</p>}
      </div>
    </div>
  );
}
