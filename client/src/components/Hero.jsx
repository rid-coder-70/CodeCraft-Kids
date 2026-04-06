import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { API_BASE } from "../config";
import {
  FaRocket, FaTrophy, FaGem, FaFire, FaCode,
  FaLock, FaStar, FaUsers, FaArrowRight, FaMedal,
  FaPython, FaGamepad, FaHandshake, FaBolt,
  FaCommentDots, FaBoxOpen, FaCalculator, FaQuestionCircle, FaCrown,
  FaUserEdit, FaUnlock, FaUserAstronaut, FaUserNinja, FaPuzzlePiece
} from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

const LEVELS_PREVIEW = [
  { id: 1, name: "Say Hello", icon: <FaCommentDots className="text-white" />, color: "bg-green-400", desc: "print() command", always: true },
  { id: 2, name: "Memory Box", icon: <FaBoxOpen className="text-white" />, color: "bg-pink-400", desc: "Variables" },
  { id: 3, name: "Super Math", icon: <FaCalculator className="text-white" />, color: "bg-sky-400", desc: "Math & operators" },
  { id: 4, name: "Ask Questions", icon: <FaQuestionCircle className="text-white" />, color: "bg-amber-400", desc: "input() function" },
  { id: 5, name: "Master Coder", icon: <FaCrown className="text-white" />, color: "bg-purple-500", desc: "Combine it all!" },
];

