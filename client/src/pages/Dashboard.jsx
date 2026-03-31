import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import CommunityFeed from "../components/CommunityFeed";
import CreatePost from "../components/CreatePost";
import PythonEditor from "../components/PythonEditor";
import UsersList from "../components/UsersList";
import BadgeDisplay from "../components/BadgeDisplay";
import ProfileSettings from "../components/ProfileSettings";
import * as FaIcons from "react-icons/fa";
import {
  FaSignOutAlt, FaPaintBrush, FaBook, FaMagic,
  FaComments, FaHandPointer, FaPuzzlePiece,
  FaPaw, FaBars, FaTimes, FaGem, FaFire, FaStore,
  FaLock, FaPlay, FaRedo, FaHome, FaTrophy, FaMedal,
  FaCommentDots, FaBoxOpen, FaCalculator, FaQuestionCircle, FaCrown,
  FaUser, FaUserEdit, FaBolt, FaShoppingBag, FaHatWizard, FaCat, FaStar, FaRobot, FaGamepad
} from "react-icons/fa";
import { useToast } from "../components/Toast";
import Logo from "../assets/logo.svg";

const SidebarWave = () => (
  <svg
    className="absolute top-0 right-0 h-full w-12 text-[#f9faec] transform translate-x-full drop-shadow-sm pointer-events-none"
    preserveAspectRatio="none"
    viewBox="0 0 50 1000"
    fill="currentColor"
  >
    <path d="M0,0 Q50,250 25,500 T0,1000 H0 Z" />
  </svg>
);

const SIDEBAR_MENU = [
  {
    category: "Learning Hub",
    items: [
      { id: "beginner", name: "Python Levels", icon: <FaPaintBrush className="text-green-500" /> },
      { id: "editor", name: "Code Editor", icon: <FaBook className="text-blue-500" /> },
    ],
  },
  {
    category: "Creative Space",
    items: [
      { id: "community", name: "Community Feed", icon: <FaMagic className="text-purple-500" /> },
      { id: "leaderboard", name: "Leaderboard", icon: <FaComments className="text-yellow-500" /> },
    ],
  },
  {
    category: "Play & Explore",
    items: [
      { id: "games_pro", name: "Pro Mode", icon: <FaHandPointer className="text-red-500" /> },
      { id: "shop", name: "Adventure Shop", icon: <FaStore className="text-orange-500" /> },
      { id: "badges", name: "My Badges", icon: <FaPuzzlePiece className="text-yellow-500" /> },
      { id: "profile", name: "Profile Settings", icon: <FaPaw className="text-green-600" /> },
    ],
  },
];

const BEGINNER_LEVELS = [
  { id: 1, name: "Level 1: Say Hello", icon: <FaCommentDots />, color: "from-green-400 to-green-500", desc: "Learn the print() command", xp: 100, gems: 50, badge: "Python Beginner" },
  { id: 2, name: "Level 2: Memory Box", icon: <FaBoxOpen />, color: "from-pink-400 to-pink-500", desc: "Discover variables", xp: 100, gems: 50, badge: "Code Explorer" },
  { id: 3, name: "Level 3: Super Math", icon: <FaCalculator />, color: "from-sky-400 to-sky-500", desc: "Python as a calculator", xp: 100, gems: 50, badge: "Logic Master" },
  { id: 4, name: "Level 4: Ask Questions", icon: <FaQuestionCircle />, color: "from-amber-400 to-orange-400", desc: "Use input() to interact", xp: 100, gems: 50, badge: "Loop Champion" },
  { id: 5, name: "Level 5: Master Coder", icon: <FaCrown />, color: "from-purple-500 to-purple-700", desc: "Combine everything!", xp: 150, gems: 75, badge: "Function Wizard" },
];

