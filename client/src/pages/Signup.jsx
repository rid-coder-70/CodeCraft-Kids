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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse(formData);
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
      setErrors({ submit: err.response?.data?.message || "Signup failed" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 px-4">
      <div
        ref={formRef}
        className={`bg-gray-900/90 rounded-3xl shadow-2xl p-10 sm:p-12 md:p-14 lg:p-16 w-full max-w-2xl border-2 border-purple-400 backdrop-blur-sm transform transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"
        }`}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-lime-50 mb-8">
          Create an Account
        </h2>

        {errors.submit && (
          <p className="text-red-500 text-center mb-4">{errors.submit}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800 text-white focus:outline-none text-base sm:text-lg"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800 text-white focus:outline-none text-base sm:text-lg"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800 text-white focus:outline-none text-base sm:text-lg"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 text-gray-900 py-3 sm:py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 text-base sm:text-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-base sm:text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