function AnimatedCounter({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
  const [topUsers, setTopUsers] = useState([]);
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 500,
    pythonLevels: 5,
    badgesToEarn: 10,
    averageAge: 11
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/users/leaderboard?limit=3`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setTopUsers(d.leaderboard); })
      .catch(() => {});

    fetch(`${API_BASE}/api/users/platform-stats`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setPlatformStats(d.stats); })
      .catch(() => {});
  }, []);

  const featuresList = [
    {
      icon: <FaPython className="text-white" />,
      title: "Learn Python Step by Step",
      desc: `${platformStats.pythonLevels} carefully designed levels take you from 'Hello World' to building real programs. Each level unlocks after you master the previous one!`,
      color: "from-green-400 to-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      icon: <FaGem className="text-white" />,
      title: "Earn Gems & Badges",
      desc: `Complete levels to earn Gems and unlock ${platformStats.badgesToEarn} unique Badges. Show off your achievements and climb the global leaderboard!`,
      color: "from-blue-400 to-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: <FaFire className="text-white" />,
      title: "Daily Streaks",
      desc: "Code every day to build your streak. Consistency is the secret to becoming a Python expert — we make it fun!",
      color: "from-orange-400 to-red-400",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      icon: <FaGamepad className="text-white" />,
      title: "Interactive Game Levels",
      desc: "No boring textbooks! Our levels are adventures — solve puzzles, crack codes, and bring Python to life with colorful, interactive games.",
      color: "from-purple-400 to-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      icon: <FaHandshake className="text-white" />,
      title: "Community Feed",
      desc: "Share your coding wins with other young coders around the world. Like, comment, and celebrate progress together!",
      color: "from-amber-400 to-orange-400",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      icon: <FaBolt className="text-white" />,
      title: "Pro Mode Simulator",
      desc: "Ready for more? Unlock Pro Mode for advanced challenges that test your real-world coding skills to the limit!",
      color: "from-rose-400 to-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
  ];

  const stepsList = [
    { title: "Start Your Quest", icon: <FaRocket className="text-green-500" />, desc: "Choose your first mission and begin your Python coding journey." },
    { title: "Solve Puzzles", icon: <FaPuzzlePiece className="text-blue-500" />, desc: "Crack codes and complete interactive challenges to win gems." },
    { title: "Collect Treasures", icon: <FaTrophy className="text-yellow-500" />, desc: `Unlock ${platformStats.badgesToEarn} unique badges as you master new coding skills.` },
  ];

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 overflow-x-hidden">

            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="absolute top-10 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 lg:max-w-xl text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-black uppercase tracking-wider"
            >
              <FaRocket className="text-green-500" /> For Kids Aged 6–15
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-gray-900 tracking-tight"
              style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}
            >
              Digital playground where{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
                education
              </span>{" "}
              meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                imagination
              </span>
            </h1>

            <p className="text-gray-400 text-lg font-semibold max-w-lg leading-relaxed mx-auto lg:mx-0">
              CodeCraft Kids teaches Python through fun, interactive game levels. Earn Gems, unlock Badges, and become a coding superstar — all for free!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={isLoggedIn ? "/dashboard" : "/signup"}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#a0cc5b] to-[#8ebb4a] hover:from-[#8ebb4a] hover:to-[#7daa3a] text-white font-black rounded-2xl text-base transition-all shadow-lg shadow-green-200"
                >
                  {isLoggedIn ? "Go to Dashboard" : "Start for Free"} <FaArrowRight className="text-sm" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-gray-100 text-gray-600 font-black rounded-2xl text-base hover:border-green-200 hover:text-green-600 transition-all shadow-sm"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2 text-sm font-bold text-gray-400">
              <span className="flex items-center gap-1"><FaCode className="text-green-500" /> {platformStats.pythonLevels} Python Levels</span>
              <span className="flex items-center gap-1"><FaGem className="text-blue-500" /> Gem Rewards</span>
              <span className="flex items-center gap-1"><FaTrophy className="text-yellow-500" /> Global Leaderboard</span>
              <span className="flex items-center gap-1"><FaFire className="text-orange-500" /> Daily Streaks</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex-1 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <div className="relative flex items-end justify-center gap-4 mt-8">
                {LEVELS_PREVIEW.map((level, i) => (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="flex flex-col items-center gap-1 cursor-default"
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${level.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}>
                      {level.icon}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black text-gray-400 text-center hidden sm:block">{level.name}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-end justify-center gap-8 mt-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-7xl drop-shadow-xl cursor-default text-pink-500"
                >
                  <FaUserAstronaut />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                  className="text-7xl drop-shadow-xl cursor-default text-green-500"
                >
                  <FaUserNinja />
                </motion.div>
              </div>

              <motion.div
                animate={{ rotate: [-5, 5, -5], y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 right-8 bg-yellow-400 text-white text-sm font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
              >
                <FaTrophy /> +50 Gems!
              </motion.div>
              <motion.div
                animate={{ rotate: [5, -5, 5], y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 left-6 bg-purple-500 text-white text-sm font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
              >
                <FaPython /> Badge Unlocked!
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

            <section className="bg-gradient-to-r from-[#f9faec] to-[#f0f9ff] border-y border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Young Coders", value: platformStats.totalUsers, suffix: "+", icon: <FaUsers className="text-green-500" /> },
            { label: "Python Levels", value: platformStats.pythonLevels, suffix: "", icon: <FaCode className="text-blue-500" /> },
            { label: "Badges to Earn", value: platformStats.badgesToEarn, suffix: "", icon: <FaMedal className="text-yellow-500" /> },
            { label: "Average Age", value: platformStats.averageAge, suffix: "yrs", icon: <FaStar className="text-pink-500" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-2xl">{stat.icon}</div>
              <div className="text-3xl font-black text-gray-900" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 text-sm font-black uppercase tracking-wider rounded-full mb-4">Simple & Fun</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
            How It Works
          </h2>
          <p className="text-gray-400 font-semibold mt-3 max-w-md mx-auto">
            From zero to Python hero in just 3 simple steps!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stepsList.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="relative mb-8 flex justify-center">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg border border-gray-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {step.icon}
                </div>
                {i < stepsList.length - 1 && (
                  <div className="hidden md:block absolute top-[40%] left-[80%] w-full h-[2px] bg-gradient-to-r from-green-200 to-transparent z-0" />
                )}
              </div>
              <h3 className="font-black text-gray-900 text-base mb-2" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>{step.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

            <section className="bg-[#f9faec] py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 text-sm font-black uppercase tracking-wider rounded-full mb-4">Platform Features</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
              Everything You Need to Learn Python
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`${f.bg} border ${f.border} rounded-3xl p-7 transition-all hover:shadow-md`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-md`}>
                  {f.icon}
                </div>
                <h3 className="font-black text-gray-900 text-base mb-2" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>{f.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-purple-50 text-purple-600 text-sm font-black uppercase tracking-wider rounded-full mb-4">The Learning Path</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
            {platformStats.pythonLevels} Levels of Python Adventure
          </h2>
          <p className="text-gray-400 font-semibold mt-3">Each level unlocks the next — complete them all to become a Python Master!</p>
        </motion.div>

        <div className="space-y-4">
          {LEVELS_PREVIEW.map((level, i) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-5 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 shrink-0 ${level.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                {level.icon}
              </div>
              <div className="flex-1">
                <div className="font-black text-gray-900 text-sm">{level.name}</div>
                <div className="text-gray-400 text-sm font-semibold">{level.desc}</div>
              </div>
              <div className="flex items-center gap-2">
                {level.always ? (
                  <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black">Always Open!</span>
                ) : (
                  <FaLock className="text-gray-300 text-sm" />
                )}
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-black flex items-center gap-0.5">
                  <FaGem className="text-[9px]" /> +50
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to={isLoggedIn ? "/dashboard" : "/signup"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#a0cc5b] to-[#8ebb4a] text-white font-black rounded-2xl text-lg shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-105 transition-all"
          >
            {isLoggedIn ? "Continue Playing" : "Begin Your Adventure"} 🚀
          </Link>
        </motion.div>
      </section>

            {topUsers.length > 0 && (
        <section className="bg-gradient-to-br from-yellow-50 to-amber-50 py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 text-sm font-black uppercase tracking-wider rounded-full mb-4">🏆 Top Coders</span>
              <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
                Global Leaderboard
              </h2>
              <p className="text-gray-400 font-semibold mt-2">Will you be on here next?</p>
            </motion.div>

            <div className="space-y-4">
              {topUsers.map((u, i) => {
                const IconComp = u.currentBadge && FaIcons[u.currentBadge] ? FaIcons[u.currentBadge] : FaStar;
                return (
                  <motion.div
                    key={u._id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-yellow-100"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                      i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-gray-700" : "bg-orange-300 text-white"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white font-black text-base overflow-hidden shrink-0">
                      {u.profilePic ? <img src={`${API_BASE}${u.profilePic}`} alt={u.name} className="w-full h-full object-cover" /> : u.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-gray-900 text-sm capitalize">{u.name}</div>
                      <div className="text-gray-400 text-sm font-semibold">{u.completedLevels?.length || 0} levels completed</div>
                    </div>
                    <div className="text-xl text-yellow-500"><IconComp /></div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Link
                to={isLoggedIn ? "/dashboard" : "/signup"}
                className="inline-flex items-center gap-2 text-yellow-700 font-black text-sm hover:text-yellow-900 transition-colors"
              >
                See Full Leaderboard <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </section>
      )}

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#a0cc5b] to-[#7daa3a] rounded-[3rem] p-12 sm:p-16 text-white shadow-2xl shadow-green-200"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-6xl mb-6"
          >
            🚀
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
            Ready to Start Coding?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-10 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            Join {platformStats.totalUsers.toLocaleString()}+ young coders learning Python the fun way. It's free, it's exciting, and Level 1 is always open!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to={isLoggedIn ? "/dashboard" : "/signup"}
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-green-700 font-black rounded-2xl text-lg hover:bg-green-50 transition-all shadow-lg"
              >
                {isLoggedIn ? "Go to Dashboard" : "Join for Free"} <FaArrowRight />
              </Link>
            </motion.div>
            {!isLoggedIn && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-green-600 text-white font-black rounded-2xl text-lg hover:bg-green-700 transition-all border-2 border-green-500"
                >
                  Already a member? Sign In
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}