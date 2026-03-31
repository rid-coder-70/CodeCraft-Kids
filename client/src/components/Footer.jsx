import {
  FaFacebookF, FaTwitter, FaInstagram, FaGithub,
  FaChevronUp, FaRocket, FaHeart
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "./Toast";
import Logo from "../assets/logo.svg";

const SOCIAL_LINKS = [
  { Icon: FaFacebookF, label: "Facebook", href: "#", hover: "hover:text-blue-600 focus:text-blue-600" },
  { Icon: FaTwitter, label: "Twitter", href: "#", hover: "hover:text-sky-500 focus:text-sky-500" },
  { Icon: FaInstagram, label: "Instagram", href: "#", hover: "hover:text-pink-600 focus:text-pink-600" },
  { Icon: FaGithub, label: "GitHub", href: "#", hover: "hover:text-gray-900 focus:text-gray-900" },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const token = localStorage.getItem("token");

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    !token && { name: "Sign In", path: "/login" },
    !token && { name: "Sign Up", path: "/signup" },
    token && { name: "Dashboard", path: "/dashboard" },
  ].filter(Boolean);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.name.trim() || !feedback.email.trim() || !feedback.message.trim()) {
      toast("Please fill in all fields!", "info");
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    toast("Thanks for your feedback! 💚", "success");
    setFeedback({ name: "", email: "", message: "" });
  };

  // Do not render footer on dashboard to allow sidebar full height control
  if (
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/game") ||
    location.pathname === "/profile"
  ) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-gray-100 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="CodeCraft Kids" className="w-12 h-12 rounded-full border border-green-200" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
                CodeCraft Kids
              </h2>
              <p className="text-gray-500 font-medium text-sm">Empowering the next generation.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ Icon, label, href, hover }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 transition-colors ${hover}`}
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-6">Pages</h3>
            <ul className="space-y-4">
              {quickLinks.map(({ name, path }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === path ? "text-green-600" : "text-gray-500 hover:text-green-500"
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Info */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-6">Info</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
              We provide an interactive platform where learning to code is as fun as playing a game!
              Perfect for ages 6-15.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
              <span className="text-green-800 text-sm font-bold uppercase tracking-wider">Safe & Educational</span>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4 flex items-center gap-2">
              Send Feedback
            </h3>
            <form className="space-y-3" onSubmit={handleFeedbackSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text" placeholder="Your Name" value={feedback.name}
                  onChange={e => setFeedback(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm font-medium text-gray-900 placeholder-gray-400 transition-all"
                />
                <input
                  type="email" placeholder="Your Email" value={feedback.email}
                  onChange={e => setFeedback(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm font-medium text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
              <textarea
                placeholder="How can we improve?" rows="2" value={feedback.message}
                onChange={e => setFeedback(p => ({ ...p, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 resize-none text-sm font-medium text-gray-900 placeholder-gray-400 transition-all"
              />
              <button
                type="submit" disabled={sending}
                className="w-full py-2.5 bg-[#a0cc5b] hover:bg-[#8ebb4a] text-white rounded-xl font-bold transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
              >
                {sending ? "Sending..." : "Send Message"} <FaRocket />
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} CodeCraft Kids. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm font-medium flex items-center gap-1">
            Made with <FaHeart className="text-red-400 block" /> for young developers
          </p>
        </div>

      </div>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-100 text-gray-500 shadow-md hover:text-green-600 hover:border-green-200 transition-all"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="text-lg" />
        </button>
      )}
    </footer>
  );
}
