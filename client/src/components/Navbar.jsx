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
    <nav className="backdrop-blur-xl bg-black/30 border-b border-white/10 fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <img
              src={Logo}
              alt="CodeCraft Kids Logo"
              className="h-12 w-12 object-contain rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-3 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            />
            <Link
              to="/"
              className="relative text-white font-extrabold text-2xl sm:text-3xl tracking-wide"
            >
              CodeCraft Kids
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) =>
              item.action ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className={`relative text-white font-medium text-lg px-2 py-1 transition duration-300 rounded-lg
                    ${
                      location.pathname === item.path
                        ? "text-pink-400"
                        : "hover:text-pink-400"
                    } hover:scale-105 hover:shadow-[inset_0_0_10px_rgba(236,72,153,0.4)]`}
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 hover:w-full"></span>
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-white font-medium text-lg px-2 py-1 transition duration-300 rounded-lg
                    ${
                      location.pathname === item.path
                        ? "text-pink-400"
                        : "hover:text-pink-400"
                    } hover:scale-105 hover:shadow-[inset_0_0_10px_rgba(236,72,153,0.4)]`}
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 hover:w-full"></span>
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleToggle}
              className="text-white hover:text-pink-400 focus:outline-none p-2 rounded-full hover:bg-white/10 transition"
            >
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
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {(isOpen || closing) && (
          <div
            className={`md:hidden transform transition-all duration-300 ease-in-out overflow-hidden ${
              closing
                ? "opacity-0 -translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="bg-black/80 backdrop-blur-xl rounded-b-xl shadow-xl flex flex-col items-end border-t border-white/10">
              {menuItems.map((item, index) =>
                item.action ? (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className={`relative w-full text-right px-6 py-4 text-white font-medium text-lg transition duration-300 hover:text-pink-400 hover:bg-white/10 ${
                      closing ? "animate-slideOut" : "animate-slideIn"
                    }`}
                    style={{
                      animationDelay: `${index * 0.07}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={handleToggle}
                    className={`relative w-full text-right px-6 py-4 text-white font-medium text-lg transition duration-300 hover:text-pink-400 hover:bg-white/10 ${
                      closing ? "animate-slideOut" : "animate-slideIn"
                    }`}
                    style={{
                      animationDelay: `${index * 0.07}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {item.name}
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
            from { opacity: 0; transform: translateY(-12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-12px); }
          }
          .animate-slideIn { animation: slideIn 0.35s ease forwards; }
          .animate-slideOut { animation: slideOut 0.35s ease forwards; }
        `}
      </style>
    </nav>
  );
}
