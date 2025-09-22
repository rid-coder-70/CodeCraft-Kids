import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import your level components
import Level0 from "./Level0";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";

export default function BeginnerStartPage() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [currentBadge, setCurrentBadge] = useState("/default-badge.png");
  const [profilePic, setProfilePic] = useState("/default-avatar.png");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setProfilePic(
            res.data.user.profilePic
              ? `http://localhost:5000${res.data.user.profilePic}`
              : "/default-avatar.png"
          );
          setCompletedLevels(res.data.user.completedLevels || []);
          setCurrentBadge(
            res.data.user.badge
              ? `http://localhost:5000${res.data.user.badge}`
              : "/default-badge.png"
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [token]);

  const handleLevelComplete = async (levelId) => {
    if (!completedLevels.includes(levelId)) {
      const updatedLevels = [...completedLevels, levelId];
      setCompletedLevels(updatedLevels);

      try {
        const formData = new FormData();
        formData.append("completedLevel", levelId);

        const res = await axios.put(
          "http://localhost:5000/api/auth/profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.success && res.data.badgeEarned) {
          setCurrentBadge(`http://localhost:5000${res.data.badgeEarned}`);
        }
      } catch (err) {
        console.error("Error updating level:", err);
      }
    }

    const nextLevel = levelId + 1;
    if (nextLevel <= 4) setSelectedLevel(nextLevel);
    else setSelectedLevel(null);
  };

  const renderLevel = () => {
    switch (selectedLevel) {
      case 0:
        return <Level0 onComplete={() => handleLevelComplete(0)} />;
      case 1:
        return <Level1 onComplete={() => handleLevelComplete(1)} />;
      case 2:
        return <Level2 onComplete={() => handleLevelComplete(2)} />;
      case 3:
        return <Level3 onComplete={() => handleLevelComplete(3)} />;
      case 4:
        return <Level4 onComplete={() => handleLevelComplete(4)} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 px-4 pt-20 md:pt-24 text-white">
      <div className="relative bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-5xl text-center">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg hover:bg-blue-500 transition"
          >
            ⬅ Back to Dashboard
          </button>
        </div>

        {/* Profile & Badge */}
        <div className="absolute top-6 right-6 flex flex-col items-center gap-3">
          <img
            src={profilePic}
            alt="Profile Pic"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-purple-600 shadow-lg object-cover hover:scale-105 transition-transform duration-300"
          />
          <img
            src={currentBadge}
            alt="Badge"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-md object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Beginner Mode 🎯
        </h1>
        <p className="text-white/80 mb-8 font-medium">
          Select a level to start your coding quest:
        </p>

        {/* Level Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[0, 1, 2, 3, 4].map((level) => {
            const isLocked = level > 0 && !completedLevels.includes(level - 1);
            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                disabled={isLocked}
                className={`bg-purple-600 text-white py-4 px-6 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transform transition duration-200 hover:scale-105 hover:shadow-2xl ${
                  isLocked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLocked ? `🔒 Level ${level}` : `Level ${level}`}
              </button>
            );
          })}
        </div>

        {/* Info Panel */}
        <div className="mt-4 p-4 bg-gray-700 rounded-xl shadow-inner text-white/80 text-center">
          Complete levels sequentially to unlock badges and new quests!
        </div>

        {/* Selected Level Panel */}
        {selectedLevel !== null && (
          <div className="mt-8 p-6 bg-gray-700 rounded-2xl shadow-xl w-full text-left">
            {renderLevel()}

            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={() => setSelectedLevel(null)}
                className="bg-gray-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg hover:bg-gray-500 transition"
              >
                ⬅ Back to Levels
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg hover:bg-blue-500 transition"
              >
                ⬅ Back to Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
