import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaCalculator, FaChevronRight, FaLightbulb, FaGamepad, FaCheckCircle, FaStar, FaArrowLeft, FaGem, FaFire } from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

const QUIZ = [
  { q: "What does 10 + 5 * 2 equal in Python?", options: ["30", "20", "15", "100"], answer: 1 },
  { q: "Which symbol is used for multiplication in Python?", options: ["x", "×", "*", "#"], answer: 2 },
  { q: "What does // do in Python?", options: ["Divide normally", "Floor division (no decimal)", "Multiply", "Comment"], answer: 1 },
];

const OPS = [
  { symbol: "+", name: "Addition", example: "5 + 3 = 8", color: "from-green-400 to-green-500", bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
  { symbol: "-", name: "Subtraction", example: "10 - 4 = 6", color: "from-red-400 to-red-500", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
  { symbol: "*", name: "Multiply", example: "3 * 4 = 12", color: "from-blue-400 to-blue-500", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  { symbol: "/", name: "Divide", example: "15 / 3 = 5.0", color: "from-purple-400 to-purple-500", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  { symbol: "**", name: "Power", example: "2 ** 4 = 16", color: "from-yellow-400 to-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
  { symbol: "%", name: "Remainder", example: "10 % 3 = 1", color: "from-pink-400 to-pink-500", bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
];

const FONT = "'KG Primary Penmanship', 'Caveat', cursive";
const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } };

export default function Level3() {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [num1, setNum1] = useState("10");
  const [num2, setNum2] = useState("3");
  const [op, setOp] = useState("+");
  const [calcResult, setCalcResult] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const handleCalculate = () => {
    const n1 = parseFloat(num1), n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) { toast("Enter valid numbers!", "error"); return; }
    let result;
    switch (op) {
      case "+": result = n1 + n2; break;
      case "-": result = n1 - n2; break;
      case "*": result = n1 * n2; break;
      case "/": result = n2 === 0 ? "Error: Can't divide by 0! 🚫" : n1 / n2; break;
      case "**": result = Math.pow(n1, n2); break;
      case "%": result = n2 === 0 ? "Error: Can't mod by 0! 🚫" : n1 % n2; break;
      default: result = "?";
    }
    setCalcResult(result);
    if (typeof result === "number") toast(`Python calculated: ${result}!`, "success");
  };

  const handleQuizAnswer = (idx) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    if (QUIZ[quizIdx].answer === idx) { setQuizScore((s) => s + 1); toast("Correct!", "success"); }
    else toast("Not quite!", "error");
    setTimeout(() => {
      if (quizIdx + 1 < QUIZ.length) { setQuizIdx((i) => i + 1); setQuizSelected(null); }
      else setQuizDone(true);
    }, 1000);
  };

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors: ["#0ea5e9", "#ffffff", "#ffd700"] });
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ completedLevel: 3 }),
        });
        const data = await res.json();
        if (data.badgeEarned) { toast(`🏆 Badge: ${data.badgeEarned.name}!`, "success"); window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 3 }, "*"); }
        else toast("✨ Level 3 already completed!", "info");
        setCompleted(true);
      } catch { toast("Could not save progress!", "error"); }
    } else { toast("Login to save!", "info"); setCompleted(true); }
    setLoading(false);
    setTimeout(() => navigate("/dashboard"), 2500);
  };

  const steps = ["Intro", "Learn", "Calculator", "Quiz", "Complete"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#bae6fd] font-sans overflow-x-hidden">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-sky-500 transition-colors"><FaArrowLeft /> Dashboard</button>
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${i < step ? "bg-sky-400 text-white" : i === step ? "bg-sky-500 text-white shadow-md scale-110" : "bg-gray-100 text-gray-400"}`}>
                {i < step ? <FaCheckCircle className="text-[10px]" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-5 h-0.5 rounded-full transition-all duration-500 ${i < step ? "bg-sky-400" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs font-black">
          <span className="text-blue-500 flex items-center gap-1"><FaGem /> +50</span>
          <span className="text-orange-500 flex items-center gap-1"><FaFire /> +100 XP</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">

          {/* INTRO */}
          {step === 0 && (
            <motion.div key="intro" {...fadeUp} className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-block bg-gradient-to-r from-sky-400 to-sky-500 text-white px-8 py-2 rounded-full font-black text-sm mb-6 shadow-lg shadow-sky-200">
                🔢 LEVEL 3 — SUPER MATH
              </motion.div>
              <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                className="text-8xl mb-6 text-sky-500 mx-auto w-fit"><FaCalculator /></motion.div>
              <h1 className="text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: FONT }}>Python is a Super Calculator! 🚀</h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                Forget your fingers! Python can do <strong className="text-sky-600">any math</strong> in a fraction of a second. Addition, subtraction, powers — Python handles it all!
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {OPS.slice(0, 3).map((op, i) => (
                  <motion.div key={op.symbol} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                    className={`${op.bg} border ${op.border} rounded-2xl p-4 text-center`}>
                    <div className={`text-3xl font-black ${op.text} mb-1`}>{op.symbol}</div>
                    <div className={`text-xs font-black ${op.text}`}>{op.name}</div>
                    <div className="text-gray-400 text-[10px] font-mono mt-1">{op.example}</div>
                  </motion.div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(1)}
                className="w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg bg-gradient-to-r from-sky-400 to-sky-500 hover:shadow-sky-200 hover:shadow-xl flex items-center justify-center gap-3">
                Start Learning! <FaChevronRight />
              </motion.button>
            </motion.div>
          )}

          {/* LEARN */}
          {step === 1 && (
            <motion.div key="learn" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 text-xl"><FaLightbulb /></div>
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Learn: Math in Python</h2>
                  <p className="text-gray-400 text-sm font-semibold">6 powerful operators</p></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {OPS.map((op, i) => (
                  <motion.div key={op.symbol} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03 }} className={`${op.bg} border ${op.border} rounded-2xl p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-2xl font-black ${op.text} font-mono`}>{op.symbol}</span>
                      <span className={`font-black ${op.text} text-sm`}>{op.name}</span>
                    </div>
                    <code className="text-gray-500 text-xs font-mono">{op.example}</code>
                  </motion.div>
                ))}
              </div>

              {/* Order of operations */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="bg-[#0f172a] rounded-2xl p-5 mb-5 border border-sky-900">
                <div className="text-xs text-gray-400 font-sans font-bold mb-3 uppercase tracking-wider">Python follows math order (BODMAS):</div>
                <div className="font-mono text-sm leading-loose">
                  <div><span className="text-sky-400">result</span> = 10 + 5 * 2 <span className="text-gray-500 ml-2"># = 20 (not 30!)</span></div>
                  <div><span className="text-sky-400">result2</span> = (10 + 5) * 2 <span className="text-gray-500 ml-2"># = 30 (brackets first!)</span></div>
                  <div><span className="text-green-400">print</span>(<span className="text-sky-400">result</span>, <span className="text-sky-400">result2</span>)</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 mt-3 font-mono text-sm">
                  <span className="text-gray-400 text-xs font-sans">▶ OUTPUT: </span><span className="text-green-400">20  30</span>
                </div>
              </motion.div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-colors">← Back</button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(2)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 shadow-lg flex items-center justify-center gap-2">
                  Open the Calculator! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* CALCULATOR */}
          {step === 2 && (
            <motion.div key="calc" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 text-xl"><FaGamepad /></div>
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Python Calculator! 🧮</h2>
                  <p className="text-gray-400 text-sm font-semibold">Try any math operation</p></div>
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-sky-100 mb-4">
                {/* Number inputs */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <label className="text-xs font-black text-gray-400 uppercase mb-1 block">Number 1</label>
                    <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)}
                      className="w-full px-4 py-3 bg-sky-50 border-2 border-sky-200 rounded-xl font-mono text-lg font-bold text-center focus:outline-none focus:border-sky-400 transition-all" />
                  </div>
                  <div className="flex flex-col items-center gap-1 pt-4">
                    {["+", "-", "*", "/", "**", "%"].map((o) => (
                      <button key={o} onClick={() => setOp(o)}
                        className={`w-12 py-1 rounded-lg font-mono font-black text-sm transition-all ${op === o ? "bg-sky-500 text-white shadow-md scale-110" : "bg-gray-100 text-gray-500 hover:bg-sky-100"}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-black text-gray-400 uppercase mb-1 block">Number 2</label>
                    <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)}
                      className="w-full px-4 py-3 bg-sky-50 border-2 border-sky-200 rounded-xl font-mono text-lg font-bold text-center focus:outline-none focus:border-sky-400 transition-all" />
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-[#0f172a] rounded-xl p-4 font-mono text-sm mb-4">
                  <div><span className="text-sky-400">result</span> = <span className="text-white">{num1 || "?"} {op} {num2 || "?"}</span></div>
                  <div><span className="text-green-400">print</span>(<span className="text-sky-400">result</span>)</div>
                </div>

                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleCalculate}
                  className="w-full py-3 font-black text-white rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 shadow-lg text-lg">
                  ▶ Calculate!
                </motion.button>

                <AnimatePresence>
                  {calcResult !== null && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-sky-50 rounded-xl p-4 border border-sky-200 text-center">
                      <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">▶ OUTPUT</div>
                      <div className="text-3xl font-black text-sky-600 font-mono">{String(calcResult)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Quick challenges */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-6">
                <h3 className="font-black text-amber-800 mb-3 text-sm flex items-center gap-1"><FaStar className="text-amber-500" /> Quick Challenges</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[["7", "*", "8"], ["2", "**", "10"], ["100", "%", "7"]].map(([n1, o, n2], i) => (
                    <button key={i} onClick={() => { setNum1(n1); setOp(o); setNum2(n2); setCalcResult(null); }}
                      className="bg-white rounded-xl p-2 text-xs font-mono font-bold text-gray-600 hover:bg-amber-100 border border-amber-100 transition-colors">
                      {n1} {o} {n2}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-colors">← Back</button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(3)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 shadow-lg flex items-center justify-center gap-2">
                  Take the Quiz! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {step === 3 && (
            <motion.div key="quiz" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center text-xl">🧠</div>
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Math Quiz!</h2>
                  <p className="text-gray-400 text-sm font-semibold">Test your Python math skills</p></div>
                <div className="ml-auto text-sm font-black text-gray-500">{quizScore}/{QUIZ.length} ⭐</div>
              </div>
              {!quizDone ? (
                <motion.div key={quizIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-black text-gray-400">Q {quizIdx + 1}/{QUIZ.length}</span>
                    <div className="flex gap-1">{QUIZ.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i < quizIdx ? "bg-sky-400" : i === quizIdx ? "bg-yellow-400" : "bg-gray-200"}`} />)}</div>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-5">{QUIZ[quizIdx].q}</h3>
                  <div className="space-y-3">
                    {QUIZ[quizIdx].options.map((opt, i) => {
                      const isCorrect = i === QUIZ[quizIdx].answer;
                      const isSelected = i === quizSelected;
                      return (
                        <motion.button key={i} whileHover={quizSelected === null ? { scale: 1.02 } : {}} onClick={() => handleQuizAnswer(i)}
                          className={`w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${quizSelected !== null ? isCorrect ? "bg-green-50 border-green-400 text-green-700" : isSelected ? "bg-red-50 border-red-400 text-red-700" : "bg-gray-50 border-gray-100 text-gray-400" : "bg-white border-gray-200 text-gray-700 hover:border-sky-300 hover:bg-sky-50"}`}>
                          {["A", "B", "C", "D"][i]}. {opt} {quizSelected !== null && isCorrect && <FaCheckCircle className="inline-block ml-2 text-green-500" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <div className="text-6xl mb-4">{quizScore === QUIZ.length ? "🏆" : "🌟"}</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: FONT }}>{quizScore === QUIZ.length ? "Math Genius!" : "Good Work!"}</h3>
                  <p className="text-gray-500 font-semibold mb-6"><strong className="text-sky-600">{quizScore}/{QUIZ.length}</strong> correct!</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setQuizIdx(0); setQuizScore(0); setQuizSelected(null); setQuizDone(false); }} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl text-sm">Retry</button>
                    <motion.button whileHover={{ scale: 1.03 }} onClick={() => setStep(4)} className="px-8 py-3 font-black text-white rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 shadow-lg text-sm">Finish! 🎉</motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* COMPLETE */}
          {step === 4 && (
            <motion.div key="complete" {...fadeUp} className="text-center">
              <motion.div animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-8xl mb-6 mx-auto w-fit">🧮</motion.div>
              <h1 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: FONT }}>Level 3 Complete!</h1>
              <p className="text-gray-500 text-lg mb-6">You're a <strong className="text-sky-600">Python Math Master</strong>! No calculator needed! 🔢</p>
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-center"><FaGem className="text-blue-500 text-2xl mx-auto mb-1" /><div className="font-black text-blue-700">+50 Gems</div></div>
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 text-center"><FaFire className="text-orange-500 text-2xl mx-auto mb-1" /><div className="font-black text-orange-700">+100 XP</div></div>
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 text-center"><FaStar className="text-yellow-500 text-2xl mx-auto mb-1" /><div className="font-black text-yellow-700 text-sm">Quiz: {quizScore}/{QUIZ.length} ⭐</div></div>
              </div>
              <div className="bg-sky-50 rounded-2xl p-5 border border-sky-200 mb-8 text-left">
                <h3 className="font-black text-sky-800 mb-3">🎓 What You Learned:</h3>
                <ul className="space-y-2">
                  {["+ - * / ** % are Python's math operators", "Python follows BODMAS order of operations", "Use variables to store math results", "Parentheses () control calculation order"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-semibold text-sky-700"><FaCheckCircle className="text-sky-500 shrink-0" /> {item}</li>
                  ))}
                </ul>
              </div>
              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} onClick={handleComplete} disabled={loading || completed}
                className={`w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg transition-all ${completed ? "bg-sky-400 cursor-default" : "bg-gradient-to-r from-sky-400 to-sky-500 hover:shadow-sky-200 hover:shadow-xl"} disabled:opacity-75`}>
                {completed ? "✅ Completed! Redirecting..." : loading ? "Saving..." : "Claim Your Gems! 💎"}
              </motion.button>
              <button onClick={() => navigate("/dashboard")} className="mt-4 text-gray-400 font-bold text-sm hover:text-sky-500 transition-colors">← Back to Dashboard</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
