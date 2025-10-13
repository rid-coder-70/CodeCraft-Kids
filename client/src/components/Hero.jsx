import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero1 from "../assets/Hero.jpg";
import PythonIntro from "../pages/PythonIntro";

export default function Hero() {
  const [showPythonIntro, setShowPythonIntro] = useState(false);
  const pythonRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <section className="relative bg-black text-white overflow-hidden min-h-screen flex flex-col items-center pt-20 px-4 sm:px-6 lg:px-8">
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

      {/* Hero Content */}
      <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-center text-center lg:text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-3/4 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center mt-10 animate-floating"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg"
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeCraft Kids
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
          >
            Learn coding with{" "}
            <span className="font-semibold text-purple-300">fun games 🎮</span> and{" "}
            <span className="font-semibold text-pink-300">
              interactive tutorials 💻
            </span>
            . Explore, create, and enjoy coding adventures 🚀
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5"
          >
            <button
              onClick={handleStart}
              className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] focus:outline-none focus:ring-2 focus:ring-purple-400 group overflow-hidden"
            >
              <span className="relative z-10">Start Python Tutorial 🚀</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={scrollToPython}
              aria-label="Learn More about CodeCraft Kids"
              className="relative px-8 py-4 text-lg font-semibold text-gray-200 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-2xl border border-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] focus:outline-none focus:ring-2 focus:ring-gray-400 group overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Learn More
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Demo Video Section */}
      <motion.section
        ref={videoRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-3/4 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 backdrop-blur-xl p-8 md:p-12 my-16 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 flex flex-col items-center justify-center min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] text-center animate-floating"
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

      {/* Python Intro Section */}
      {showPythonIntro && (
        <motion.section
          ref={pythonRef}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-3/4 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 backdrop-blur-xl p-8 md:p-12 mb-20 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center mt-10"
        >
          <PythonIntro />
        </motion.section>
      )}

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
    </section>
  );
}