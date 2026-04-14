import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaCommentDots, FaChevronRight, FaLightbulb, FaGamepad,
  FaCheckCircle, FaStar, FaArrowLeft, FaGem, FaFire,
  FaPlay, FaTrophy, FaGraduationCap, FaBrain, FaCode,
  FaRocket, FaMicrophone, FaPen, FaEye, FaTimesCircle, FaGift,
} from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

const QUIZ = [
  {
    q: "What does print() do in Python?",
    options: ["Prints on paper", "Shows text on screen", "Deletes your code", "Opens a window"],
    answer: 1,
  },
  {
    q: 'What will print("Hello") show?',
    options: ["Hello", '"Hello"', "print", "Nothing"],
    answer: 0,
  },
  {
    q: "Which is the correct Python syntax?",
    options: ['say("Hi")', 'print["Hi"]', 'print("Hi")', 'show("Hi")'],
    answer: 2,
  },
];

const FONT = "'KG Primary Penmanship', 'Caveat', cursive";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
};

const FUN_FACTS = [
  { icon: <FaCode className="text-green-500 text-2xl mx-auto mb-2" />, text: "Python is a real programming language!" },
  { icon: <FaCommentDots className="text-blue-500 text-2xl mx-auto mb-2" />, text: "print() is used by millions of coders" },
  { icon: <FaRocket className="text-purple-500 text-2xl mx-auto mb-2" />, text: "Used in AI, Games & Space Rockets!" },
];

const LEARN_CARDS = [
  {
    title: "What is print()?",
    color: "bg-green-50 border-green-200",
    icon: <FaLightbulb className="text-green-500 text-xl" />,
    content: "print() tells Python to show text. Whatever you put inside the parentheses () appears on the screen!",
  },
  {
    title: "The Magic Quotes",
    color: "bg-blue-50 border-blue-200",
    icon: <FaPen className="text-blue-500 text-xl" />,
    content: 'Text must go inside quotes! You can use "double quotes" or \'single quotes\' — Python accepts both!',
  },
  {
    title: "Watch It Work",
    color: "bg-yellow-50 border-yellow-200",
    icon: <FaEye className="text-yellow-500 text-xl" />,
    content: null,
    code: true,
  },
];

