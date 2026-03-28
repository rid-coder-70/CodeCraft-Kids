import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo1.png";

export default function Navbar() {
  const location = useLocation();

  // Hide Navbar completely on the dashboard or game pages to use the new Sidebar layout
  if (
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/game") ||
    location.pathname === "/profile"
  ) {
    return null;
  }

  return (
    <nav className="w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={Logo}
              alt="CodeCraft Kids"
              className="h-10 w-10 object-contain rounded-full border border-green-200"
            />
            <Link
              to="/"
              className="font-bold text-2xl text-gray-800"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              CodeCraft Kids
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex items-center space-x-6">
            {localStorage.getItem("token") ? (
              <Link
                to="/dashboard"
                className="bg-green-500 text-white font-bold rounded-full px-8 py-2.5 hover:bg-green-600 transition-colors shadow-sm"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 font-bold hover:text-green-600 transition-colors"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-green-500 font-bold border-2 border-green-300 rounded-full px-6 py-2 hover:bg-green-50 transition-colors"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}