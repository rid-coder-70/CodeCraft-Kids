import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="relative bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
        {/* Background Overlay */}
        <div className="absolute inset-0">
          <img
            src={Hero1}
            alt="Coding Adventure Background"
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black backdrop-blur-sm" />
        </div>

        {/* Glow accents */}
        <div className="absolute top-10 left-10 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl opacity-30"></div>

        {/* Hero Content */}
        <div className="max-w-7xl w-full flex flex-col items-center justify-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-3/4 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 min-h-[500px] flex flex-col justify-center items-center animate-floating"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="flex flex-col items-center justify-center mb-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative h-20 w-20 bg-gray-900 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] border-2 border-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">CCK</span>
                  </div>
                </div> */}
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  CodeCraft Kids
                </h1>
              </div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Learn Coding Through Fun & Games!
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-3xl"
            >
              Learn coding with{" "}
              <span className="font-semibold text-purple-300">fun games 🎮</span> and{" "}
              <span className="font-semibold text-pink-300">
                interactive tutorials 💻
              </span>
              . Join our vibrant community of young coders and embark on exciting coding adventures! 🚀
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-2xl"
            >
              <div className="backdrop-blur-md bg-purple-500/20 rounded-2xl p-4 border border-purple-400/30">
                <div className="text-2xl font-bold text-purple-300 mb-1">{stats.totalUsers}+</div>
                <div className="text-gray-300 text-sm">Young Coders</div>
              </div>
              <div className="backdrop-blur-md bg-pink-500/20 rounded-2xl p-4 border border-pink-400/30">
                <div className="text-2xl font-bold text-pink-300 mb-1">{stats.totalPosts}+</div>
                <div className="text-gray-300 text-sm">Community Posts</div>
              </div>
              <div className="backdrop-blur-md bg-green-500/20 rounded-2xl p-4 border border-green-400/30">
                <div className="text-2xl font-bold text-green-300 mb-1">{stats.totalLevelsCompleted}+</div>
                <div className="text-gray-300 text-sm">Levels Completed</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl"
            >
              <button
                onClick={handleStart}
                className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
              >
                <span className="relative z-10">Start Python Tutorial 🚀</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={scrollToCommunity}
                className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group overflow-hidden"
              >
                <span className="relative z-10">Explore Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <button
            onClick={scrollToCommunity}
            className="text-gray-400 hover:text-white transition-colors duration-300 animate-bounce"
          >
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2">Explore More</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>
        </motion.div>
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
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
          🎥 Watch Demo Video & Learn With Us
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
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Join Our Coding Community! 🎉
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Connect with other young coders, share your achievements, and get inspired by what others are creating!
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/10 mb-8">
              <button
                onClick={() => setActiveTab("community")}
                className={`flex-1 py-4 font-semibold text-lg transition-all duration-300 ${
                  activeTab === "community"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                📝 Community Feed
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex-1 py-4 font-semibold text-lg transition-all duration-300 ${
                  activeTab === "users"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                👥 Our Coders ({stats.totalUsers})
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === "community" ? (
                <div>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      Community Activity
                    </h3>
                    <p className="text-gray-400">
                      See what our young coders are creating and learning!
                    </p>
                  </div>
                  <CommunityFeed />
                  <div className="text-center mt-8">
                    <Link
                      to="/signup"
                      className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                    >
                      Join Now to Share Your Journey!
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
                <span className="relative z-10">Start Coding Now 🚀</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button
                onClick={scrollToPython}
                className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group overflow-hidden"
              >
                <span className="relative z-10">Try Python Tutorial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

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