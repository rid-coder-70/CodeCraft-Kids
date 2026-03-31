import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaCalculator } from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

export default function Level3() {
  const navigate = useNavigate();
  const toast = useToast();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);
    confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 }, colors: ["#0ea5e9", "#ffffff", "#ffd700"] });

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ completedLevel: 3 }),
        });
        const data = await res.json();
        if (data.badgeEarned) {
          toast(`🏆 Badge Unlocked: ${data.badgeEarned.name}!`, "success");
          window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 3 }, "*");
        } else {
          toast("✨ Level 3 already completed!", "info");
        }
        setCompleted(true);
      } catch {
        toast("Could not save progress. Try again!", "error");
      }
    } else {
      toast("Login to save your progress!", "info");
      setCompleted(true);
    }
    setLoading(false);
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[2.5rem] p-10 max-w-2xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)] border-2 border-sky-200 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block bg-sky-500 text-white px-6 py-2 rounded-full font-black text-sm mb-5 shadow-lg shadow-sky-200"
        >
          LEVEL 3
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-6xl mb-6 text-sky-500 mx-auto w-fit"
        >
          <FaCalculator />
        </motion.div>

        <h1 className="text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
          Super Math Multipliers!
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Python is a super-fast calculator. It can do tricky math in a blink! Forget your fingers, use code!
        </p>

        <div className="bg-sky-50 rounded-2xl p-6 mb-8 border border-dashed border-sky-400 text-left">
          <div className="bg-[#0f172a] text-green-400 rounded-xl p-5 font-mono text-xl shadow-lg mb-4">
            <span className="text-sky-400">result</span> = 10 + 5 * 2<br />
            print(<span className="text-sky-400">result</span>)
          </div>
          <p className="text-gray-500 text-sm font-semibold">What do you think is inside? 10 + 10 = 20! Python is a math genius!</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleComplete}
          disabled={loading || completed}
          className={`w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg transition-all ${
            completed ? "bg-sky-400 cursor-default" : "bg-gradient-to-r from-sky-500 to-sky-600 hover:shadow-sky-200 hover:shadow-xl cursor-pointer"
          } disabled:opacity-75`}
        >
          {completed ? "✅ Completed! Redirecting..." : loading ? "Saving..." : "Climb On! ⛰️💎"}
        </motion.button>

        <button onClick={() => navigate("/dashboard")} className="mt-5 text-gray-400 font-bold text-sm hover:text-sky-500 transition-colors">
          ← Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}
