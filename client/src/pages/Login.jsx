import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";

// Login schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (formRef.current) observer.observe(formRef.current);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const result = loginSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors = {};
        result.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setErrors({ submit: "Login failed: Token not received" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({
        submit: err.response?.data?.message || "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" style={{ fontFamily: "'Comic Sans MS', 'Arial', sans-serif" }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-300 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ⭐
          </div>
        ))}

        {/* Floating Hearts */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-pink-300 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            💖
          </div>
        ))}

        {/* Bouncing Characters */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`char-${i}`}
            className="absolute text-4xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {['🐼', '😺', '🐻', '🦄', '🐨', '🦊'][i]}
          </div>
        ))}

        {/* Floating Keys (for login theme) */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`key-${i}`}
            className="absolute text-3xl animate-spin-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            🔑
          </div>
        ))}
      </div>

      <div
        ref={formRef}
        className={`relative z-10 bg-white/95 backdrop-blur-xl rounded-[40px] shadow-[0_0_50px_rgba(59,130,246,0.8)] border-8 border-blue-400 p-8 md:p-12 w-full max-w-md transform transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0 scale-100 rainbow-border-login" : "opacity-0 -translate-y-10 scale-95"
          }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(224,242,254,0.98) 100%)',
        }}
      >
        {/* Logo/Brand with Emojis */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl animate-wiggle">🎮</span>
            <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CodeCraft Kids
            </h2>
            <span className="text-5xl animate-wiggle" style={{ animationDelay: '0.5s' }}>🚀</span>
          </div>
          <h1 className="text-4xl font-black text-purple-600 mb-2 animate-bounce-slow">
            Welcome Back! 👋
          </h1>
          <p className="text-blue-600 text-lg">Let's code and have fun! 🌟</p>
        </div>

        {/* Cute Character Row */}
        <div className="flex justify-center gap-3 mb-6 text-4xl">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🐼</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.2s' }}>😺</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🐻</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.6s' }}>🦄</span>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 rounded-3xl bg-red-100 border-4 border-red-400 animate-wiggle">
            <p className="text-red-600 text-center font-bold">❌ {errors.submit}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="relative">
              <span className="absolute left-4 top-4 text-2xl">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Your awesome email!"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-4 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 border-4 border-blue-300 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-400 transition duration-300 font-bold text-lg"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 font-bold">⚠️ {errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-4 top-4 text-2xl">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Super secret password!"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-4 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 border-4 border-blue-300 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-400 transition duration-300 font-bold text-lg"
                required
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 font-bold">⚠️ {errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-5 text-2xl font-black text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] border-4 border-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "🔄 Logging in..." : "🚀 Let's Go!"}
          </button>
        </form>

        <div className="mt-8 text-center border-t-4 border-purple-300 pt-6">
          <p className="text-purple-600 text-lg font-bold">
            New here? 🤔{" "}
            <Link
              to="/signup"
              className="text-pink-600 hover:text-blue-600 underline font-black hover:scale-110 inline-block transition-transform duration-300"
            >
              Join the fun! 🎉
            </Link>
          </p>
        </div>

        {/* Fun Footer */}
        <div className="mt-6 text-center">
          <div className="flex justify-center gap-2 text-3xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🌟</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎮</span>
            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>✨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🌟</span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 6s ease-in-out infinite;
          }
          
          @keyframes wiggle {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
          }
          .animate-wiggle {
            animation: wiggle 1s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(10deg); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
          }
          
          @keyframes rainbow-border-login {
            0% { border-color: #3b82f6; }
            25% { border-color: #8b5cf6; }
            50% { border-color: #ec4899; }
            75% { border-color: #06b6d4; }
            100% { border-color: #3b82f6; }
          }
          .rainbow-border-login {
            animation: rainbow-border-login 4s linear infinite;
          }
        `}
      </style>
    </div>
  );
}