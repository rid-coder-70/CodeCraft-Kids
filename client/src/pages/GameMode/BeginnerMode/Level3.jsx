import React, { useState } from "react";

export default function Level3({ onComplete }) {
  const [userCode, setUserCode] = useState("");
  const [message, setMessage] = useState("");
  const [levelCompleted, setLevelCompleted] = useState(false);

  const handleSubmit = () => {
    // Check if the user wrote a basic arithmetic operation (+, -, *, /)
    if (
      userCode.includes("+") ||
      userCode.includes("-") ||
      userCode.includes("*") ||
      userCode.includes("/")
    ) {
      setMessage("🎉 Quest Completed! You performed an arithmetic operation.");
      setLevelCompleted(true); // Unlock Next Level button
    } else {
      setMessage("❌ Try again! Use an arithmetic operator (+, -, *, /).");
    }
  };

  const handleNextLevel = () => {
    onComplete();  // Notify parent to unlock next level
    setUserCode("");
    setMessage("");
    setLevelCompleted(false);
  };

  return (
    <div className="bg-gray-700 p-6 rounded-2xl shadow-xl text-center">
      <h2 className="text-3xl font-bold mb-4">🐍 Level 3: Python Arithmetic Operators</h2>
      <p className="text-white/80 mb-4">
        Perform a calculation using Python arithmetic operators. Examples: <code>x + y</code>, <code>a - b</code>, <code>num * 2</code>, <code>10 / 2</code>
      </p>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="# Example: result = 5 + 3"
        className="w-full h-48 px-4 py-2 mb-4 bg-gray-900 border-2 border-purple-600 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="flex gap-2 justify-center">
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-purple-700"
        >
          Submit Code
        </button>

        {levelCompleted && (
          <button
            onClick={handleNextLevel}
            className="bg-green-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-green-700"
          >
            Next Level ➡
          </button>
        )}
      </div>

      {message && <p className="mt-2 text-green-400 font-semibold">{message}</p>}
    </div>
  );
}
