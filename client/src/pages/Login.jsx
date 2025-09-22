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
  const [emailExists, setEmailExists] = useState(false); // New state
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

  // Check email existence when typing
  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setFormData({ ...formData, email });

    if (!email) {
      setEmailExists(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/check-email",
        { email }
      );
      setEmailExists(res.data.exists); // API should return { exists: true/false }
    } catch (err) {
      console.error("Email check error:", err);
      setEmailExists(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "email") handleEmailChange(e);
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (emailExists) {
      setErrors({ email: "Email already registered. Try Another." });
      return;
    }

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Store token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setErrors({ submit: "Login failed: Token not received" });
      }
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div
        ref={formRef}
        className={`bg-gray-800 rounded-3xl shadow-2xl p-10 sm:p-12 md:p-14 lg:p-16 w-full max-w-2xl border-2 border-purple-400 transform transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"
        }`}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-lime-50 mb-8">
          Login
        </h2>

        {errors.submit && (
          <p className="text-red-500 text-center mb-4">{errors.submit}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              emailExists ? "border-red-500" : "border-purple-500"
            } bg-gray-900 text-white placeholder-gray-500 focus:outline-none text-base sm:text-lg`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-500 bg-gray-900 text-white placeholder-gray-500 focus:outline-none text-base sm:text-lg"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-lime-500 via-lime-600 to-lime-400 text-gray-900 py-3 sm:py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 text-base sm:text-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-base sm:text-lg">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-500 font-bold hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
