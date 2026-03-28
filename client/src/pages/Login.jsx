import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { API_BASE } from "../config";
import { useToast } from "../components/Toast";
import Logo from "../assets/Logo1.png";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const result = loginSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors = {};
        result.error.issues.forEach(issue => { fieldErrors[issue.path[0]] = issue.message; });
        setErrors(fieldErrors);
        return;
      }
      const res = await axios.post(`${API_BASE}/api/auth/login`, formData);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast("Welcome back! 🎉", "success");
        navigate("/dashboard");
      } else {
        setErrors({ submit: "Login failed: Token not received" });
      }
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "Wrong email or password! Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img src={Logo} alt="CodeCraft Kids" className="mx-auto h-16 w-16 object-contain rounded-full border border-green-200" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your CodeCraft Kids account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:rounded-2xl sm:px-10 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          
          {errors.submit && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
              {errors.submit}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email" name="email"
                value={formData.email} onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-400 focus:border-green-400 text-gray-900 text-sm transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password" name="password"
                value={formData.password} onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-400 focus:border-green-400 text-gray-900 text-sm transition-colors"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <button
                type="submit" disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#a0cc5b] hover:bg-[#8ebb4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm font-medium">
            <span className="text-gray-500">New here? </span>
            <Link to="/signup" className="text-green-600 hover:text-green-500 ml-1">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}