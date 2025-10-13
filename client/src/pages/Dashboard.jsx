import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CommunityFeed from "../components/CommunityFeed";
import CreatePost from "../components/CreatePost";
import BadgeDisplay from "../components/BadgeDisplay";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showGameMode, setShowGameMode] = useState(false);
  const [refreshFeed, setRefreshFeed] = useState(0);
  const [user, setUser] = useState(null);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleBadges = () => {
    navigate("/badges");
  };

  const goToBeginner = () => navigate("/game/beginner");
  const goToProMode = () => navigate("/game/pro");

  const handlePostCreated = () => {
    // Trigger refresh of community feed
    setRefreshFeed(prev => prev + 1);
  };

  const handlePostDeleted = () => {
    // Trigger refresh when a post is deleted
    setRefreshFeed(prev => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Get recent badges (last 3 earned)
  const recentBadges = user?.badges?.slice(-3).reverse() || [];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Glow accents */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl opacity-30"></div>

      {/* Main Dashboard Card */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-8 md:p-12 w-full text-center animate-floating mb-12"
        >
          {/* Logo/Brand */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                CodeCraft Kids
              </h1>
            </div>
            
            {/* User Welcome */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Welcome back{user ? `, ${user.name}` : ''}! 👋
              </h2>
              {user && (
                <div className="flex items-center justify-center space-x-6 mt-4">
                  {/* Current Badge Display */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-lg shadow-lg border-2 border-yellow-300">
                      <span className="font-bold">{user.currentBadge || "🌟"}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-300">
                        Levels Completed: <span className="text-purple-400 font-bold">{user.completedLevels?.length|| 0}</span>
                      </p>
                      <p className="text-gray-400 text-sm">
                        Badges Earned: <span className="text-yellow-400 font-bold">{user.badges?.length || 0}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Ready for your next coding adventure? Choose your game mode or connect with the community!
          </p>

          {/* Buttons: Profile, Badges & Game Mode */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={handleProfile}
              className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Edit Profile</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* <button
              onClick={handleBadges}
              className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">
                My Badges ({user?.badges?.length || 0}) 🏆
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button> */}

            <button
              onClick={() => setShowGameMode(!showGameMode)}
              className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">
                {showGameMode ? 'Hide Games' : 'Show Games'} 🎮
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* <button
              onClick={handleLogout}
              className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Logout</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button> */}
          </div>

          {/* Game Mode Options */}
          <AnimatePresence>
            {showGameMode && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
              >
                <button
                  onClick={goToBeginner}
                  className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] group overflow-hidden"
                >
                  <span className="relative z-10">Beginner Mode 🎯</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button
                  onClick={goToProMode}
                  className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] group overflow-hidden"
                >
                  <span className="relative z-10">Pro Mode ⚡</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Badges Section */}
          {user?.badges && user.badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Your Coding Badges
                </h3>
                <button
                  onClick={() => setShowBadges(!showBadges)}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {showBadges ? 'Hide' : 'Show'} Details
                </button>
              </div>
              
              <div className="flex justify-center mb-2">
                <BadgeDisplay badges={user.badges} size="medium" maxDisplay={5} />
              </div>
              <p className="text-gray-400 text-sm text-center mb-4">
                {user.badges.length} badge{user.badges.length !== 1 ? 's' : ''} earned • Keep coding!
              </p>

              <AnimatePresence>
                {showBadges && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                      {recentBadges.map((badge, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="backdrop-blur-md bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-3 border border-yellow-400/20"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-lg shadow-lg border border-yellow-300">
                              {badge.icon}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-white font-semibold text-sm">
                                {badge.name}
                              </div>
                              <div className="text-gray-300 text-xs">
                                {badge.description}
                              </div>
                              <div className="text-gray-400 text-xs mt-1">
                                Level {badge.level}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Badge Encouragement for New Users */}
          {(!user?.badges || user.badges.length === 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <div className="backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-400/20">
                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div className="text-3xl">🏆</div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Start Earning Badges!
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 text-center">
                  Complete coding levels to earn amazing badges and track your progress!
                </p>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🐍</div>
                    <div className="text-gray-400 text-sm">Python Beginner</div>
                    <div className="text-gray-500 text-xs">Level 1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔍</div>
                    <div className="text-gray-400 text-sm">Code Explorer</div>
                    <div className="text-gray-500 text-xs">Level 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-gray-400 text-sm">Logic Master</div>
                    <div className="text-gray-500 text-xs">Level 3</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Community Section */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-8 md:p-12 animate-floating">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Community Hub 🏆
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Share your coding achievements, ask questions, and connect with other young coders! 
              Celebrate your progress and get inspired by the community.
            </p>
            
            {/* Community Stats */}
            {user && (
              <div className="flex justify-center space-x-8 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{user.completedLevels?.length || 0}</div>
                  <div className="text-gray-400 text-sm">Levels Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">
                    {user.badges?.length || 0}
                  </div>
                  <div className="text-gray-400 text-sm">Badges Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {user.currentBadge || "🌟"}
                  </div>
                  <div className="text-gray-400 text-sm">Current Badge</div>
                </div>
              </div>
            )}
          </div>

          {/* Community Feed */}
          <div className="mb-8">
            <CommunityFeed 
              key={refreshFeed} 
              onPostDeleted={handlePostDeleted}
            />
          </div>
          
          {/* Create Post Button */}
          <div className="text-center">
            <p className="text-gray-400 mb-4">Share your coding journey with the community!</p>
            <CreatePost onPostCreated={handlePostCreated} />
          </div>
        </div>
      </div>

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