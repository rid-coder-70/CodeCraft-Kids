import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaCrown, FaChevronRight, FaLightbulb, FaRocket, FaCheckCircle, FaStar, FaArrowLeft, FaGem, FaFire, FaTrophy, FaLock, FaUnlock } from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

const QUIZ = [
  { q: "Which Python concept lets you repeat actions?", options: ["print()", "input()", "for loop", "variable"], answer: 2 },
  { q: "What does 'if' do in Python?", options: ["Repeats code", "Makes a decision based on condition", "Stores data", "Asks for input"], answer: 1 },
  { q: "What will this print?\n\nfor i in range(3):\n    print(i)", options: ["1 2 3", "0 1 2", "3 3 3", "0 0 0"], answer: 1 },
];

const FONT = "'KG Primary Penmanship', 'Caveat', cursive";
const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } };

const SKILLS = [
  { id: 1, name: "print()", desc: "Show text on screen", icon: "💬", color: "from-green-400 to-green-500", mastered: true },
  { id: 2, name: "Variables", desc: "Store data in boxes", icon: "📦", color: "from-pink-400 to-pink-500", mastered: true },
  { id: 3, name: "Math", desc: "Calculate like a genius", icon: "🔢", color: "from-sky-400 to-sky-500", mastered: true },
  { id: 4, name: "input()", desc: "Ask users questions", icon: "💬", color: "from-amber-400 to-orange-400", mastered: true },
  { id: 5, name: "if / for", desc: "Control flow (bonus!)", icon: "🔄", color: "from-purple-500 to-purple-700", mastered: false },
];

const BOSS_CHALLENGES = [
  { label: "Write a greeting program", code: 'name = input("Your name: ")\nprint("Hello,", name, "! Welcome to Python! 🐍")', hint: "Uses: input() + print() + variables" },
  { label: "Calculate future age", code: 'age = int(input("Your age: "))\nprint("In 10 years:", age + 10)', hint: "Uses: input() + int() + math" },
  { label: "Mini for loop", code: 'for i in range(5):\n    print("Count:", i)', hint: "Uses: for loop + range()" },
];

