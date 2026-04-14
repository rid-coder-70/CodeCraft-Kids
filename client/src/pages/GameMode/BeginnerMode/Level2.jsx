import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaBoxOpen, FaChevronRight, FaLightbulb, FaGamepad,
  FaCheckCircle, FaStar, FaArrowLeft, FaGem, FaFire,
  FaTrophy, FaGraduationCap, FaBrain, FaSearch, FaTag,
  FaTimesCircle, FaGift, FaHandPointUp, FaClipboardList,
} from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

const QUIZ = [
  { q: "What is a variable in Python?", options: ["A type of number", "A labeled box that stores data", "A Python command", "A math symbol"], answer: 1 },
  { q: 'What does this do?  name = "Alex"', options: ["Prints Alex", "Stores Alex in a variable called name", "Deletes name", "Creates a number"], answer: 1 },
  { q: "Which line correctly creates a variable?", options: ['variable name = "hi"', 'name == "hi"', 'name = "hi"', '"name" = hi'], answer: 2 },
];

const FONT = "'KG Primary Penmanship', 'Caveat', cursive";
const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } };

const BOXES = [
  { name: "name", value: '"Alex"', color: "from-pink-400 to-pink-500", bg: "bg-pink-50", border: "border-pink-200" },
  { name: "age", value: "10", color: "from-blue-400 to-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { name: "score", value: "250", color: "from-green-400 to-green-500", bg: "bg-green-50", border: "border-green-200" },
];

const LEARN_CARDS = [
  {
    title: "Creating a Variable",
    icon: <FaBoxOpen className="text-pink-500 text-xl" />,
    color: "bg-pink-50 border-pink-200",
    code: true,
  },
  {
    title: "Using a Variable",
    icon: <FaSearch className="text-purple-500 text-xl" />,
    color: "bg-purple-50 border-purple-200",
    code2: true,
  },
  {
    title: "Variable Name Rules",
    icon: <FaClipboardList className="text-amber-500 text-xl" />,
    color: "bg-amber-50 border-amber-200",
    rules: true,
  },
];

export default function Level2() {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [varName, setVarName] = useState("");
  const [varValue, setVarValue] = useState("");
  const [varResult, setVarResult] = useState(null);
  const [openBox, setOpenBox] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const handleRunVar = () => {
    if (!varName.trim() || !varValue.trim()) { toast("Fill in both fields!", "info"); return; }
    if (/\s/.test(varName)) { toast("Variable names can't have spaces! Try snake_case", "error"); return; }
    if (/^\d/.test(varName)) { toast("Variable names can't start with a number!", "error"); return; }
    setVarResult({ name: varName.trim(), value: varValue.trim() });
    toast("Variable created! Python is remembering it!", "success");
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
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors: ["#ec4899", "#ffffff", "#ffd700", "#f9a8d4"] });
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ completedLevel: 2 }),
        });
        const data = await res.json();
        if (data.badgeEarned) { toast(`Badge Unlocked: ${data.badgeEarned.name}!`, "success"); window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 2 }, "*"); }
        else toast("Level 2 already completed!", "info");
        setCompleted(true);
      } catch { toast("Could not save progress. Try again!", "error"); }
    } else { toast("Login to save your progress!", "info"); setCompleted(true); }
    setLoading(false);
    setTimeout(() => navigate("/dashboard"), 2500);
  };

  const steps = ["Intro", "Learn", "Try It", "Quiz", "Complete"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fce7f3] via-[#fdf2f8] to-[#fce7f3] font-sans overflow-x-hidden">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-pink-500 transition-colors">
          <FaArrowLeft /> Dashboard
        </button>
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${i < step ? "bg-pink-400 text-white" : i === step ? "bg-pink-500 text-white shadow-md scale-110" : "bg-gray-100 text-gray-400"}`}>
                {i < step ? <FaCheckCircle className="text-[10px]" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-5 h-0.5 rounded-full transition-all duration-500 ${i < step ? "bg-pink-400" : "bg-gray-200"}`} />}
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-8 py-2 rounded-full font-black text-sm mb-6 shadow-lg shadow-pink-200">
                <FaBoxOpen /> LEVEL 2 — MEMORY BOX
              </motion.div>
              <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
                className="text-8xl mb-6 text-pink-500 mx-auto w-fit"><FaBoxOpen /></motion.div>
              <h1 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3" style={{ fontFamily: FONT }}>
                The Variable Box! <FaBoxOpen className="text-pink-500" />
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                A <strong className="text-pink-600">variable</strong> is like a labeled box you can put things in. Python remembers what's inside and you can use it anytime!
              </p>

              {/* Animated boxes */}
              <div className="flex justify-center gap-4 mb-4">
                {BOXES.map((box, i) => (
                  <motion.div key={box.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}
                    whileHover={{ scale: 1.08, y: -5 }} onClick={() => setOpenBox(openBox === i ? null : i)}
                    className={`${box.bg} border-2 ${box.border} rounded-2xl p-4 cursor-pointer flex flex-col items-center gap-2 min-w-[90px] shadow-sm`}>
                    <motion.div animate={openBox === i ? { rotate: [-10, 10, 0] } : {}}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${box.color} flex items-center justify-center text-white text-xl shadow-md`}>
                      <FaBoxOpen />
                    </motion.div>
                    <span className="font-black text-gray-700 text-xs">{box.name}</span>
                    <AnimatePresence>
                      {openBox === i && (
                        <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
                          className="font-mono text-xs font-bold text-gray-600 bg-white rounded-lg px-2 py-1 shadow-sm border">
                          {box.value}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-400 text-xs font-semibold mb-6 flex items-center justify-center gap-1">
                <FaHandPointUp className="text-pink-300" /> Click a box to peek inside!
              </p>

              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(1)}
                className="w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg bg-gradient-to-r from-pink-400 to-pink-500 hover:shadow-pink-200 hover:shadow-xl flex items-center justify-center gap-3">
                Start Learning! <FaChevronRight />
              </motion.button>
            </motion.div>
          )}

          {/* LEARN */}
          {step === 1 && (
            <motion.div key="learn" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 text-xl"><FaLightbulb /></div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Learn: Variables</h2>
                  <p className="text-gray-400 text-sm font-semibold">Store and use data</p>
                </div>
              </div>

              {LEARN_CARDS.map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                  className={`${card.color} rounded-2xl p-5 border mb-4`}>
                  <div className="flex items-center gap-2 mb-3">
                    {card.icon}
                    <h3 className="font-black text-gray-800">{card.title}</h3>
                  </div>
                  {card.code && (
                    <div className="bg-[#0f172a] rounded-xl p-4 font-mono text-sm leading-loose">
                      <div><span className="text-pink-400">name</span> = <span className="text-yellow-300">"Alex"</span></div>
                      <div><span className="text-pink-400">age</span> = <span className="text-blue-300">10</span></div>
                      <div><span className="text-pink-400">favorite</span> = <span className="text-yellow-300">"Python"</span></div>
                    </div>
                  )}
                  {card.code2 && (
                    <div className="space-y-3">
                      <div className="bg-[#0f172a] rounded-xl p-4 font-mono text-sm leading-loose">
                        <div><span className="text-pink-400">box</span> = <span className="text-yellow-300">"Gold Gems"</span></div>
                        <div><span className="text-green-400">print</span>(<span className="text-pink-400">box</span>)</div>
                      </div>
                      <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm">
                        <div className="text-gray-400 text-xs font-sans mb-1">OUTPUT:</div>
                        <div className="text-green-400">Gold Gems</div>
                      </div>
                    </div>
                  )}
                  {card.rules && (
                    <div className="grid grid-cols-2 gap-2">
                      {[["my_name — OK", "Use underscores", true], ["score1 — OK", "Numbers ok (not first)", true], ["my name — Error", "No spaces allowed!", false], ["1score — Error", "Can't start with number", false]].map(([ex, rule, ok], j) => (
                        <div key={j} className={`rounded-xl p-2.5 text-xs font-bold ${ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                          <div className="flex items-center gap-1">
                            {ok ? <FaCheckCircle className="shrink-0" /> : <FaTimesCircle className="shrink-0" />} {ex}
                          </div>
                          <div className="text-[10px] font-sans font-semibold mt-0.5 opacity-70">{rule}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(0)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-colors flex items-center gap-1">
                  <FaArrowLeft className="text-xs" /> Back
                </button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(2)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg flex items-center justify-center gap-2">
                  Try It! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* TRY IT */}
          {step === 2 && (
            <motion.div key="tryit" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500 text-xl"><FaGamepad /></div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl flex items-center gap-2" style={{ fontFamily: FONT }}>
                    Build Your Own Variable! <FaGamepad className="text-purple-400" />
                  </h2>
                  <p className="text-gray-400 text-sm font-semibold">Create a variable and see Python remember it</p>
                </div>
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
                <h3 className="font-black text-gray-700 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <FaTag className="text-pink-400" /> Name Your Box
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1 block">Variable Name</label>
                    <input value={varName} onChange={(e) => setVarName(e.target.value)} placeholder="e.g. my_name, score, city"
                      className="w-full px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl font-mono text-sm focus:outline-none focus:border-pink-400 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1 block">Value to Store</label>
                    <input value={varValue} onChange={(e) => setVarValue(e.target.value)} placeholder='e.g. "Alex" or 10 or "Python"'
                      className="w-full px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl font-mono text-sm focus:outline-none focus:border-pink-400 transition-all" />
                  </div>
                </div>
                {(varName || varValue) && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-[#0f172a] rounded-xl p-4 font-mono text-sm">
                    <div><span className="text-pink-400">{varName || "name"}</span> = <span className="text-yellow-300">{varValue || "..."}</span></div>
                    <div><span className="text-green-400">print</span>(<span className="text-pink-400">{varName || "name"}</span>)</div>
                  </motion.div>
                )}
              </motion.div>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleRunVar}
                className="w-full py-3 mb-4 font-black text-white rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg flex items-center justify-center gap-2 text-lg">
                <FaBoxOpen /> Store in Python's Memory!
              </motion.button>

              <AnimatePresence>
                {varResult && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="bg-pink-50 rounded-2xl p-5 border-2 border-pink-300 mb-4">
                    <div className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">OUTPUT:</div>
                    <div className="font-mono text-pink-700 font-bold text-lg">{varResult.value.replace(/^["']|["']$/g, "")}</div>
                    <div className="text-gray-400 text-xs mt-2 font-semibold flex items-center gap-1">
                      <FaCheckCircle className="text-pink-400" />
                      Python stored <strong className="text-pink-600">{varResult.value}</strong> in the box called <strong className="text-pink-600">{varResult.name}</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mb-6">
                <h3 className="font-black text-amber-800 mb-3 flex items-center gap-2">
                  <FaStar className="text-amber-500" /> Challenge Presets
                </h3>
                <div className="space-y-2">
                  {[["favorite_food", '"Pizza"'], ["my_age", "10"], ["city", '"Dhaka"']].map(([n, v], i) => (
                    <button key={i} onClick={() => { setVarName(n); setVarValue(v); setVarResult(null); }}
                      className="w-full text-left px-4 py-2 bg-white rounded-xl text-sm font-mono text-gray-600 hover:bg-amber-100 transition-colors border border-amber-100">
                      <span className="text-pink-500">{n}</span> = <span className="text-yellow-600">{v}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-colors flex items-center gap-1">
                  <FaArrowLeft className="text-xs" /> Back
                </button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(3)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg flex items-center justify-center gap-2">
                  Take the Quiz! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {step === 3 && (
            <motion.div key="quiz" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-500 text-xl"><FaBrain /></div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Quick Quiz!</h2>
                  <p className="text-gray-400 text-sm font-semibold">Test your variable knowledge</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-sm font-black text-gray-500">
                  {quizScore}/{QUIZ.length} <FaStar className="text-yellow-400" />
                </div>
              </div>
              {!quizDone ? (
                <motion.div key={quizIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Q {quizIdx + 1}/{QUIZ.length}</span>
                    <div className="flex gap-1">{QUIZ.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i < quizIdx ? "bg-pink-400" : i === quizIdx ? "bg-yellow-400" : "bg-gray-200"}`} />)}</div>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-5">{QUIZ[quizIdx].q}</h3>
                  <div className="space-y-3">
                    {QUIZ[quizIdx].options.map((opt, i) => {
                      const isCorrect = i === QUIZ[quizIdx].answer;
                      const isSelected = i === quizSelected;
                      return (
                        <motion.button key={i} whileHover={quizSelected === null ? { scale: 1.02 } : {}} whileTap={quizSelected === null ? { scale: 0.98 } : {}}
                          onClick={() => handleQuizAnswer(i)}
                          className={`w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm transition-all border-2 ${
                            quizSelected !== null ? isCorrect ? "bg-green-50 border-green-400 text-green-700" : isSelected ? "bg-red-50 border-red-400 text-red-700" : "bg-gray-50 border-gray-100 text-gray-400"
                              : "bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50"}`}>
                          <span className="mr-2">{["A", "B", "C", "D"][i]}.</span> {opt}
                          {quizSelected !== null && isCorrect && <FaCheckCircle className="inline-block ml-2 text-green-500" />}
                          {quizSelected !== null && isSelected && !isCorrect && <FaTimesCircle className="inline-block ml-2 text-red-400" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <div className="flex justify-center mb-4">
                    {quizScore === QUIZ.length ? <FaTrophy className="text-yellow-500 text-6xl" /> : quizScore >= 2 ? <FaStar className="text-yellow-400 text-6xl" /> : <FaGem className="text-blue-400 text-6xl" />}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: FONT }}>{quizScore === QUIZ.length ? "Perfect Score!" : "Good Effort!"}</h3>
                  <p className="text-gray-500 font-semibold mb-6">You got <strong className="text-pink-600">{quizScore}/{QUIZ.length}</strong> correct!</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setQuizIdx(0); setQuizScore(0); setQuizSelected(null); setQuizDone(false); }} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl text-sm">Retry</button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(4)} className="px-8 py-3 font-black text-white rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg text-sm flex items-center gap-2">
                      Finish Level! <FaGift />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* COMPLETE */}
          {step === 4 && (
            <motion.div key="complete" {...fadeUp} className="text-center">
              <motion.div animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-8xl mb-6 mx-auto w-fit text-pink-500">
                <FaGift />
              </motion.div>
              <h1 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: FONT }}>Level 2 Complete!</h1>
              <p className="text-gray-500 text-lg mb-6 flex items-center justify-center gap-2">
                You mastered <strong className="text-pink-600">variables</strong>! Python is remembering everything for you! <FaBrain className="text-pink-400" />
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-center"><FaGem className="text-blue-500 text-2xl mx-auto mb-1" /><div className="font-black text-blue-700">+50 Gems</div></div>
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 text-center"><FaFire className="text-orange-500 text-2xl mx-auto mb-1" /><div className="font-black text-orange-700">+100 XP</div></div>
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 text-center"><FaStar className="text-yellow-500 text-2xl mx-auto mb-1" /><div className="font-black text-yellow-700 text-sm">Quiz: {quizScore}/{QUIZ.length}</div></div>
              </div>
              <div className="bg-pink-50 rounded-2xl p-5 border border-pink-200 mb-8 text-left">
                <h3 className="font-black text-pink-800 mb-3 flex items-center gap-2"><FaGraduationCap className="text-pink-600" /> What You Learned:</h3>
                <ul className="space-y-2">
                  {["Variables store data like labeled boxes", 'Use = to assign values (name = "Alex")', "Variable names can't have spaces or start with numbers"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-semibold text-pink-700"><FaCheckCircle className="text-pink-500 shrink-0" /> {item}</li>
                  ))}
                </ul>
              </div>
              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} onClick={handleComplete} disabled={loading || completed}
                className={`w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg transition-all ${completed ? "bg-pink-400 cursor-default" : "bg-gradient-to-r from-pink-400 to-pink-500 hover:shadow-pink-200 hover:shadow-xl"} disabled:opacity-75 flex items-center justify-center gap-3`}>
                {completed ? <><FaCheckCircle /> Completed! Redirecting...</> : loading ? "Saving..." : <><FaGem /> Pack Your Gems!</>}
              </motion.button>
              <button onClick={() => navigate("/dashboard")} className="mt-4 text-gray-400 font-bold text-sm hover:text-pink-500 transition-colors flex items-center gap-1 mx-auto">
                <FaArrowLeft className="text-xs" /> Back to Dashboard
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
