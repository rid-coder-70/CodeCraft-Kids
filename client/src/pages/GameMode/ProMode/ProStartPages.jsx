import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

export default function ProMode() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [score, setScore] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [guess, setGuess] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Fetch user data (completed levels)
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setCompletedLevels(res.data.user.proCompletedLevels || []);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchUser();
  }, [token]);

  // ✅ Generate random number per level
  const generateNumber = (level) => {
    const range = (level + 1) * 5; // higher levels = harder
    setRandomNumber(Math.floor(Math.random() * range) + 1);
    setGuess(null);
    setMessage("");
  };

  // ✅ Handle guessing logic
  const handleGuess = (num) => {
    setGuess(num);
    if (num === randomNumber) {
      setScore(score + 1);
      setMessage("🎉 Correct! Great job!");

      setTimeout(() => {
        handleLevelComplete(selectedLevel);
      }, 800);
    } else {
      setMessage(`❌ Wrong! The correct number was ${randomNumber}`);
      setTimeout(() => generateNumber(selectedLevel), 1000);
    }
  };

  // ✅ When player completes a level
  const handleLevelComplete = async (levelId) => {
    if (!completedLevels.includes(levelId)) {
      const updatedLevels = [...completedLevels, levelId];
      setCompletedLevels(updatedLevels);

      try {
        const formData = new FormData();
        formData.append("proCompletedLevel", levelId);
        await axios.put(
          "http://localhost:5000/api/auth/profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (err) {
        console.error("Error updating level:", err);
      }
    }

    const nextLevel = levelId + 1;
    if (nextLevel < 20) {
      setSelectedLevel(nextLevel);
      generateNumber(nextLevel);
    } else {
      setSelectedLevel(null);
      setMessage("🏆 You completed all 20 levels! Awesome!");
    }
  };

  // ✅ Start a level
  const startLevel = (level) => {
    setSelectedLevel(level);
    setScore(0);
    generateNumber(level);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 px-4 pt-20 text-white">
      <div className="relative bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-5xl text-center">

        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg hover:bg-blue-500 transition flex items-center gap-2"
          >
            <FiArrowLeft size={20} /> Back to Dashboard
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Pro Mode 💥
        </h1>

        {selectedLevel === null ? (
          <>
            <p className="text-white/80 mb-8 font-medium">
              Choose a level to start your Pro challenge:
            </p>

            {/* Level Buttons (1–20) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {[...Array(20).keys()].map((level) => {
                const isLocked = level > 0 && !completedLevels.includes(level - 1);
                const isCompleted = completedLevels.includes(level);
                return (
                  <button
                    key={level}
                    onClick={() => startLevel(level)}
                    disabled={isLocked}
                    className={`py-4 px-6 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transform transition duration-200 hover:scale-105 hover:shadow-2xl ${
                      isLocked
                        ? "bg-gray-600 opacity-50 cursor-not-allowed"
                        : isCompleted
                        ? "bg-green-600"
                        : "bg-purple-600"
                    }`}
                  >
                    {isLocked
                      ? `🔒 Level ${level + 1}`
                      : isCompleted
                      ? `✅ Level ${level + 1}`
                      : `Level ${level + 1}`}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-4 bg-gray-700 rounded-xl shadow-inner text-white/80 text-center">
              Complete levels sequentially to unlock new challenges!
            </div>
          </>
        ) : (
          <>
            <p className="text-white/80 mb-4 font-medium">
              Guess a number between <span className="font-bold">1</span> and{" "}
              <span className="font-bold">{(selectedLevel + 1) * 5}</span>:
            </p>

            <div className="grid grid-cols-5 gap-3 mb-4 w-full max-w-md mx-auto">
              {[...Array((selectedLevel + 1) * 5).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => handleGuess(num + 1)}
                  className="bg-purple-600 py-2 px-4 rounded-xl font-bold shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-2xl"
                >
                  {num + 1}
                </button>
              ))}
            </div>

            {message && (
              <p
                className={`text-lg font-semibold mb-2 ${
                  message.includes("Correct")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-xl font-semibold text-white/80 mt-2">
              Score: {score}
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setSelectedLevel(null)}
                className="bg-gray-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg hover:bg-gray-500 transition"
              >
                ⬅ Back to Levels
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
