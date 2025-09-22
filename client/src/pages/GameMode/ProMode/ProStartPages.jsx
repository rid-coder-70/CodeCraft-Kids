import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProMode() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 20) + 1
  );
  const [guess, setGuess] = useState(null);
  const [message, setMessage] = useState("");

  const generateNumber = () => {
    const number = Math.floor(Math.random() * 20) + 1;
    setRandomNumber(number);
    setGuess(null);
    setMessage("");
  };

  const handleGuess = (num) => {
    setGuess(num);
    if (num === randomNumber) {
      setScore(score + 1);
      setMessage("🎉 Correct! Well done!");
    } else {
      setMessage(`❌ Wrong! The correct number was ${randomNumber}`);
    }
    setTimeout(generateNumber, 1000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 px-4 pt-24 text-white box-border">
      <div className="relative bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-3xl text-center box-border">
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white py-2 px-6 rounded-2xl font-bold shadow-lg hover:bg-blue-500 transition"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Pro Mode 💥
        </h1>

        <p className="text-white/80 mb-4 font-medium">
          Guess a number between <span className="font-bold">1</span> and{" "}
          <span className="font-bold">20</span>:
        </p>

        {/* Number Buttons 1–20 */}
        <div className="grid grid-cols-5 gap-4 mb-4 w-full max-w-md mx-auto">
          {[...Array(20).keys()].map((num) => (
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
              message.includes("Correct") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-xl font-semibold text-white/80 mt-2">
          Score: {score}
        </p>
      </div>
    </div>
  );
}
