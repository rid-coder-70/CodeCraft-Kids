import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaQuestionCircle, FaChevronRight, FaLightbulb, FaGamepad, FaCheckCircle, FaStar, FaArrowLeft, FaGem, FaFire, FaUser, FaRobot } from "react-icons/fa";
import { API_BASE } from "../../../config";
import { useToast } from "../../../components/Toast";

const QUIZ = [
  { q: "What does input() do in Python?", options: ["Prints text on screen", "Waits for the user to type something", "Does math", "Opens a file"], answer: 1 },
  { q: 'What type is the result of input()?', options: ["Number (int)", "True/False", "Text (string)", "Nothing"], answer: 2 },
  { q: 'name = input("Hi! ") — what does "Hi! " do?', options: ["It is the variable name", "It stores Hi! in name", "It shows as a prompt to the user", "Nothing"], answer: 2 },
];

const FONT = "'KG Primary Penmanship', 'Caveat', cursive";
const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } };

const CONVERSATIONS = [
  { who: "robot", text: 'What is your name?  →  input("What is your name? ")' },
  { who: "user", text: "Alex" },
  { who: "robot", text: 'Hello, Alex! Nice to meet you!' },
];

export default function Level4() {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { who: "robot", text: "Hi! What is your name?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatStage, setChatStage] = useState(0); // 0=ask name, 1=ask age, 2=done
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { who: "user", text: chatInput.trim() };
    setChatMessages((prev) => [...prev, userMsg]);

    if (chatStage === 0) {
      setUserName(chatInput.trim());
      setTimeout(() => {
        setChatMessages((prev) => [...prev, { who: "robot", text: `Nice to meet you, ${chatInput.trim()}! 🎉 How old are you?` }]);
        setChatStage(1);
      }, 600);
    } else if (chatStage === 1) {
      setUserAge(chatInput.trim());
      const age = parseInt(chatInput.trim());
      setTimeout(() => {
        setChatMessages((prev) => [...prev, {
          who: "robot",
          text: isNaN(age)
            ? `${chatInput.trim()}? That's not a number! But Python would store it anyway as text! 😄`
            : `Wow! In 5 years you'll be ${age + 5}! Python did that math for you! 🧮✨`
        }]);
        setChatStage(2);
      }, 600);
    } else {
      setTimeout(() => {
        setChatMessages((prev) => [...prev, { who: "robot", text: `I only know your name and age for now! Python's input() can only read what you tell it. 🤖` }]);
      }, 600);
    }
    setChatInput("");
    toast("Python received your input!", "success");
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
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors: ["#f59e0b", "#ffffff", "#ffd700"] });
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ completedLevel: 4 }),
        });
        const data = await res.json();
        if (data.badgeEarned) { toast(`🏆 Badge: ${data.badgeEarned.name}!`, "success"); window.parent?.postMessage({ type: "LEVEL_COMPLETE", level: 4 }, "*"); }
        else toast("✨ Level 4 already done!", "info");
        setCompleted(true);
      } catch { toast("Could not save progress!", "error"); }
    } else { toast("Login to save!", "info"); setCompleted(true); }
    setLoading(false);
    setTimeout(() => navigate("/dashboard"), 2500);
  };

  const steps = ["Intro", "Learn", "Chat!", "Quiz", "Complete"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffbeb] via-[#fef9c3] to-[#fef3c7] font-sans overflow-x-hidden">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-amber-500 transition-colors"><FaArrowLeft /> Dashboard</button>
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${i < step ? "bg-amber-400 text-white" : i === step ? "bg-amber-500 text-white shadow-md scale-110" : "bg-gray-100 text-gray-400"}`}>
                {i < step ? <FaCheckCircle className="text-[10px]" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-5 h-0.5 rounded-full transition-all duration-500 ${i < step ? "bg-amber-400" : "bg-gray-200"}`} />}
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
                className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 text-white px-8 py-2 rounded-full font-black text-sm mb-6 shadow-lg shadow-amber-200">
                💬 LEVEL 4 — ASK QUESTIONS
              </motion.div>
              <motion.div animate={{ scale: [1, 1.12, 1], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                className="text-8xl mb-6 text-amber-500 mx-auto w-fit"><FaQuestionCircle /></motion.div>
              <h1 className="text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: FONT }}>Make Python Talk to You! 💬</h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                With <strong className="text-amber-600">input()</strong>, your Python program can ask questions and listen to your answers. Build real interactive programs!
              </p>

              {/* Animated conversation preview */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 mb-8 text-left space-y-3">
                {CONVERSATIONS.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: msg.who === "robot" ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.4 }}
                    className={`flex items-start gap-3 ${msg.who === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm shrink-0 ${msg.who === "robot" ? "bg-amber-400" : "bg-blue-400"}`}>
                      {msg.who === "robot" ? <FaRobot /> : <FaUser />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm font-semibold max-w-[75%] ${msg.who === "robot" ? "bg-amber-50 text-amber-800 border border-amber-100" : "bg-blue-50 text-blue-800 border border-blue-100"}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(1)}
                className="w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg bg-gradient-to-r from-amber-400 to-orange-400 hover:shadow-amber-200 hover:shadow-xl flex items-center justify-center gap-3">
                Start Learning! <FaChevronRight />
              </motion.button>
            </motion.div>
          )}

          {/* LEARN */}
          {step === 1 && (
            <motion.div key="learn" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 text-xl"><FaLightbulb /></div>
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Learn: input()</h2>
                  <p className="text-gray-400 text-sm font-semibold">Make your program interactive</p></div>
              </div>

              {[
                { icon: "💬", title: "Basic Input", color: "bg-amber-50 border-amber-200", code: true, codeLines: [['name', 'input("What is your name? ")'], ['print("Hello, " + name)']] },
                { icon: "🔢", title: "Input + Math (Convert to Number)", color: "bg-orange-50 border-orange-200", code2: true },
                { icon: "⚠️", title: "Important: input() returns text!", color: "bg-red-50 border-red-200", note: 'input() always gives you text (str). To do math, wrap it: int(input("Age? "))' },
              ].map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                  className={`${card.color} rounded-2xl p-5 border mb-4`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{card.icon}</span>
                    <h3 className="font-black text-gray-800">{card.title}</h3>
                  </div>
                  {card.code && (
                    <div className="space-y-2">
                      <div className="bg-[#0f172a] rounded-xl p-4 font-mono text-sm leading-loose">
                        <div><span className="text-amber-400">name</span> = <span className="text-green-400">input</span>(<span className="text-yellow-300">"What is your name? "</span>)</div>
                        <div><span className="text-green-400">print</span>(<span className="text-yellow-300">"Hello, "</span> + <span className="text-amber-400">name</span>)</div>
                      </div>
                      <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm">
                        <span className="text-gray-400 text-xs font-sans">▶ OUTPUT: </span><span className="text-green-400">Hello, Alex</span>
                      </div>
                    </div>
                  )}
                  {card.code2 && (
                    <div className="space-y-2">
                      <div className="bg-[#0f172a] rounded-xl p-4 font-mono text-sm leading-loose">
                        <div><span className="text-amber-400">age</span> = <span className="text-blue-300">int</span>(<span className="text-green-400">input</span>(<span className="text-yellow-300">"How old are you? "</span>))</div>
                        <div><span className="text-amber-400">future</span> = <span className="text-amber-400">age</span> + 5</div>
                        <div><span className="text-green-400">print</span>(<span className="text-yellow-300">"In 5 years:"</span>, <span className="text-amber-400">future</span>)</div>
                      </div>
                      <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm">
                        <span className="text-gray-400 text-xs font-sans">▶ OUTPUT: </span><span className="text-green-400">In 5 years: 15</span>
                      </div>
                    </div>
                  )}
                  {card.note && <p className="text-sm font-semibold text-red-700 leading-relaxed">{card.note}</p>}
                </motion.div>
              ))}

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl">← Back</button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(2)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg flex items-center justify-center gap-2">
                  Chat with Python Bot! <FaChevronRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* INTERACTIVE CHAT */}
          {step === 2 && (
            <motion.div key="chat" {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 text-xl"><FaGamepad /></div>
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Chat with PyBot! 🤖</h2>
                  <p className="text-gray-400 text-sm font-semibold">Experience input() in action</p></div>
              </div>

              {/* Code preview */}
              <div className="bg-[#0f172a] rounded-2xl p-4 font-mono text-xs leading-loose mb-4 border border-amber-900">
                <div className="text-gray-400 font-sans font-bold mb-2 text-[10px] uppercase tracking-wider">Python code running:</div>
                <div><span className="text-amber-400">name</span> = <span className="text-green-400">input</span>(<span className="text-yellow-300">"What is your name? "</span>)</div>
                <div><span className="text-amber-400">age</span> = <span className="text-blue-300">int</span>(<span className="text-green-400">input</span>(<span className="text-yellow-300">"How old are you? "</span>))</div>
                <div><span className="text-green-400">print</span>(<span className="text-yellow-300">"In 5 years:"</span>, <span className="text-amber-400">age</span> + 5)</div>
              </div>

              {/* Chat window */}
              <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden mb-4">
                <div className="bg-amber-500 px-4 py-3 flex items-center gap-2">
                  <FaRobot className="text-white" />
                  <span className="text-white font-black text-sm">PyBot — Running input()</span>
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="ml-auto w-2 h-2 rounded-full bg-green-300" />
                </div>
                <div className="p-4 space-y-3 min-h-[180px] max-h-64 overflow-y-auto">
                  {chatMessages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-2 ${msg.who === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shrink-0 ${msg.who === "robot" ? "bg-amber-400" : "bg-blue-400"}`}>
                        {msg.who === "robot" ? <FaRobot /> : <FaUser />}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 text-sm font-semibold max-w-[80%] ${msg.who === "robot" ? "bg-amber-50 text-amber-900" : "bg-blue-50 text-blue-900"}`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t border-amber-100 p-3 flex gap-2">
                  <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                    placeholder={chatStage === 0 ? "Type your name..." : chatStage === 1 ? "Type your age..." : "Ask anything..."}
                    className="flex-1 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-400 transition-all" />
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleChatSend}
                    className="px-4 py-2 bg-amber-500 text-white font-black rounded-xl text-sm hover:bg-amber-600 transition-colors">
                    ↵ Send
                  </motion.button>
                </div>
              </div>

              {/* What Python stored */}
              {(userName || userAge) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-4">
                  <div className="text-xs font-black text-amber-700 uppercase tracking-wider mb-2">📦 Python's Memory (Variables):</div>
                  <div className="font-mono text-sm space-y-1">
                    {userName && <div><span className="text-amber-600">name</span> = <span className="text-yellow-700">"{userName}"</span></div>}
                    {userAge && <div><span className="text-amber-600">age</span> = <span className="text-blue-600">{userAge}</span></div>}
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl">← Back</button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(3)}
                  className="flex-1 py-3 text-lg font-black text-white rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg flex items-center justify-center gap-2">
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
                <div><h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: FONT }}>Input() Quiz!</h2>
                  <p className="text-gray-400 text-sm font-semibold">Test your knowledge</p></div>
                <div className="ml-auto text-sm font-black text-gray-500">{quizScore}/{QUIZ.length} ⭐</div>
              </div>
              {!quizDone ? (
                <motion.div key={quizIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-black text-gray-400">Q {quizIdx + 1}/{QUIZ.length}</span>
                    <div className="flex gap-1">{QUIZ.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i < quizIdx ? "bg-amber-400" : i === quizIdx ? "bg-yellow-400" : "bg-gray-200"}`} />)}</div>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-5">{QUIZ[quizIdx].q}</h3>
                  <div className="space-y-3">
                    {QUIZ[quizIdx].options.map((opt, i) => {
                      const isCorrect = i === QUIZ[quizIdx].answer;
                      const isSelected = i === quizSelected;
                      return (
                        <motion.button key={i} whileHover={quizSelected === null ? { scale: 1.02 } : {}} onClick={() => handleQuizAnswer(i)}
                          className={`w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${quizSelected !== null ? isCorrect ? "bg-green-50 border-green-400 text-green-700" : isSelected ? "bg-red-50 border-red-400 text-red-700" : "bg-gray-50 border-gray-100 text-gray-400" : "bg-white border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50"}`}>
                          {["A", "B", "C", "D"][i]}. {opt} {quizSelected !== null && isCorrect && <FaCheckCircle className="inline-block ml-2 text-green-500" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <div className="text-6xl mb-4">{quizScore === QUIZ.length ? "🏆" : "🌟"}</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: FONT }}>{quizScore === QUIZ.length ? "Perfect!" : "Well Done!"}</h3>
                  <p className="text-gray-500 font-semibold mb-6"><strong className="text-amber-600">{quizScore}/{QUIZ.length}</strong> correct!</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setQuizIdx(0); setQuizScore(0); setQuizSelected(null); setQuizDone(false); }} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl text-sm">Retry</button>
                    <motion.button whileHover={{ scale: 1.03 }} onClick={() => setStep(4)} className="px-8 py-3 font-black text-white rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg text-sm">Finish! 🎉</motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* COMPLETE */}
          {step === 4 && (
            <motion.div key="complete" {...fadeUp} className="text-center">
              <motion.div animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-8xl mb-6 mx-auto w-fit">🎤</motion.div>
              <h1 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: FONT }}>Level 4 Complete!</h1>
              <p className="text-gray-500 text-lg mb-6">Your Python programs can now <strong className="text-amber-600">listen and respond</strong>! 💬</p>
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-center"><FaGem className="text-blue-500 text-2xl mx-auto mb-1" /><div className="font-black text-blue-700">+50 Gems</div></div>
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 text-center"><FaFire className="text-orange-500 text-2xl mx-auto mb-1" /><div className="font-black text-orange-700">+100 XP</div></div>
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 text-center"><FaStar className="text-yellow-500 text-2xl mx-auto mb-1" /><div className="font-black text-yellow-700 text-sm">Quiz: {quizScore}/{QUIZ.length} ⭐</div></div>
              </div>
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mb-8 text-left">
                <h3 className="font-black text-amber-800 mb-3">🎓 What You Learned:</h3>
                <ul className="space-y-2">
                  {['input() asks users for information', 'input() always returns text (string)', 'Use int(input()) to get numbers', 'Combine input with variables and math!'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-semibold text-amber-700"><FaCheckCircle className="text-amber-500 shrink-0" /> {item}</li>
                  ))}
                </ul>
              </div>
              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} onClick={handleComplete} disabled={loading || completed}
                className={`w-full py-4 text-xl font-black text-white rounded-2xl shadow-lg transition-all ${completed ? "bg-amber-400 cursor-default" : "bg-gradient-to-r from-amber-400 to-orange-400 hover:shadow-amber-200 hover:shadow-xl"} disabled:opacity-75`}>
                {completed ? "✅ Completed! Redirecting..." : loading ? "Saving..." : "Claim Your Gems! 💎"}
              </motion.button>
              <button onClick={() => navigate("/dashboard")} className="mt-4 text-gray-400 font-bold text-sm hover:text-amber-500 transition-colors">← Back to Dashboard</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
