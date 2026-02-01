import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";

// Signup schema
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signup() {
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      const result = signupSchema.safeParse(formData);
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
        "http://localhost:5000/api/auth/signup",
        formData
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setErrors({ submit: "Signup failed: Token not received" });
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrors({
        submit: err.response?.data?.message || "Signup failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600" style={{ fontFamily: "'Comic Sans MS', 'Arial', sans-serif" }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Twinkling Stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-200 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 18 + 12}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ⭐
          </div>
        ))}

        {/* Floating Balloons */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`balloon-${i}`}
            className="absolute text-4xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            {['🎈', '🎉', '🎊', '🎁', '🌟'][Math.floor(Math.random() * 5)]}
          </div>
        ))}

        {/* Bouncing Animals */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`animal-${i}`}
            className="absolute text-5xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {['🐼', '😺', '🐻', '🦄', '🐨', '🦊', '🐸', '🐷'][i]}
          </div>
        ))}

        {/* Floating Confetti */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute animate-spin-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {['🌈', '💫', '✨', '🌸', '🦋'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div
        ref={formRef}
        className={`relative z-10 bg-white/98 backdrop-blur-xl rounded-[40px] shadow-[0_0_60px_rgba(236,72,153,0.9)] border-8 border-pink-400 p-8 md:p-12 w-full max-w-md transform transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0 scale-100 rainbow-border-signup" : "opacity-0 -translate-y-10 scale-95"
          }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,240,255,0.98) 100%)',
        }}
      >
        {/* Logo/Brand with LOTS of Emojis */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl animate-bounce" style={{ animationDelay: '0s' }}>🎉</span>
            <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CodeCraft Kids
            </h2>
            <span className="text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎊</span>
          </div>
          <h1 className="text-4xl font-black text-purple-600 mb-2 animate-wiggle">
            Join the Fun! 🚀
          </h1>
          <p className="text-pink-600 text-lg font-bold">Start your coding adventure TODAY! 🌟</p>
        </div>

        {/* Super Cute Character Row */}
        <div className="flex justify-center gap-2 mb-6 text-4xl">
          <span className="animate-wiggle" style={{ animationDelay: '0s' }}>🐼</span>
          <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>😺</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.3s' }}>🐻</span>
          <span className="animate-bounce" style={{ animationDelay: '0.45s' }}>🦄</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.6s' }}>🐨</span>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 rounded-full bg-red-100 border-4 border-red-400 animate-wiggle">
            <p className="text-red-600 text-center font-black">❌ {errors.submit}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <div className="relative">
              <span className="absolute left-4 top-4 text-2xl">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Your cool name!"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-4 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border-4 border-pink-300 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 font-bold text-lg"
                required
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-2 ml-4 font-bold">⚠️ {errors.name}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-4 top-4 text-2xl">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Your awesome email!"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-4 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border-4 border-pink-300 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 font-bold text-lg"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 ml-4 font-bold">⚠️ {errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-4 top-4 text-2xl">🔐</span>
              <input
                type="password"
                name="password"
                placeholder="Secret password!"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-4 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border-4 border-pink-300 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 font-bold text-lg"
                required
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 ml-4 font-bold">⚠️ {errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-5 text-2xl font-black text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] border-4 border-white disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? "🌟 Creating..." : "🎉 Start Adventure!"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-3xl border-4 border-yellow-300">
          <p className="text-purple-700 font-bold text-center text-sm">
            🎁 Join now and unlock FREE coding games! 🎮
          </p>
        </div>

        <div className="mt-6 text-center border-t-4 border-indigo-300 pt-6">
          <p className="text-purple-600 text-lg font-bold">
            Already coding with us? 🤔{" "}
            <Link
              to="/login"
              className="text-pink-600 hover:text-indigo-600 underline font-black hover:scale-110 inline-block transition-transform duration-300"
            >
              Login here! 👋
            </Link>
          </p>
        </div>

        {/* Fun Footer with Bouncing Emojis */}
        <div className="mt-6 text-center">
          <div className="flex justify-center gap-3 text-3xl mb-3">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🌈</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>⭐</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎮</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>⭐</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🌈</span>
          </div>
          <p className="text-purple-600 font-bold text-sm">Welcome to the CodeCraft family! 💖</p>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
            50% { transform: translateY(-40px) rotate(20deg); }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.8); }
          }
          .animate-twinkle {
            animation: twinkle 2.5s ease-in-out infinite;
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-15px) scale(1.1); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
          }
          
          @keyframes rainbow-border-signup {
            0% { border-color: #ec4899; }
            20% { border-color: #8b5cf6; }
            40% { border-color: #6366f1; }
            60% { border-color: #a855f7; }
            80% { border-color: #f472b6; }
            100% { border-color: #ec4899; }
          }
          .rainbow-border-signup {
            animation: rainbow-border-signup 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
}