function BadgeUnlockPopup({ badge, onClose }) {
  const IconComp = badge?.icon && FaIcons[badge.icon] ? FaIcons[badge.icon] : null;

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl border-2 border-yellow-200"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: 3, duration: 0.6 }}
              className={`text-7xl mb-5 mx-auto w-fit ${IconComp ? "text-yellow-500" : ""}`}
            >
              {IconComp ? <IconComp /> : badge.icon}
            </motion.div>
            <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-black uppercase tracking-wider mb-4">
              <FaTrophy className="inline-block mr-1" /> Badge Unlocked!
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
              {badge.name}
            </h2>
            <p className="text-gray-500 font-semibold text-sm mb-6">{badge.description}</p>
            <div className="flex justify-center gap-4 text-sm font-bold mb-6">
              <span className="flex items-center gap-1 text-blue-600"><FaGem /> +{badge.gems || 50} Gems</span>
              <span className="flex items-center gap-1 text-orange-500"><FaFire /> +100 XP</span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-black rounded-2xl text-lg hover:scale-105 transition-transform shadow-md"
            >
              Awesome! 🎉
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("beginner");
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [communityRefresh, setCommunityRefresh] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [badgePopup, setBadgePopup] = useState(null);
  const toast = useToast();

  const handlePostCreated = () => setCommunityRefresh((prev) => prev + 1);

  // ── Fetch user profile ────────────────────────────────────────────────────
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch (e) { console.error(e); }
  }, [navigate]);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  // ── Listen for level complete messages from level pages (if opened in same tab via navigate) ─
  useEffect(() => {
    const handleMessage = async (e) => {
      if (e.data?.type === "LEVEL_COMPLETE") {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
          const res = await fetch(`${API_BASE}/api/auth/profile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ completedLevel: e.data.level }),
          });
          const data = await res.json();
          if (data.badgeEarned) {
            setBadgePopup({ ...data.badgeEarned, gems: 50 });
          }
          setUser(data.user);
        } catch (err) { console.error(err); }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ── Level lock logic ─────────────────────────────────────────────────────────
  // Level 1 always unlocked. Level N requires Level N-1 completed.
  const isLevelUnlocked = (levelId) => {
    if (levelId === 1) return true; // Level 1 is ALWAYS open
    return user?.completedLevels?.includes(levelId - 1);
  };
  const isLevelCompleted = (levelId) => user?.completedLevels?.includes(levelId);

  const handlePlayLevel = (levelId) => {
    if (!isLevelUnlocked(levelId)) {
      toast(`🔒 Complete Level ${levelId - 1} first!`, "info");
      return;
    }
    navigate(`/game/level/${levelId}`);
  };

  const currentAvatar = user?.profilePic ? `${API_BASE}${user.profilePic}` : null;

  const completedCount = user?.completedLevels?.length || 0;
  const progressPercent = Math.round((completedCount / BEGINNER_LEVELS.length) * 100);

  const filteredLevels = BEGINNER_LEVELS.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white flex font-sans text-gray-800 overflow-x-hidden relative">

      {/* Badge Unlock Popup */}
      <BadgeUnlockPopup badge={badgePopup} onClose={() => setBadgePopup(null)} />

      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-5 left-5 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-11 h-11 bg-white border border-gray-100 rounded-2xl shadow-lg text-[#a0cc5b] flex items-center justify-center text-xl transition-transform hover:scale-110"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{
          x: typeof window !== "undefined" && window.innerWidth < 1024 && !isSidebarOpen ? -300 : 0,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
        className={`fixed lg:relative w-[280px] sm:w-[300px] h-screen bg-[#f9faec] flex flex-col pt-8 pb-4 shrink-0 shadow-[4px_0_20px_rgba(0,0,0,0.04)] border-r border-gray-100 z-50 lg:z-10 ${!isSidebarOpen ? "hidden lg:flex" : "flex"}`}
      >
        <SidebarWave />

        {/* Brand */}
        <div className="flex items-center gap-3 px-6 mb-8 cursor-pointer" onClick={() => navigate("/")}>
          <img src={Logo} alt="CodeCraft" className="w-10 h-10 object-contain rounded-full border border-[#a0cc5b]" />
          <h1 className="font-black text-xl text-gray-800 tracking-tight" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
            CodeCraft Kids
          </h1>
        </div>

        {/* User mini card */}
        {user && (
          <div className="mx-4 mb-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div
                onClick={() => setActiveTab("edit_profile")}
              className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-black text-base overflow-hidden cursor-pointer hover:scale-105 transition-transform shrink-0"
            >
              {currentAvatar ? <img src={currentAvatar} alt="av" className="w-full h-full object-cover" /> : <FaUser />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-black text-gray-800 text-sm truncate capitalize">{user.name}</div>
              <div className="flex items-center gap-2 text-sm font-bold">
                <span className="text-orange-500 flex items-center gap-0.5"><FaFire className="text-[10px]" />{user.streak || 0}d</span>
                <span className="text-blue-500 flex items-center gap-0.5"><FaGem className="text-[10px]" />{user.gems || 0}</span>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar sidebar-menu">
          {SIDEBAR_MENU.map((group, i) => (
            <div key={i} className="mb-6">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-2">
                {group.category}
              </h2>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${
                          isActive
                            ? "bg-white text-gray-800 shadow-sm border border-gray-100"
                            : "text-gray-500 hover:bg-white/60 hover:text-gray-700"
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="px-4 mt-2 space-y-1">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-white hover:shadow-sm transition-all font-bold text-sm"
          >
            <FaHome className="text-green-500 text-base" /> Go to Home
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-50 transition-colors font-bold text-sm"
          >
            <FaSignOutAlt className="text-base" /> Logout
          </button>
        </div>
      </motion.div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex-1 flex flex-col h-screen overflow-y-auto bg-white pt-10 px-4 sm:px-8 lg:px-16 z-0 dashboard-content"
      >
        {/* ── Stats header ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center mb-10 stats-header">
          <div className="flex gap-3 mb-6 flex-wrap justify-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm cursor-default">
              <FaFire className="text-orange-500" />
              <span className="font-black text-orange-700 text-sm">{user?.streak || 0} Day Streak</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm cursor-default">
              <FaGem className="text-blue-500" />
              <span className="font-black text-blue-700 text-sm">{user?.gems || 0} Gems</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-2xl border border-yellow-100 shadow-sm cursor-default">
              <FaTrophy className="text-yellow-500" />
              <span className="font-black text-yellow-700 text-sm">{completedCount} / {BEGINNER_LEVELS.length} Levels</span>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab("edit_profile")}
            className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white mb-2 overflow-hidden cursor-pointer text-white"
          >
            {currentAvatar ? <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover" /> : <FaUser />}
          </motion.div>
          <h2 className="text-lg font-black text-gray-700 mb-6 capitalize" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
            {user?.name || "CodeCrafter"}
          </h2>

          {/* Search */}
          <div className="w-full max-w-lg">
            <div className="relative">
              <input
                type="text"
                id="search-levels"
                placeholder="Search levels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm font-bold placeholder-gray-300 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* ── Tab content ──────────────────────────────────────────────── */}
        <div className="w-full max-w-4xl mx-auto pb-20">

          {/* BEGINNER LEVELS */}
          {activeTab === "beginner" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Progress bar */}
              <div className="mb-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-black text-gray-500 uppercase tracking-wider">Your Progress</span>
                  <span className="text-sm font-black text-green-600">{progressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                  />
                </div>
                <div className="flex gap-1 mt-3">
                  {BEGINNER_LEVELS.map((l) => (
                    <div
                      key={l.id}
                      className={`flex-1 h-1.5 rounded-full ${isLevelCompleted(l.id) ? "bg-green-400" : "bg-gray-200"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Level cards */}
              <div className="space-y-4">
                {filteredLevels.map((level, idx) => {
                  const unlocked = isLevelUnlocked(level.id);
                  const completed = isLevelCompleted(level.id);

                  return (
                    <motion.div
                      key={level.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      className={`relative flex items-center justify-between p-5 rounded-[1.5rem] border transition-all ${
                        completed
                          ? "bg-green-50 border-green-200 shadow-sm"
                          : unlocked
                          ? "bg-white border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                          : "bg-gray-50 border-gray-200 opacity-70"
                      }`}
                    >
                      {/* Left */}
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-3xl shadow-sm bg-gradient-to-br ${
                          completed ? "from-green-400 to-green-500" : unlocked ? level.color : "from-gray-200 to-gray-300"
                        }`}>
                          {!unlocked ? <FaLock className="text-gray-400 text-base" /> : level.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-black text-sm ${!unlocked ? "text-gray-400" : "text-gray-800"}`}>
                              {level.name}
                            </span>
                            {completed && (
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                                Done
                              </span>
                            )}
                            {level.id === 1 && !completed && (
                              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                                Start Here!
                              </span>
                            )}
                          </div>
                          <p className={`text-sm font-semibold mt-0.5 ${!unlocked ? "text-gray-300" : "text-gray-400"}`}>
                            {level.desc}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] font-black">
                            <span className="text-blue-500 flex items-center gap-0.5"><FaGem className="text-[9px]" />+{level.gems}</span>
                            <span className="text-orange-500 flex items-center gap-0.5"><FaFire className="text-[9px]" />+{level.xp} XP</span>
                            {!unlocked && level.id > 1 && (
                              <span className="text-gray-400">Complete Level {level.id - 1} first</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="shrink-0">
                        {!unlocked ? (
                          <button
                            disabled
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 font-black rounded-xl text-sm cursor-not-allowed"
                          >
                            <FaLock className="text-sm" /> Locked
                          </button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePlayLevel(level.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 font-black rounded-xl text-sm text-white shadow-sm transition-all ${
                              completed
                                ? "bg-green-500 hover:bg-green-600"
                                : `bg-gradient-to-r ${level.color} hover:shadow-md`
                            }`}
                          >
                            {completed ? <><FaRedo className="text-sm" /> Replay</> : <><FaPlay className="text-sm" /> Play</>}
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* COMMUNITY */}
          {activeTab === "community" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-6 p-5 bg-[#f9faec] rounded-2xl border border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-gray-800" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>Community Feed</h2>
                  <p className="text-sm text-gray-400 font-semibold">Share your coding journey!</p>
                </div>
                <FaMagic className="text-purple-400 text-2xl" />
              </div>
              <CommunityFeed refreshKey={communityRefresh} />
              <CreatePost onPostCreated={handlePostCreated} />
            </motion.div>
          )}

          {/* LEADERBOARD */}
          {activeTab === "leaderboard" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-6 p-5 bg-yellow-50 rounded-2xl border border-yellow-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-gray-800" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}><FaTrophy className="inline-block mr-2 text-yellow-500" /> Leaderboard</h2>
                  <p className="text-sm text-gray-400 font-semibold">Top coders in our community!</p>
                </div>
                <FaMedal className="text-yellow-400 text-2xl" />
              </div>
              <UsersList />
            </motion.div>
          )}

          {/* BADGES */}
          {activeTab === "badges" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="bg-[#eff5f0] p-8 rounded-3xl border border-[#e1ecdf] shadow-sm"
            >
              <h2 className="text-xl font-black text-gray-800 mb-2" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
                My Coding Badges
              </h2>
              <p className="text-sm text-gray-400 font-semibold mb-6">Complete levels to unlock cool badges!</p>
              <BadgeDisplay badges={user?.badges} size="large" maxDisplay={null} />
              {(!user?.badges || user.badges.length === 0) && (
                <div className="text-center mt-6">
                  <div className="text-4xl mb-3">🎯</div>
                  <p className="text-gray-500 font-bold">Complete Level 1 to earn your first badge!</p>
                  <button onClick={() => setActiveTab("beginner")} className="mt-4 px-6 py-2.5 bg-[#a0cc5b] text-white font-black rounded-xl text-sm hover:bg-[#8ebb4a] transition-colors">
                    Start Playing →
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* EDITOR */}
          {activeTab === "editor" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="h-[75vh] w-full"
            >
              <PythonEditor />
            </motion.div>
          )}

          {/* PROFILE */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
              className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-32 w-full relative">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-xl flex items-center justify-center text-4xl text-green-500 overflow-hidden">
                    {user?.profilePic ? <img src={`${API_BASE}${user.profilePic}`} alt="Profile" className="w-full h-full object-cover" /> : <FaUser />}
                  </div>
                </div>
              </div>
              <div className="pt-16 pb-10 px-6 text-center">
                <h3 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>{user?.name || "CodeCrafter"}</h3>
                <p className="text-gray-500 font-semibold text-sm mb-6">{user?.email}</p>
                
                <div className="flex justify-center gap-4 sm:gap-8 mb-8">
                  <div className="bg-orange-50 rounded-2xl p-4 min-w-[100px] border border-orange-100">
                    <div className="text-2xl text-orange-400 mb-1 flex justify-center"><FaFire /></div>
                    <div className="font-black text-gray-900">{user?.streak || 0}</div>
                    <div className="text-[10px] font-black uppercase text-gray-400">Day Streak</div>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4 min-w-[100px] border border-blue-100">
                    <div className="text-2xl text-blue-400 mb-1 flex justify-center"><FaGem /></div>
                    <div className="font-black text-gray-900">{user?.gems || 0}</div>
                    <div className="text-[10px] font-black uppercase text-gray-400">Total Gems</div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-4 min-w-[100px] border border-purple-100">
                    <div className="text-2xl text-purple-400 mb-1 flex justify-center"><FaTrophy /></div>
                    <div className="font-black text-gray-900">{user?.completedLevels?.length || 0}</div>
                    <div className="text-[10px] font-black uppercase text-gray-400">Levels Won</div>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button onClick={() => setActiveTab("edit_profile")} className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
                    <FaUserEdit /> Edit Full Profile
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* EDIT PROFILE INLINE */}
          {activeTab === "edit_profile" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full">
              <ProfileSettings onClose={() => setActiveTab("profile")} />
            </motion.div>
          )}

          {/* PRO MODE */}
          {activeTab === "games_pro" && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-[2.5rem] border border-red-100 text-center shadow-sm"
            >
              <div className="text-6xl mb-4 text-yellow-500 mx-auto w-fit"><FaBolt /></div>
              <h3 className="font-black text-gray-800 text-2xl mb-2" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>Pro Mode</h3>
              <p className="text-gray-500 font-semibold mb-6">Advanced Python challenges for elite coders. Complete all 5 beginner levels first!</p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button
                  onClick={() => setActiveTab("beginner")}
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-black rounded-2xl text-sm hover:bg-gray-50 transition-all shadow-sm"
                >
                  First, finish Beginner Levels →
                </button>
                <button onClick={() => setActiveTab("play_games_pro")} className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-black rounded-2xl text-sm hover:shadow-lg transition-all">
                  Try Pro Simulator
                </button>
              </div>
            </motion.div>
          )}

          {/* PLAY PRO MODE (Inline Rendering of ProStart) */}
          {activeTab === "play_games_pro" && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 w-full text-center"
            >
              <FaRocket className="text-5xl text-rose-500 mx-auto mb-6" />
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
                  Pro Mode
              </h1>
              <p className="text-gray-900 font-bold text-lg mb-2">
                  Advanced Python Challenges Coming Soon!
              </p>
              <p className="text-gray-500 font-medium mb-10 leading-relaxed text-sm max-w-md mx-auto">
                  Complete all beginner levels first to unlock the Pro Mode challenges and earn advanced badges!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <button
                    onClick={() => setActiveTab("games_pro")}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold transition-colors shadow-sm"
                >
                    <FaArrowLeft /> Back
                </button>
                <button
                    onClick={() => setActiveTab("beginner")}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-[#a0cc5b] hover:bg-[#8ebb4a] text-white rounded-xl font-bold transition-colors shadow-sm"
                >
                    <FaGamepad /> Play Beginner
                </button>
              </div>
            </motion.div>
          )}

          {/* SHOP */}
          {activeTab === "shop" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="bg-orange-50 rounded-3xl border-2 border-dashed border-orange-200 p-10 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-6xl mb-5 text-orange-400 mx-auto w-fit"
              >
                <FaShoppingBag />
              </motion.div>
              <h2 className="text-2xl font-black text-orange-800 mb-2" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
                Adventure Shop
              </h2>
              <p className="text-orange-500 font-semibold mb-2">
                You have <strong className="text-orange-700">{user?.gems || 0} Gems</strong>
              </p>
              <p className="text-orange-400 text-sm font-bold mb-8">Spend gems on magical avatars and items!</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { name: "Wizard Hat", price: 100, icon: <FaHatWizard className="text-purple-400" /> },
                  { name: "Coding Cat", price: 250, icon: <FaCat className="text-orange-400" /> },
                  { name: "Glow Skin", price: 500, icon: <FaStar className="text-yellow-400" /> },
                  { name: "Robot Friend", price: 750, icon: <FaRobot className="text-blue-400" /> },
                ].map((item) => {
                  const canAfford = (user?.gems || 0) >= item.price;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex flex-col items-center gap-2"
                    >
                      <span className="text-4xl">{item.icon}</span>
                      <span className="font-black text-gray-800 text-sm text-center">{item.name}</span>
                      <button
                        className={`mt-auto px-3 py-1.5 font-black rounded-lg text-sm flex items-center gap-1 ${
                          canAfford ? "bg-orange-400 text-white hover:bg-orange-500" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!canAfford}
                      >
                        <FaGem className="text-[9px]" /> {item.price}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
              <p className="mt-8 text-sm text-orange-400 font-black uppercase tracking-widest">
                Items coming soon to your avatar!
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}