export default function Level5() {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [starCount, setStarCount] = useState(0);

  // Royal confetti burst helper
  const royalConfetti = () => {
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#a855f7", "#ffd700", "#ffffff"] });
      confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#a855f7", "#ffd700", "#ffffff"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleQuizAnswer = (idx) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    if (QUIZ[quizIdx].answer === idx) {
      setQuizScore((s) => s + 1);
      setStarCount((s) => s + 1);
      toast("Correct! ⭐", "success");
    } else toast("Not quite!", "error");
    setTimeout(() => {
      if (quizIdx + 1 < QUIZ.length) { setQuizIdx((i) => i + 1); setQuizSelected(null); }
      else { setQuizDone(true); }
    }, 1000);
  };

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);
    royalConfetti();
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
          toast(`👑 BADGE UNLOCKED: ${data.badgeEarned.name}! Python Master!`, "success");
          window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 5 }, "*");
        } else toast("✨ Already a Master Coder!", "info");
        setCompleted(true);
      } catch { toast("Could not save progress!", "error"); }
    } else { toast("Login to save!", "info"); setCompleted(true); }
    setLoading(false);
    setTimeout(() => navigate("/dashboard"), 3000);
  };

  const steps = ["Intro", "Recap", "Boss Challenges", "Quiz", "MASTER!"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5ff] via-[#ede9fe] to-[#ddd6fe] font-sans overflow-x-hidden">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-purple-500 transition-colors"><FaArrowLeft /> Dashboard</button>
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${i < step ? "bg-purple-500 text-white" : i === step ? "bg-purple-600 text-white shadow-md scale-110" : "bg-gray-100 text-gray-400"}`}>
                {i < step ? <FaCheckCircle className="text-[10px]" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-4 h-0.5 rounded-full transition-all duration-500 ${i < step ? "bg-purple-400" : "bg-gray-200"}`} />}
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
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, delay: 0.2 }}
                className="inline-block bg-gradient-to-r from-purple-600 to-yellow-400 text-white px-8 py-2 rounded-full font-black text-sm mb-6 shadow-lg shadow-purple-200">
                👑 LEVEL 5 — FINAL BOSS
              </motion.div>

              <motion.div animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-8xl mb-6 text-purple-600 mx-auto w-fit"><FaCrown /></motion.div>

              <h1 className="text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: FONT }}>Master Coder Showdown! 👑</h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-6 max-w-lg mx-auto">
                You've made it to the <strong className="text-purple-600">FINAL LEVEL!</strong> Time to combine everything — print, variables, math, and input — into one epic program!
              </p>

              {/* Level progress bar */}
              <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black text-gray-500">Journey Progress</span>
                  <span className="text-sm font-black text-purple-600">4/4 Skills Mastered! 🔥</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-yellow-400 rounded-full" />
                </div>
                <div className="flex gap-2 mt-4">
                  {SKILLS.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="flex-1 text-center">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${skill.color} mx-auto flex items-center justify-center text-sm`}>{skill.icon}</div>
                      <div className="text-[9px] font-black text-gray-500 mt-1">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(1)}
                className="w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-purple-200 hover:shadow-xl flex items-center justify-center gap-3">
                Begin Final Challenge! <FaChevronRight />
              </motion.button>
            </motion.div>
          )}

          {/* RECAP */}
          {step === 1 && (
            <motion.div key="recap" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500 text-xl"><FaLightbulb /></div>
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Your Python Arsenal 🛡️</h2>
                  <p className="text-gray-400 text-sm font-semibold">All skills combined</p></div>
              </div>

              <div className="space-y-3 mb-6">
                {SKILLS.map((skill, i) => (
                  <motion.div key={skill.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border ${skill.mastered ? "bg-white border-gray-100 shadow-sm" : "bg-gray-50 border-dashed border-gray-200 opacity-60"}`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-xl shrink-0 shadow-sm`}>{skill.icon}</div>
                    <div className="flex-1">
                      <div className="font-black text-gray-800">{skill.name}</div>
                      <div className="text-gray-400 text-xs font-semibold">{skill.desc}</div>
                    </div>
                    {skill.mastered
                      ? <span className="text-green-500 font-black text-xs flex items-center gap-1"><FaCheckCircle />Mastered</span>
                      : <span className="text-gray-400 font-black text-xs flex items-center gap-1"><FaLock />Upcoming</span>}
                  </motion.div>
                ))}
              </div>

              {/* Combined program */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="bg-[#0f172a] rounded-2xl p-5 mb-6 border border-purple-900">
                <div className="text-purple-300 text-xs font-sans font-bold mb-3 uppercase tracking-wider">🐍 All Skills Combined:</div>
                <div className="font-mono text-sm leading-loose">
                  <div className="text-gray-500"># input + variable + math + print</div>
                  <div><span className="text-purple-400">name</span> = <span className="text-green-400">input</span>(<span className="text-yellow-300">"Your name: "</span>)</div>
                  <div><span className="text-purple-400">age</span> = <span className="text-blue-300">int</span>(<span className="text-green-400">input</span>(<span className="text-yellow-300">"Your age: "</span>))</div>
                  <div><span className="text-purple-400">future_age</span> = <span className="text-purple-400">age</span> + 5</div>
                  <div><span className="text-green-400">print</span>(<span className="text-yellow-300">"Hi"</span>, <span className="text-purple-400">name</span>, <span className="text-yellow-300">"! In 5 years:"</span>, <span className="text-purple-400">future_age</span>)</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 mt-3 font-mono text-sm">
                  <span className="text-gray-400 text-xs font-sans">▶ OUTPUT: </span><span className="text-green-400">Hi Alex! In 5 years: 15</span>
                </div>
              </motion.div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl">← Back</button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(2)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg flex items-center justify-center gap-2">
                  Boss Challenges! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* BOSS CHALLENGES */}
          {step === 2 && (
            <motion.div key="boss" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 text-xl"><FaRocket /></div>
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Boss Challenges! 🚀</h2>
                  <p className="text-gray-400 text-sm font-semibold">3 epic coding missions</p></div>
              </div>

              {/* Challenge selector */}
              <div className="flex gap-2 mb-5">
                {BOSS_CHALLENGES.map((ch, i) => (
                  <button key={i} onClick={() => { setSelectedChallenge(i); setShowCode(false); }}
                    className={`flex-1 py-2.5 rounded-xl font-black text-xs transition-all border-2 ${selectedChallenge === i ? "bg-purple-600 text-white border-purple-600 shadow-lg" : "bg-white text-gray-500 border-gray-200 hover:border-purple-300"}`}>
                    Mission {i + 1}
                  </button>
                ))}
              </div>

              <motion.div key={selectedChallenge} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm mb-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg mb-1">Mission {selectedChallenge + 1}</h3>
                    <p className="text-purple-600 font-bold text-sm">{BOSS_CHALLENGES[selectedChallenge].label}</p>
                  </div>
                  <span className="text-[10px] font-black text-purple-400 bg-purple-50 border border-purple-100 rounded-lg px-2 py-1 uppercase tracking-wider">
                    {BOSS_CHALLENGES[selectedChallenge].hint}
                  </span>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowCode(!showCode)}
                  className={`w-full py-3 rounded-xl font-black text-sm mb-0 transition-all flex items-center justify-center gap-2 ${showCode ? "bg-purple-700 text-white" : "bg-purple-100 text-purple-700 hover:bg-purple-200"}`}>
                  {showCode ? <><FaUnlock /> Hide Solution</> : <><FaLock /> Reveal Solution</>}
                </motion.button>

                <AnimatePresence>
                  {showCode && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="mt-4 bg-[#0f172a] rounded-xl p-4 font-mono text-sm leading-loose">
                        {BOSS_CHALLENGES[selectedChallenge].code.split("\n").map((line, i) => (
                          <div key={i} className={line.startsWith("for") || line.startsWith("if") ? "text-purple-400" : line.startsWith("    ") ? "text-blue-300 pl-4" : "text-green-400"}>{line}</div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* XP badges */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {BOSS_CHALLENGES.map((_, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05 }}
                    className={`rounded-2xl p-3 text-center border ${i <= selectedChallenge ? "bg-purple-50 border-purple-200" : "bg-gray-50 border-gray-100"}`}>
                    <div className="text-xl mb-1">{i <= selectedChallenge ? "✅" : "⬜"}</div>
                    <div className={`text-[10px] font-black ${i <= selectedChallenge ? "text-purple-600" : "text-gray-400"}`}>Mission {i + 1}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl">← Back</button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(3)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg flex items-center justify-center gap-2">
                  Final Quiz! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {step === 3 && (
            <motion.div key="quiz" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center text-xl">👑</div>
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Master Quiz!</h2>
                  <p className="text-gray-400 text-sm font-semibold">Final test of your Python powers</p></div>
                <div className="ml-auto text-sm font-black text-gray-500">{quizScore}/{QUIZ.length} ⭐</div>
              </div>
              {!quizDone ? (
                <motion.div key={quizIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-black text-gray-400">Q {quizIdx + 1}/{QUIZ.length}</span>
                    <div className="flex gap-1">{QUIZ.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i < quizIdx ? "bg-purple-500" : i === quizIdx ? "bg-yellow-400" : "bg-gray-200"}`} />)}</div>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-5 whitespace-pre-line font-mono text-sm">{QUIZ[quizIdx].q}</h3>
                  <div className="space-y-3">
                    {QUIZ[quizIdx].options.map((opt, i) => {
                      const isCorrect = i === QUIZ[quizIdx].answer;
                      const isSelected = i === quizSelected;
                      return (
                        <motion.button key={i} whileHover={quizSelected === null ? { scale: 1.02 } : {}} onClick={() => handleQuizAnswer(i)}
                          className={`w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${quizSelected !== null ? isCorrect ? "bg-green-50 border-green-400 text-green-700" : isSelected ? "bg-red-50 border-red-400 text-red-700" : "bg-gray-50 border-gray-100 text-gray-400" : "bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"}`}>
                          {["A", "B", "C", "D"][i]}. {opt} {quizSelected !== null && isCorrect && <FaCheckCircle className="inline-block ml-2 text-green-500" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <motion.div animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.3, 1] }} transition={{ repeat: 3, duration: 0.6 }} className="text-6xl mb-4">
                    {quizScore === QUIZ.length ? "👑" : "⭐"}
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: FONT }}>{quizScore === QUIZ.length ? "Python Master!" : "Almost There!"}</h3>
                  <p className="text-gray-500 font-semibold mb-6"><strong className="text-purple-600">{quizScore}/{QUIZ.length}</strong> correct!</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setQuizIdx(0); setQuizScore(0); setQuizSelected(null); setQuizDone(false); }} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl text-sm">Retry</button>
                    <motion.button whileHover={{ scale: 1.03 }} onClick={() => setStep(4)} className="px-8 py-3 font-black text-white rounded-2xl bg-gradient-to-r from-purple-600 to-yellow-500 shadow-lg text-sm">🎉 Claim the Crown!</motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* FINAL COMPLETE */}
          {step === 4 && (
            <motion.div key="complete" {...fadeUp} className="text-center">
              {/* Animated background stars */}
              {[...Array(6)].map((_, i) => (
                <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.3 }}
                  className="absolute text-yellow-400 text-2xl pointer-events-none"
                  style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 15}px` }}>⭐</motion.div>
              ))}

              <motion.div animate={{ rotate: [0, -15, 15, -5, 5, 0], scale: [1, 1.3, 1] }} transition={{ repeat: 3, duration: 0.8 }}
                className="text-9xl mb-4 mx-auto w-fit">👑</motion.div>

              <h1 className="text-5xl font-black text-gray-900 mb-3" style={{ fontFamily: FONT }}>PYTHON MASTER!</h1>
              <p className="text-gray-500 text-lg mb-2">You completed <strong className="text-purple-600">ALL 5 LEVELS!</strong></p>
              <p className="text-gray-400 text-base mb-8 max-w-md mx-auto">You are now an official Python Beginner Coder! Keep learning and you'll build anything! 🚀</p>

              {/* All skills unlocked */}
              <div className="flex justify-center gap-2 mb-8">
                {SKILLS.map((skill) => (
                  <motion.div key={skill.id} whileHover={{ scale: 1.1, y: -5 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: skill.id * 0.1 }}
                    className="text-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${skill.color} mx-auto flex items-center justify-center text-lg shadow-lg border-2 border-white`}>{skill.icon}</div>
                    <div className="text-[8px] font-black text-gray-500 mt-1">{skill.name}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-center"><FaGem className="text-blue-500 text-2xl mx-auto mb-1" /><div className="font-black text-blue-700">+50 Gems</div></div>
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 text-center"><FaFire className="text-orange-500 text-2xl mx-auto mb-1" /><div className="font-black text-orange-700">+100 XP</div></div>
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 text-center"><FaTrophy className="text-yellow-500 text-2xl mx-auto mb-1" /><div className="font-black text-yellow-700 text-sm">Function Wizard Badge!</div></div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-yellow-50 rounded-2xl p-5 border border-purple-100 mb-8 text-left">
                <h3 className="font-black text-purple-800 mb-3">🎓 Complete Python Toolkit:</h3>
                <ul className="space-y-2">
                  {["print() — Display text and data on screen", "Variables — Store any kind of data", "Math operators — +, -, *, /, **, %", "input() — Make interactive programs", "Combine them all to build real apps!"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-semibold text-purple-700"><FaCheckCircle className="text-purple-500 shrink-0" /> {item}</li>
                  ))}
                </ul>
              </div>

              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} onClick={handleComplete} disabled={loading || completed}
                className={`w-full py-5 text-xl font-black text-white rounded-2xl shadow-xl transition-all ${completed ? "bg-purple-400 cursor-default" : "bg-gradient-to-r from-purple-600 via-purple-700 to-yellow-500 hover:shadow-purple-200 hover:shadow-2xl"} disabled:opacity-75`}>
                {completed ? "✨ Master Unlocked! Redirecting..." : loading ? "Saving Your Crown..." : "👑 Claim Your Crown! ✨"}
              </motion.button>
              <button onClick={() => navigate("/dashboard")} className="mt-4 text-gray-400 font-bold text-sm hover:text-purple-500 transition-colors">← Back to Dashboard</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
