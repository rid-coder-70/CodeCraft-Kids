import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaCommentDots } from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

export default function Level1() {
  const navigate = useNavigate();
  const toast = useToast();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);

    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#a0cc5b", "#ffffff", "#ffd700", "#84cc16"],
    });

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completedLevel: 1 }),
        });
        const data = await res.json();
        if (data.badgeEarned) {
          toast(`🏆 Badge Unlocked: ${data.badgeEarned.name}!`, "success");
          // Also post a window message (for Dashboard listener if embedded)
          window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 1 }, "*");
        } else {
          toast("✨ Level 1 already completed! Great job!", "info");
        }
        setCompleted(true);
      } catch (e) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#f9faec] to-[#e8f5d0] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[2.5rem] p-10 max-w-2xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)] border-2 border-[#e1ecdf] text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block bg-[#a0cc5b] text-white px-6 py-2 rounded-full font-black text-sm mb-5 shadow-lg shadow-green-200"
        >
          LEVEL 1
        </motion.div>

        {/* Character */}
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-6xl mb-6">
          <FaCommentDots className="text-green-500 mx-auto" />
        </motion.div>

        <h1 className="text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
          The Power of Words!
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          In Python, the most important command is <strong className="text-gray-800">print</strong>. It's like your computer's voice! It shouts whatever you put inside the quotes.
        </p>

        {/* Code block */}
        <div className="bg-[#eff5f0] rounded-2xl p-6 mb-8 border border-dashed border-[#a0cc5b] text-left">
          <div className="bg-[#0f172a] text-green-400 rounded-xl p-5 font-mono text-xl shadow-lg mb-4">
            print(<span className="text-yellow-300">"Hello, CodeCrafter!"</span>)
          </div>
          <p className="text-gray-500 text-sm font-semibold">Try to say your name next! But first, let's finish this level!</p>
        </div>

        {/* Complete Button */}
        <motion.button
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleComplete}
          disabled={loading || completed}
          className={`w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg transition-all ${
            completed
              ? "bg-green-400 cursor-default"
              : "bg-gradient-to-r from-[#a0cc5b] to-[#8ebb4a] hover:shadow-green-200 hover:shadow-xl cursor-pointer"
          } disabled:opacity-75`}
        >
          {completed ? "✅ Completed! Redirecting..." : loading ? "Saving..." : "Finish & Get Gems! 💎"}
        </motion.button>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-5 text-gray-400 font-bold text-sm hover:text-[#a0cc5b] transition-colors"
        >
          ← Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}
