import React, { useState } from "react";

export default function Level5({ onComplete }) {
  const [userCode, setUserCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (userCode.includes("if") && userCode.includes("return")) {
      setMessage("🎉 Quest Completed! You unlocked the secret code.");
      setTimeout(() => onComplete(), 1500);
    } else {
      setMessage("❌ Try again! Use advanced logic to unlock the secret code.");
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-2xl shadow-xl text-center">
      <h2 className="text-3xl font-bold mb-4">🚀 Level 5: Secret Code Quest</h2>
      <p className="text-white/80 mb-4">
        Advanced logic challenge! Unlock the secret code using if-else and return statements.
      </p>
      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="// Example: function secret(){ if(condition) return true; }"
        className="w-full h-48 px-4 py-2 mb-4 bg-gray-900 border-2 border-purple-600 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-purple-700"
      >
        Submit Code
      </button>
      {message && <p className="mt-2 text-green-400 font-semibold">{message}</p>}
    </div>
  );
}