export default function Level1() {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const handleRunCode = () => {
    const match = typedCode.match(/print\(["'`](.+?)["'`]\)/);
    if (match) {
      setCodeOutput(match[1]);
      toast("Your code ran! Great job!", "success");
    } else if (typedCode.includes("print(")) {
      setCodeOutput("Close! Check your quotes around the text.");
    } else {
      setCodeOutput('Try typing: print("Hello, World!")');
    }
  };

  const handleQuizAnswer = (idx) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    if (QUIZ[quizIdx].answer === idx) {
      setQuizScore((s) => s + 1);
      toast("Correct! Nicely done!", "success");
    } else {
      toast("Not quite! Check the right answer.", "error");
    }
    setTimeout(() => {
      if (quizIdx + 1 < QUIZ.length) { setQuizIdx((i) => i + 1); setQuizSelected(null); }
      else setQuizDone(true);
    }, 1000);
  };

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors: ["#a0cc5b", "#ffffff", "#ffd700", "#84cc16"] });
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ completedLevel: 1 }),
        });
        const data = await res.json();
        if (data.badgeEarned) {
          toast(`Badge Unlocked: ${data.badgeEarned.name}!`, "success");
          window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 1 }, "*");
        } else {
          toast("Level 1 already completed! Keep going!", "info");
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

  const steps = ["Intro", "Learn", "Try It", "Quiz", "Complete"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fde4] via-[#f9faec] to-[#e8f5d0] font-sans overflow-x-hidden">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-green-500 transition-colors">
          <FaArrowLeft /> Dashboard
        </button>
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${i < step ? "bg-green-400 text-white" : i === step ? "bg-green-500 text-white shadow-md scale-110" : "bg-gray-100 text-gray-400"}`}>
                {i < step ? <FaCheckCircle className="text-[10px]" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-5 h-0.5 rounded-full transition-all duration-500 ${i < step ? "bg-green-400" : "bg-gray-200"}`} />}
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

          {/* STEP 0: INTRO */}
          {step === 0 && (
            <motion.div key="intro" {...fadeUp} className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-8 py-2 rounded-full font-black text-sm mb-6 shadow-lg shadow-green-200">
                <FaStar /> LEVEL 1 — SAY HELLO
              </motion.div>

              <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
                className="text-8xl mb-6 text-green-500 mx-auto w-fit">
                <FaCommentDots />
              </motion.div>

              <h1 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3" style={{ fontFamily: FONT }}>
                The Power of Words! <FaMicrophone className="text-green-500" />
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                In Python, <strong className="text-green-600">print()</strong> is your computer's voice! It can say <em>anything</em> you put inside the quotes. Ready to make your computer talk?
              </p>

              {/* Fun facts */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {FUN_FACTS.map((fact, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                    {fact.icon}
                    <p className="text-xs font-bold text-gray-500">{fact.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                onClick={() => setStep(1)}
                className="w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg bg-gradient-to-r from-green-400 to-green-500 hover:shadow-green-200 hover:shadow-xl flex items-center justify-center gap-3">
                Start Learning! <FaChevronRight />
              </motion.button>
            </motion.div>
          )}

          {/* STEP 1: LEARN */}
          {step === 1 && (
            <motion.div key="learn" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-500 text-xl"><FaLightbulb /></div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Learn: The print() Command</h2>
                  <p className="text-gray-400 text-sm font-semibold">Understand how it works</p>
                </div>
              </div>

              {LEARN_CARDS.map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                  className={`${card.color} rounded-2xl p-5 border mb-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    {card.icon}
                    <h3 className="font-black text-gray-800">{card.title}</h3>
                  </div>
                  {card.content && <p className="text-gray-600 text-sm font-semibold leading-relaxed">{card.content}</p>}
                  {card.code && (
                    <div className="space-y-3">
                      <div className="bg-[#0f172a] rounded-xl p-4 font-mono text-sm leading-loose border border-green-900">
                        <div><span className="text-green-400">print</span><span className="text-white">(</span><span className="text-yellow-300">"Hello, World!"</span><span className="text-white">)</span></div>
                        <div><span className="text-green-400">print</span><span className="text-white">(</span><span className="text-yellow-300">"I am a Python coder!"</span><span className="text-white">)</span></div>
                        <div><span className="text-green-400">print</span><span className="text-white">(</span><span className="text-yellow-300">"123 + 456"</span><span className="text-white">)</span></div>
                      </div>
                      <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm border border-gray-700">
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-2 font-sans font-bold">
                          <FaPlay className="text-[8px]" /> OUTPUT:
                        </div>
                        <div className="text-green-400">Hello, World!</div>
                        <div className="text-green-400">I am a Python coder!</div>
                        <div className="text-green-400">123 + 456</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Did You Know */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 mb-6 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <FaGraduationCap className="text-purple-500 text-lg" />
                </div>
                <div>
                  <p className="font-black text-purple-800 text-sm">Did You Know?</p>
                  <p className="text-purple-600 text-sm font-semibold">Python's print() function can print numbers, text, and symbols! Try different things in Step 3.</p>
                </div>
              </motion.div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-colors flex items-center gap-1">
                  <FaArrowLeft className="text-xs" /> Back
                </button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(2)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-green-400 to-green-500 shadow-lg flex items-center justify-center gap-2">
                  Try It Yourself! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: TRY IT */}
          {step === 2 && (
            <motion.div key="tryit" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 text-xl"><FaGamepad /></div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl flex items-center gap-2" style={{ fontFamily: FONT }}>
                    Try It! <FaGamepad className="text-blue-400" />
                  </h2>
                  <p className="text-gray-400 text-sm font-semibold">Type your own print() command</p>
                </div>
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                <div className="bg-[#1e293b] px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-gray-400 text-xs font-mono ml-2">main.py</span>
                </div>
                <textarea
                  value={typedCode}
                  onChange={(e) => setTypedCode(e.target.value)}
                  placeholder={'Type here... e.g.  print("Hello, World!")'}
                  className="w-full bg-[#0f172a] text-green-400 font-mono text-base px-5 py-4 h-36 resize-none focus:outline-none placeholder-gray-600"
                  spellCheck={false}
                />
              </motion.div>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleRunCode}
                className="w-full py-3 mb-4 font-black text-white rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg flex items-center justify-center gap-2 text-lg">
                <FaPlay /> Run My Code!
              </motion.button>

              <AnimatePresence>
                {codeOutput && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }}
                    className="bg-gray-900 rounded-2xl p-5 mb-6 border border-gray-700">
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-sans font-bold mb-2">
                      <FaPlay className="text-[8px]" /> OUTPUT:
                    </div>
                    <div className="text-green-400 font-mono text-base">{codeOutput}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Challenges */}
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mb-6">
                <h3 className="font-black text-amber-800 mb-3 flex items-center gap-2">
                  <FaStar className="text-amber-500" /> Mini Challenges
                </h3>
                <div className="space-y-2">
                  {['print("Hello, my name is ___!")', 'print("I am learning Python!")', 'print("Coding is super fun!")'].map((c, i) => (
                    <button key={i} onClick={() => setTypedCode(c)}
                      className="w-full text-left px-4 py-2.5 bg-white rounded-xl text-sm font-mono text-gray-600 hover:bg-amber-100 hover:text-amber-800 transition-colors border border-amber-100 font-semibold">
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-colors flex items-center gap-1">
                  <FaArrowLeft className="text-xs" /> Back
                </button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(3)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-green-400 to-green-500 shadow-lg flex items-center justify-center gap-2">
                  Take the Quiz! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: QUIZ */}
          {step === 3 && (
            <motion.div key="quiz" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-500 text-xl">
                  <FaBrain />
                </div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Quick Quiz!</h2>
                  <p className="text-gray-400 text-sm font-semibold">Test what you've learned</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-sm font-black text-gray-500">
                  {quizScore}/{QUIZ.length} <FaStar className="text-yellow-400" />
                </div>
              </div>

              {!quizDone ? (
                <motion.div key={quizIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Question {quizIdx + 1} of {QUIZ.length}</span>
                    <div className="flex gap-1">
                      {QUIZ.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < quizIdx ? "bg-green-400" : i === quizIdx ? "bg-yellow-400" : "bg-gray-200"}`} />
                      ))}
                    </div>
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
                            quizSelected !== null
                              ? isCorrect ? "bg-green-50 border-green-400 text-green-700"
                              : isSelected ? "bg-red-50 border-red-400 text-red-700"
                              : "bg-gray-50 border-gray-100 text-gray-400"
                              : "bg-white border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50"
                          }`}>
                          <span className="mr-2">{["A", "B", "C", "D"][i]}.</span> {opt}
                          {quizSelected !== null && isCorrect && <FaCheckCircle className="inline-block ml-2 text-green-500" />}
                          {quizSelected !== null && isSelected && !isCorrect && <FaTimesCircle className="inline-block ml-2 text-red-400" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <div className="flex justify-center mb-4">
                    {quizScore === QUIZ.length
                      ? <FaTrophy className="text-yellow-500 text-6xl" />
                      : quizScore >= 2 ? <FaStar className="text-yellow-400 text-6xl" />
                      : <FaGem className="text-blue-400 text-6xl" />}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: FONT }}>
                    {quizScore === QUIZ.length ? "Perfect Score!" : quizScore >= 2 ? "Great Job!" : "Keep Practicing!"}
                  </h3>
                  <p className="text-gray-500 font-semibold mb-6">You got <strong className="text-green-600">{quizScore} out of {QUIZ.length}</strong> correct!</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setQuizIdx(0); setQuizScore(0); setQuizSelected(null); setQuizDone(false); }}
                      className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-colors text-sm">
                      Retry Quiz
                    </button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(4)}
                      className="px-8 py-3 font-black text-white rounded-2xl bg-gradient-to-r from-green-400 to-green-500 shadow-lg text-sm flex items-center gap-2">
                      Finish Level! <FaGift />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 4: COMPLETE */}
          {step === 4 && (
            <motion.div key="complete" {...fadeUp} className="text-center">
              <motion.div animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                className="text-8xl mb-6 mx-auto w-fit text-yellow-500">
                <FaTrophy />
              </motion.div>
              <h1 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: FONT }}>Level 1 Complete!</h1>
              <p className="text-gray-500 text-lg mb-6 flex items-center justify-center gap-2">
                You mastered <strong className="text-green-600">print()</strong>! Your computer can now speak!
                <FaCommentDots className="text-green-500" />
              </p>

              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-center">
                  <FaGem className="text-blue-500 text-2xl mx-auto mb-1" />
                  <div className="font-black text-blue-700">+50 Gems</div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 text-center">
                  <FaFire className="text-orange-500 text-2xl mx-auto mb-1" />
                  <div className="font-black text-orange-700">+100 XP</div>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 text-center">
                  <FaStar className="text-yellow-500 text-2xl mx-auto mb-1" />
                  <div className="font-black text-yellow-700 text-sm">Quiz: {quizScore}/{QUIZ.length}</div>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 border border-green-200 mb-8 text-left">
                <h3 className="font-black text-green-800 mb-3 flex items-center gap-2">
                  <FaGraduationCap className="text-green-600" /> What You Learned:
                </h3>
                <ul className="space-y-2">
                  {['print() shows text on screen', 'Text goes inside quotes ("like this")', "You can print words, numbers and sentences!"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-semibold text-green-700">
                      <FaCheckCircle className="text-green-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                onClick={handleComplete} disabled={loading || completed}
                className={`w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg transition-all ${
                  completed ? "bg-green-400 cursor-default" : "bg-gradient-to-r from-green-400 to-green-500 hover:shadow-green-200 hover:shadow-xl"
                } disabled:opacity-75 flex items-center justify-center gap-3`}>
                {completed
                  ? <><FaCheckCircle /> Completed! Redirecting...</>
                  : loading ? "Saving..."
                  : <><FaGem /> Claim Your Gems!</>}
              </motion.button>
              <button onClick={() => navigate("/dashboard")} className="mt-4 text-gray-400 font-bold text-sm hover:text-green-500 transition-colors flex items-center gap-1 mx-auto">
                <FaArrowLeft className="text-xs" /> Back to Dashboard
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
