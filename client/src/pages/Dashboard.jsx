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
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Glow accents */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-8 md:p-12 w-full max-w-4xl text-center animate-floating"
      >
        {/* Logo/Brand */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center space-x-4 mb-6">
            
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              CodeCraft Kids
            </h1>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Welcome to Your Dashboard
          </h2>
        </div>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          You are logged in! Enjoy your personalized dashboard and fun games below.
        </p>

        {/* Buttons: Profile & Game Mode */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-6">
          <button
            onClick={handleProfile}
            className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
          >
            <span className="relative z-10">Edit Profile</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => setShowGameMode(!showGameMode)}
            className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group overflow-hidden"
          >
            <span className="relative z-10">Game Mode</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Game Mode Options */}
        <AnimatePresence>
          {showGameMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-5 justify-center mt-6"
            >
              <button
                onClick={goToBeginner}
                className="relative px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] group overflow-hidden"
              >
                <span className="relative z-10">Beginner 🎯</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={goToProMode}
                className="relative px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] group overflow-hidden"
              >
                <span className="relative z-10">Pro Mode ⚡</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 8s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}