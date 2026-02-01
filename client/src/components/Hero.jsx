import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGamepad,
  FaLaptopCode,
  FaRocket,
  FaUsers,
  FaUserFriends,
  FaChartLine,
  FaChevronDown,
  FaPlay,
  FaVideo,
  FaSignInAlt,
  FaCode,
  FaShareAlt,
  FaTrophy,
  FaStar,
  FaComments,
  FaUserPlus
} from "react-icons/fa";
import {
  GiProgression
} from "react-icons/gi";
import {
  IoGameController,
  IoPeople,
  IoSparkles
} from "react-icons/io5";
import {
  MdPostAdd,
  MdEmojiPeople,
  MdCelebration
} from "react-icons/md";

import Hero1 from "../assets/Hero.jpg";
import PythonIntro from "../pages/PythonIntro";
import CommunityFeed from "./CommunityFeed";
import UsersList from "./UsersList";

export default function Home() {
  const [showPythonIntro, setShowPythonIntro] = useState(false);
  const [activeTab, setActiveTab] = useState("community");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalLevelsCompleted: 0
  });

  const pythonRef = useRef(null);
  const videoRef = useRef(null);
  const communityRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  // Conditional navigation for Start button
  const handleStart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const scrollToPython = () => {
    setShowPythonIntro(true);
    setTimeout(() => {
      pythonRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const scrollToCommunity = () => {
    communityRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchStats = async () => {
    try {
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
    <div className="relative bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 text-white overflow-hidden" style={{ fontFamily: "'Comic Sans MS', 'Arial', sans-serif" }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-300 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ⭐
          </div>
        ))}

        {/* Floating Hearts */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-pink-300 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 15}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            💖
          </div>
        ))}

        {/* Bouncing Pandas */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`panda-${i}`}
            className="absolute text-4xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            🐼
          </div>
        ))}

        {/* Dancing Cats */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`cat-${i}`}
            className="absolute text-3xl animate-wiggle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            😺
          </div>
        ))}

        {/* Rainbow Circles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute rounded-full blur-2xl opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, ${['#ff1493', '#00bfff', '#7fff00', '#ffd700', '#ff69b4'][Math.floor(Math.random() * 5)]} 0%, transparent 100%)`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content Card */}
        <div className="max-w-7xl w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-4/5 bg-white/95 backdrop-blur-xl p-8 md:p-16 rounded-[40px] shadow-[0_0_50px_rgba(255,20,147,0.6)] border-8 border-pink-400 min-h-[600px] flex flex-col justify-center items-center rainbow-border"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,182,193,0.95) 100%)',
            }}
          >
            {/* Title with Emojis */}
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-6xl animate-spin-slow">🎮</span>
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
                  CodeCraft Kids
                </h1>
                <span className="text-6xl animate-spin-slow">🚀</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4 animate-bounce-slow">
                🌈 Learn Coding Through Fun! 🎨
              </h2>
            </motion.div>

            {/* Cute Character Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 mb-8 text-5xl"
            >
              <span className="animate-wiggle" style={{ animationDelay: '0s' }}>🐼</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>😺</span>
              <span className="animate-wiggle" style={{ animationDelay: '0.4s' }}>🐻</span>
              <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🦄</span>
              <span className="animate-wiggle" style={{ animationDelay: '0.8s' }}>🐨</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-purple-700 mb-8 leading-relaxed"
            >
              🎯 <strong>Learn Python</strong> with fun games, cute characters, and awesome challenges! 🌟<br />
              Join <strong>{stats.totalUsers}+ young coders</strong> on exciting adventures! 🚀
            </motion.p>

            {/* Stats - Colorful Boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-3xl"
            >
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-5xl mb-2">👥</div>
                <div className="text-3xl font-black text-white">{stats.totalUsers}+</div>
                <div className="text-white font-bold">Kids Learning!</div>
              </div>
              <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-5xl mb-2">✨</div>
                <div className="text-3xl font-black text-white">{stats.totalPosts}+</div>
                <div className="text-white font-bold">Fun Posts!</div>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-5xl mb-2">🎮</div>
                <div className="text-3xl font-black text-white">{stats.totalLevelsCompleted}+</div>
                <div className="text-white font-bold">Levels Done!</div>
              </div>
            </motion.div>

            {/* Big Fun Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl"
            >
              <button
                onClick={handleStart}
                className="flex-1 px-10 py-6 text-2xl font-black text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] border-4 border-white"
              >
                🚀 Start Playing! 🎮
              </button>

              <button
                onClick={scrollToCommunity}
                className="flex-1 px-10 py-6 text-2xl font-black text-white bg-gradient-to-r from-orange-400 to-pink-500 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,88,12,0.8)] border-4 border-white"
              >
                👥 See Friends! 💬
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Demo Video Section */}
      <motion.section
        ref={videoRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full lg:w-3/4 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 backdrop-blur-xl p-8 md:p-12 my-16 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 flex flex-col items-center justify-center min-h-[500px] text-center animate-floating mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 flex items-center justify-center gap-3">
          <FaVideo /> Watch Demo Video & Learn With Us
        </h2>
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/50">
          <iframe
            src="https://www.youtube.com/embed/Oadb_Q2Tbac"
            title="CodeCraft Kids Tutorial Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.section>

      {/* Community & Users Section */}
      <section ref={communityRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-6 md:p-8 animate-floating">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
                <MdCelebration /> Join Our Coding Community! <IoSparkles />
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Connect with other young coders, share your achievements, and get inspired by what others are creating!
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/10 mb-8">
              <button
                onClick={() => setActiveTab("community")}
                className={`flex-1 py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === "community"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                <FaComments /> Community Feed
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex-1 py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === "users"
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
                      <FaShareAlt /> Community Activity
                    </h3>
                    <p className="text-gray-400">
                      See what our young coders are creating and learning!
                    </p>
                  </div>
                  <CommunityFeed />
                  <div className="text-center mt-8">
                    <Link
                      to="/signup"
                      className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2 mx-auto"
                    >
                      <FaUserPlus /> Join Now to Share Your Journey!
                    </Link>
                  </div>
                </div>
              ) : (
                <UsersList />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Python Intro Section */}
      {showPythonIntro && (
        <motion.section
          ref={pythonRef}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-3/4 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 backdrop-blur-xl p-8 md:p-12 my-16 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 min-h-[500px] flex flex-col justify-center mx-auto"
        >
          <PythonIntro />
        </motion.section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-8 md:p-12 animate-floating"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of young coders who are already creating amazing projects and having fun while learning!
            </p>
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

              <button
                onClick={scrollToPython}
                className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Try Python Tutorial <FaCode />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animations & Styles */}
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
          
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          .animate-wiggle {
            animation: wiggle 1s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(10deg); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          
          @keyframes rainbow-border {
            0% { border-color: #ff1493; }
            20% { border-color: #00bfff; }
            40% { border-color: #7fff00; }
            60% { border-color: #ffd700; }
            80% { border-color: #ff69b4; }
            100% { border-color: #ff1493; }
          }
          .rainbow-border {
            animation: rainbow-border 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
}