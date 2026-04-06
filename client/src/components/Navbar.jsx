import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.svg";
import { FaBars, FaTimes, FaHome, FaSignInAlt, FaUserPlus, FaInfoCircle, FaTachometerAlt } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const hidden =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/game") ||
    location.pathname === "/profile" ||
    location.pathname.startsWith("/game/level");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  if (hidden) return null;

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
  ];

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-md border-b border-gray-100" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <Link to="/" className="flex items-center gap-3 group" aria-label="CodeCraft Kids Home">
            <motion.img
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={Logo}
              alt="CodeCraft Kids"
              className="h-9 w-9 object-contain rounded-full border border-green-200 shadow-sm"
            />
            <span
              className="font-black text-xl text-gray-800 group-hover:text-green-600 transition-colors"
              style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}
            >
              CodeCraft Kids
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <span className="text-sm">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#a0cc5b] text-white font-black rounded-2xl text-sm hover:bg-[#8ebb4a] transition-all shadow-sm shadow-green-200"
                >
                  <FaTachometerAlt className="text-sm" /> Dashboard
                </Link>
              </motion.div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-gray-600 font-bold text-sm hover:text-green-600 transition-colors px-3 py-2"
                >
                  <FaSignInAlt className="text-sm" /> Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/signup"
                    className="flex items-center gap-1.5 text-white bg-gradient-to-r from-[#a0cc5b] to-[#8ebb4a] font-black text-sm rounded-2xl px-6 py-2.5 hover:shadow-md hover:shadow-green-100 transition-all"
                  >
                    <FaUserPlus className="text-sm" /> Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="text-green-500">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-1 flex flex-col gap-2">
                {isLoggedIn ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 py-3 bg-[#a0cc5b] text-white font-black rounded-2xl text-sm"
                  >
                    <FaTachometerAlt /> Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 font-bold rounded-2xl text-sm hover:bg-gray-50 transition-colors"
                    >
                      <FaSignInAlt /> Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center gap-2 py-3 bg-[#a0cc5b] text-white font-black rounded-2xl text-sm"
                    >
                      <FaUserPlus /> Get Started — It's Free!
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}