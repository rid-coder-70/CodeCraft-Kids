import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaQuestionCircle } from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

export default function Level4() {
  const navigate = useNavigate();
  const toast = useToast();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    if (!userAnswer.trim()) return;
    setAnswered(true);
    toast(`🎉 Python would say: "${userAnswer}"! Awesome!`, "success");
  };

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);
    confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 }, colors: ["#f59e0b", "#ffffff", "#ffd700"] });

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ completedLevel: 4 }),
        });
        const data = await res.json();
        if (data.badgeEarned) {
          toast(`🏆 Badge Unlocked: ${data.badgeEarned.name}!`, "success");
          window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 4 }, "*");
        } else {
          toast("✨ Level 4 already completed!", "info");
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
    <div className="min-h-screen bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[2.5rem] p-10 max-w-2xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)] border-2 border-amber-200 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block bg-amber-500 text-white px-6 py-2 rounded-full font-black text-sm mb-5 shadow-lg shadow-amber-200"
        >
          LEVEL 4
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-6xl mb-6 text-amber-500 mx-auto w-fit"
        >
          <FaQuestionCircle />
        </motion.div>

        <h1 className="text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
          Ask Questions!
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Python can ask the user questions with <strong className="text-gray-800">input()</strong>! Whatever the user types gets stored in a variable. Try it!
        </p>

        <div className="bg-amber-50 rounded-2xl p-6 mb-6 border border-dashed border-amber-400 text-left">
          <div className="bg-[#0f172a] text-green-400 rounded-xl p-5 font-mono text-xl shadow-lg mb-4">
            <span className="text-amber-400">name</span> = input(<span className="text-yellow-300">"What is your name? "</span>)<br />
            print(<span className="text-yellow-300">"Hello, "</span> + <span className="text-amber-400">name</span>)
          </div>
          <p className="text-gray-500 text-sm font-semibold">Python saves whatever the user types into "name" and greets them!</p>
        </div>

        {/* Interactive mini-challenge */}
        <div className="bg-amber-50 rounded-2xl p-5 mb-8 border border-amber-200">
          <p className="font-bold text-amber-800 mb-3 text-sm">🎮 Mini Challenge: What would Python say if you typed your name?</p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type your name..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-amber-200 rounded-xl text-sm font-bold focus:outline-none focus:border-amber-400 transition-all"
            />
            <button onClick={handleAnswer} className="px-5 py-2.5 bg-amber-500 text-white font-black rounded-xl text-sm hover:bg-amber-600 transition-colors">
              Try!
            </button>
          </div>
          {answered && (
            <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-amber-700 font-bold text-sm">
              💻 Output: "Hello, {userAnswer}"
            </motion.p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleComplete}
          disabled={loading || completed}
          className={`w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg transition-all ${
            completed ? "bg-amber-400 cursor-default" : "bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-amber-200 hover:shadow-xl cursor-pointer"
          } disabled:opacity-75`}
        >
          {completed ? "✅ Completed! Redirecting..." : loading ? "Saving..." : "Ask Away! 💎"}
        </motion.button>

        <button onClick={() => navigate("/dashboard")} className="mt-5 text-gray-400 font-bold text-sm hover:text-amber-500 transition-colors">
          ← Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}
