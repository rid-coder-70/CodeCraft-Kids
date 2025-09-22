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
    <footer className="relative backdrop-blur-lg bg-black border-t border-gray-800 text-white py-16 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Branding */}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] mb-3">
          CodeCraft Kids
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-md mx-auto mb-12 leading-relaxed">
          🚀 Learn coding through fun, interactive & gamified tutorials!
        </p>

        {/* Grid Sections */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Feedback Section */}
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700 shadow-md">
            <h3 className="text-xl font-semibold text-indigo-300 mb-4">
              💬 Share Your Feedback
            </h3>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                placeholder="Your Message"
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
              >
                Send Feedback
              </button>
            </form>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-xl font-semibold text-indigo-300">🔗 Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-gray-300 hover:text-pink-400 transition ${
                      location.pathname === link.path ? "text-pink-400 font-semibold" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Section */}
          <div className="flex flex-col items-center justify-center gap-6">
            <h3 className="text-xl font-semibold text-pink-300">
              🌐 Connect With Us
            </h3>
            <div className="flex justify-center gap-8 text-2xl">
              <a href="#" className="group text-indigo-400 transition transform hover:scale-125">
                <FaFacebookF className="drop-shadow-[0_0_8px_rgba(129,140,248,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(129,140,248,1)]" />
              </a>
              <a href="#" className="group text-purple-400 transition transform hover:scale-125">
                <FaTwitter className="drop-shadow-[0_0_8px_rgba(192,132,252,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(192,132,252,1)]" />
              </a>
              <a href="#" className="group text-pink-400 transition transform hover:scale-125">
                <FaInstagram className="drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,1)]" />
              </a>
              <a href="#" className="group text-blue-400 transition transform hover:scale-125">
                <FaLinkedinIn className="drop-shadow-[0_0_8px_rgba(96,165,250,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(96,165,250,1)]" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs sm:text-sm text-gray-400">
          © {new Date().getFullYear()} CodeCraft Kids. All rights reserved.
        </p>
      </div>

      {/* Scroll To Top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg animate-bounce transition transform hover:scale-110"
        >
          ⬆
        </button>
      )}
    </footer>
  );
}
