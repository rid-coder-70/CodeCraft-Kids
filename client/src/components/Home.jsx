import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaRocket, 
  FaSignInAlt, 
  FaUsers, 
  FaUserFriends,
  FaChartLine,
  FaComments,
  FaCode,
  FaGamepad
} from "react-icons/fa";
import { 
  GiProgression 
} from "react-icons/gi";
import { 
  IoPeople,
  IoSparkles
} from "react-icons/io5";
import { 
  MdPostAdd,
  MdEmojiPeople
} from "react-icons/md";
import CommunityFeed from "./community/CommunityFeed";
import UsersList from "./community/UsersList";

export default function Home() {
  const [activeTab, setActiveTab] = useState("community");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalLevelsCompleted: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // You might want to create a stats endpoint later
      const usersRes = await fetch("http://localhost:5000/api/users");
      const usersData = await usersRes.json();
      
      const postsRes = await fetch("http://localhost:5000/api/community/posts?limit=1");
      const postsData = await postsRes.json();

      setStats({
        totalUsers: usersData.totalUsers || usersData.users?.length || 0,
        totalPosts: postsData.totalPosts || 0,
        totalLevelsCompleted: usersData.users?.reduce((sum, user) => sum + (user.completedLevels?.length || 0), 0) || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Glow accents */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-8 md:p-12 text-center animate-floating mb-12"
        >
          {/* Logo/Brand */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative h-20 w-20 bg-gray-900 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] border-2 border-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CCK</span>
                </div>
              </div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                CodeCraft Kids
              </h1>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-2">
              <FaGamepad className="text-purple-400" /> Learn Coding Through Fun & Games! <FaCode className="text-pink-400" />
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Join our vibrant community of young coders! Share your achievements, 
              learn from others, and embark on exciting coding adventures together.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="backdrop-blur-md bg-purple-500/20 rounded-2xl p-6 border border-purple-400/30">
              <div className="text-3xl font-bold text-purple-300 mb-2 flex items-center justify-center gap-2">
                {stats.totalUsers}+ <FaUserFriends />
              </div>
              <div className="text-gray-300">Young Coders</div>
            </div>
            <div className="backdrop-blur-md bg-pink-500/20 rounded-2xl p-6 border border-pink-400/30">
              <div className="text-3xl font-bold text-pink-300 mb-2 flex items-center justify-center gap-2">
                {stats.totalPosts}+ <MdPostAdd />
              </div>
              <div className="text-gray-300">Community Posts</div>
            </div>
            <div className="backdrop-blur-md bg-green-500/20 rounded-2xl p-6 border border-green-400/30">
              <div className="text-3xl font-bold text-green-300 mb-2 flex items-center justify-center gap-2">
                {stats.totalLevelsCompleted}+ <GiProgression />
              </div>
              <div className="text-gray-300">Levels Completed</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Coding Now <FaRocket />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/login"
              className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Login to Continue <FaSignInAlt />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </motion.div>

        {/* Community & Users Section */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-6 md:p-8 animate-floating">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 mb-8">
            <button
              onClick={() => setActiveTab("community")}
              className={`flex-1 py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "community"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <MdPostAdd /> Community Feed
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "users"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaUsers /> Our Coders ({stats.totalUsers})
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "community" ? (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                    <FaComments /> Community Activity
                  </h3>
                  <p className="text-gray-400">
                    See what our young coders are creating and learning!
                  </p>
                </div>
                <CommunityFeed />
                <div className="text-center mt-8">
                  <Link
                    to="/login"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                  >
                    <FaSignInAlt /> Login to Join the Community
                  </Link>
                </div>
              </div>
            ) : (
              <UsersList />
            )}
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