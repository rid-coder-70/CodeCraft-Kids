import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo1.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    if (isOpen) {
      setClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  const token = localStorage.getItem("token");

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    // { name: "Contact", path: "/contact" },
    !token && { name: "Login", path: "/login" },
    !token && { name: "Signup", path: "/signup" },
    token && { name: "Dashboard", path: "/dashboard" },
    token && { name: "Logout", action: handleLogout },
  ].filter(Boolean);

  return (
    <nav className="backdrop-blur-xl bg-gradient-to-r from-black/40 via-purple-900/20 to-black/40 border-b border-white/10 fixed top-0 w-full z-50 shadow-2xl shadow-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-slow"></div>
              <img
                src={Logo}
                alt="CodeCraft Kids Logo"
                className="relative h-14 w-14 object-contain rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] border-2 border-white/20"
              />
            </div>
            <Link
              to="/"
              className="relative text-white font-extrabold text-2xl sm:text-3xl tracking-wide bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              CodeCraft Kids
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) =>
              item.action ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className={`relative px-4 py-2 font-semibold text-lg transition-all duration-300 rounded-xl
                    ${
                      location.pathname === item.path
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20"
                        : "text-gray-200 hover:text-white"
                    } 
                    hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 
                    hover:shadow-lg hover:shadow-purple-500/30 
                    transform hover:scale-105 hover:-translate-y-0.5
                    border border-transparent hover:border-purple-400/30`}
                >
                  {item.name}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-2 font-semibold text-lg transition-all duration-300 rounded-xl
                    ${
                      location.pathname === item.path
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20"
                        : "text-gray-200 hover:text-white"
                    } 
                    hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 
                    hover:shadow-lg hover:shadow-purple-500/30 
                    transform hover:scale-105 hover:-translate-y-0.5
                    border border-transparent hover:border-purple-400/30`}
                >
                  {item.name}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleToggle}
              className="relative p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group"
            >
              <div className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {(isOpen || closing) && (
          <div
            className={`md:hidden transform transition-all duration-300 ease-in-out overflow-hidden ${
              closing
                ? "opacity-0 -translate-y-4 scale-95"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            <div className="bg-gradient-to-b from-black/90 to-purple-900/80 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-purple-500/20 flex flex-col items-end border border-white/10 mt-2">
              {menuItems.map((item, index) =>
                item.action ? (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className={`relative w-full text-right px-8 py-5 font-semibold text-lg transition-all duration-300 
                      hover:bg-gradient-to-l hover:from-purple-500/20 hover:to-pink-500/20 
                      border-b border-white/5 last:border-b-0
                      group overflow-hidden
                      ${closing ? "animate-slideOut" : "animate-slideIn"}`}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <span className="relative z-10 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                      {item.name}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-l from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={handleToggle}
                    className={`relative w-full text-right px-8 py-5 font-semibold text-lg transition-all duration-300 
                      hover:bg-gradient-to-l hover:from-purple-500/20 hover:to-pink-500/20 
                      border-b border-white/5 last:border-b-0
                      group overflow-hidden
                      ${closing ? "animate-slideOut" : "animate-slideIn"}`}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <span className={`relative z-10 transition-all duration-300
                      ${location.pathname === item.path 
                        ? "text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text" 
                        : "text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text"
                      }`}>
                      {item.name}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-l from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes slideIn {
            from { 
              opacity: 0; 
              transform: translateY(-12px) scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }
          @keyframes slideOut {
            from { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
            to { 
              opacity: 0; 
              transform: translateY(-12px) scale(0.95); 
            }
          }
          .animate-slideIn { 
            animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; 
          }
          .animate-slideOut { 
            animation: slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; 
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.75; }
            50% { opacity: 0.5; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}
      </style>
    </nav>
  );
}