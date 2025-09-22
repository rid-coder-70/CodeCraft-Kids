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
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-center text-center lg:text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-3/4 bg-gray-900/70 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-gray-800 min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center mt-10 animate-floating"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg"
          >
            Welcome to{" "}
            <span className="text-indigo-400">CodeCraft Kids</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
          >
            Learn coding with{" "}
            <span className="font-semibold text-white">fun games 🎮</span> and{" "}
            <span className="font-semibold text-white">
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
              className="relative px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Start Python Tutorial 🚀
            </button>

            <button
              onClick={scrollToPython}
              aria-label="Learn More about CodeCraft Kids"
              className="relative px-8 py-3 text-lg font-semibold text-gray-200 bg-gray-800 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Learn More
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
        className="w-full lg:w-3/4 bg-gray-900/80 backdrop-blur-md p-6 md:p-10 my-16 rounded-3xl shadow-2xl border border-gray-800 flex flex-col items-center justify-center min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] text-center animate-floating"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-6">
          🎥 Watch Demo Video & Learn With Us
        </h2>
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-700">
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
          className="w-full lg:w-3/4 bg-gray-900/80 backdrop-blur-md p-8 md:p-12 mb-20 rounded-3xl shadow-2xl border border-gray-800 min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center mt-10"
        >
          <PythonIntro />
        </motion.section>
      )}

      {/* Floating Animation */}
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
        `}
      </style>
    </section>
  );
}
