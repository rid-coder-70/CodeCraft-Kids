import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showGameMode, setShowGameMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleProfile = () => {
    navigate("/profile");
  };

  const goToBeginner = () => navigate("/game/beginner");
  const goToProMode = () => navigate("/game/pro");

  return (
    <section className="relative bg-black text-white min-h-screen flex flex-col items-center pt-40 px-4 sm:px-6 lg:px-8 overflow-hidden box-border">
      {/* Background floating circles */}
      <div className="absolute top-0 left-10 w-24 h-24 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-floating box-border"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-floating box-border"></div>

      {/* Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl bg-gray-900/70 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-800 flex flex-col items-center text-center animate-floating box-border"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
          You are logged in! Enjoy your personalized dashboard and fun games below.
        </p>

        {/* Buttons: Profile & Game Mode */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-6 w-full box-border">
          <button
            onClick={handleProfile}
            className="px-10 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] box-border"
          >
            Edit Profile
          </button>

          <button
            onClick={() => setShowGameMode(!showGameMode)}
            className="px-10 py-3 text-lg font-semibold text-white bg-purple-600 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(147,51,234,0.7)] box-border"
          >
            Game Mode
          </button>
        </div>

        {/* Game Mode Options (Beginner / Pro) */}
        <AnimatePresence>
          {showGameMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-5 justify-center mt-4 w-full box-border"
            >
              <button
                onClick={goToBeginner}
                className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] box-border"
              >
                Beginner
              </button>
              <button
                onClick={goToProMode}
                className="px-8 py-3 text-lg font-semibold text-white bg-yellow-600 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.7)] box-border"
              >
                Pro Mode
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating animation style */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 7s ease-in-out infinite;
          }
          *, *::before, *::after {
            box-sizing: border-box;
          }
        `}
      </style>
    </section>
  );
}
