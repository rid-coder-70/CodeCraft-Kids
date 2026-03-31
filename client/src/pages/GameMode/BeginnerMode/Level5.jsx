import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaCrown, FaUnlock } from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

export default function Level5() {
  const navigate = useNavigate();
  const toast = useToast();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);

    // Royal confetti burst!
    const end = Date.now() + 2000;
    const frame = () => {
      confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#a855f7", "#ffd700", "#ffffff"] });
      confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#a855f7", "#ffd700", "#ffffff"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ completedLevel: 5 }),
        });
        const data = await res.json();
        if (data.badgeEarned) {
          toast(`👑 BADGE UNLOCKED: ${data.badgeEarned.name}! You're a Python Master!`, "success");
          window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 5 }, "*");
        } else {
          toast("✨ Already a Master Coder!", "info");
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
    setTimeout(() => navigate("/dashboard"), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5ff] to-[#ede9fe] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[2.5rem] p-10 max-w-2xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)] border-2 border-purple-200 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full font-black text-sm mb-5 shadow-lg shadow-purple-200"
        >
          LEVEL 5 — FINAL BOSS!
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-6xl mb-6 text-purple-600 mx-auto w-fit"
        >
          <FaCrown />
        </motion.div>

        <h1 className="text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
          Master Coder!
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          You've learned <strong className="text-gray-800">print</strong>, <strong className="text-gray-800">variables</strong>, <strong className="text-gray-800">math</strong>, and <strong className="text-gray-800">input</strong>. Now combine them all into one program!
        </p>

        <div className="bg-purple-50 rounded-2xl p-6 mb-8 border border-dashed border-purple-400 text-left">
          <div className="bg-[#0f172a] text-green-400 rounded-xl p-5 font-mono text-base shadow-lg mb-4 leading-loose">
            <span className="text-purple-400">name</span> = input(<span className="text-yellow-300">"Your name: "</span>)<br />
            <span className="text-purple-400">age</span> = <span className="text-yellow-300">10</span><br />
            <span className="text-purple-400">future_age</span> = age + 5<br />
            print(<span className="text-yellow-300">"Hi"</span>, <span className="text-purple-400">name</span>, <span className="text-yellow-300">"! In 5 years you'll be"</span>, <span className="text-purple-400">future_age</span>)
          </div>
          <p className="text-gray-500 text-sm font-semibold">🎉 Combining everything makes real programs! You're officially a Python Coder!</p>
        </div>

        {/* Achievement unlocked preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-100 to-yellow-50 rounded-2xl p-5 mb-8 border border-purple-100 flex items-center gap-4 text-left"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-full flex items-center justify-center text-white text-2xl shadow-md"><FaCrown /></div>
          <div>
            <div className="font-black text-gray-900 text-base">Function Wizard Badge</div>
            <div className="text-gray-500 text-sm font-semibold mt-0.5">Complete this level to unlock!</div>
          </div>
          <div className="ml-auto text-yellow-500 text-xl"><FaUnlock /></div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleComplete}
          disabled={loading || completed}
          className={`w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg transition-all ${
            completed ? "bg-purple-400 cursor-default" : "bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-purple-200 hover:shadow-xl cursor-pointer"
          } disabled:opacity-75`}
        >
          {completed ? "✨ Master Unlocked! Redirecting..." : loading ? "Saving..." : "Claim Your Crown! ✨"}
        </motion.button>

        <button onClick={() => navigate("/dashboard")} className="mt-5 text-gray-400 font-bold text-sm hover:text-purple-500 transition-colors">
          ← Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}
