import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const token = localStorage.getItem("token");

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    !token && { name: "Login", path: "/login" },
    !token && { name: "Signup", path: "/signup" },
    token && { name: "Dashboard", path: "/dashboard" },
  ].filter(Boolean);

  return (
    <footer className="relative backdrop-blur-xl bg-black/30 border-t border-white/10 text-white py-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Glow accents */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Branding - Matching Navbar */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center space-x-4 mb-4">
            {/* <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative h-14 w-14 bg-gray-900 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] border-2 border-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg">CCK</span>
              </div>
            </div> */}
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              CodeCraft Kids
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-md text-center leading-relaxed">
            🚀 Learn coding through fun, interactive & gamified tutorials!
          </p>
        </div>

        {/* Grid Sections - Matching Hero Container Styling */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Feedback Section */}
          <div className="backdrop-blur-xl bg-gray-900/70 p-8 rounded-3xl shadow-2xl border border-white/10 animate-floating">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              💬 Share Your Feedback
            </h3>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300 placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300 placeholder-gray-400"
              />
              <textarea
                placeholder="Your Message"
                rows="3"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300 placeholder-gray-400 resize-none"
              />
              <button
                type="submit"
                className="relative px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] focus:outline-none focus:ring-2 focus:ring-purple-400 group overflow-hidden"
              >
                <span className="relative z-10">Send Feedback</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* Quick Links Section */}
          <div className="backdrop-blur-xl bg-gray-900/70 p-8 rounded-3xl shadow-2xl border border-white/10 animate-floating flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              🔗 Quick Links
            </h3>
            <ul className="space-y-3 w-full">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`relative w-full text-center px-4 py-3 font-semibold text-lg transition-all duration-300 rounded-xl group block
                      ${
                        location.pathname === link.path
                          ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20"
                          : "text-gray-200 hover:text-white"
                      } 
                      hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 
                      hover:shadow-lg hover:shadow-purple-500/30 
                      transform hover:scale-105 hover:-translate-y-0.5
                      border border-transparent hover:border-purple-400/30`}
                  >
                    {link.name}
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Section */}
          <div className="backdrop-blur-xl bg-gray-900/70 p-8 rounded-3xl shadow-2xl border border-white/10 animate-floating flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              🌐 Connect With Us
            </h3>
            <div className="flex justify-center gap-6">
              <a 
                href="#" 
                className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-white/10 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] group"
              >
                <FaFacebookF className="text-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#" 
                className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-white/10 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] group"
              >
                <FaTwitter className="text-2xl text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#" 
                className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-white/10 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] group"
              >
                <FaInstagram className="text-2xl text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#" 
                className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-white/10 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_25px_rgba(14,165,233,0.6)] group"
              >
                <FaLinkedinIn className="text-2xl text-blue-300 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6 text-center">
              Follow us for updates and coding tips!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/10 pt-8">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CodeCraft Kids. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Building the next generation of coders 🚀
          </p>
        </div>
      </div>

      {/* Scroll To Top - Matching Button Styling */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/30 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] group overflow-hidden"
        >
          <span className="relative z-10 text-lg font-bold">↑</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}

      {/* Floating Animation - Same as Hero */}
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
    </footer>
  );
}