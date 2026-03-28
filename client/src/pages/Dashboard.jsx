import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import { Joyride, STATUS } from 'react-joyride';
import CommunityFeed from "../components/CommunityFeed";
import CreatePost from "../components/CreatePost";
import PythonEditor from "../components/PythonEditor";
import UsersList from "../components/UsersList";
import BadgeDisplay from "../components/BadgeDisplay";
import {
  FaSignOutAlt, FaPaintBrush, FaBook, FaMagic, 
  FaComments, FaRobot, FaHandPointer, FaPuzzlePiece,
  FaPaw, FaCamera, FaTrash, FaArrowDown, FaPlay, FaLock, FaHome,
  FaBars, FaTimes as FaClose, FaGem, FaFire, FaStore
} from "react-icons/fa";
import { useToast } from "../components/Toast";
import Logo from "../assets/Logo1.png";

// Curved wavy SVG for the sidebar edge matching the "Kiwi" layout screenshot
const SidebarWave = () => (
  <svg className="absolute top-0 right-0 h-full w-12 text-[#f9faec] transform translate-x-full drop-shadow-sm pointer-events-none" 
       preserveAspectRatio="none" viewBox="0 0 50 1000" fill="currentColor">
    <path d="M0,0 Q50,250 25,500 T0,1000 H0 Z" />
  </svg>
);

const SIDEBAR_MENU = [
  {
    category: "Learning & Fun",
    items: [
      { id: "beginner", name: "Python Beginner", icon: <FaPaintBrush className="text-red-400" /> },
      { id: "editor", name: "Code Editor", icon: <FaBook className="text-blue-400" /> },
    ]
  },
  {
    category: "Creative Corner",
    items: [
      { id: "community", name: "Community Feed", icon: <FaMagic className="text-purple-400" /> },
      { id: "leaderboard", name: "Leaderboard", icon: <FaComments className="text-yellow-500" /> },
    ]
  },
  {
    category: "Play & Explore",
    items: [
      { id: "games_pro", name: "Pro Mode Games", icon: <FaHandPointer className="text-red-400" /> },
      { id: "shop", name: "Adventure Shop", icon: <FaStore className="text-orange-400" /> },
      { id: "badges", name: "My Badges", icon: <FaPuzzlePiece className="text-yellow-400" /> },
      { id: "profile", name: "Profile Settings", icon: <FaPaw className="text-green-500" /> },
    ]
  }
];

const TOUR_STEPS = [
    {
      target: '.sidebar-menu',
      content: 'Here is your learning map! Choose lessons, the playground, or the shop.',
      disableBeacon: true,
    },
    {
      target: '.stats-header',
      content: 'Track your Streaks 🔥 and Gems 💎 here. Complete levels to earn more!',
    },
    {
      target: '.dashboard-content',
      content: 'This is where the magic happens! Your levels and feed will appear here.',
    }
];

const BEGINNER_LEVELS = [
  { id: 1, path: 'map', name: "Python Island Map", icon: "🗺️" },
  { id: 2, path: 'learn-print', name: "Learn Print Statement", icon: "📖" },
  { id: 3, path: 'challenges-print', name: "Print Challenges", icon: "🎮" },
  { id: 4, path: 'learn-variables', name: "Learn Variables", icon: "💡" },
  { id: 5, path: 'challenges-variables', name: "Variable Challenges", icon: "🧩" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("beginner");
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [communityRefresh, setCommunityRefresh] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const toast = useToast();

  const handlePostCreated = () => setCommunityRefresh(prev => prev + 1);

  useEffect(() => {
    // Check if it's user's first time or they want to see tour again
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      localStorage.setItem('hasSeenTour', 'true');
    }
  };

  // Sync progress if game is played inside dashboard
  useEffect(() => {
    const handleMessage = async (e) => {
      if (e.data && e.data.type === 'LEVEL_COMPLETE') {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await fetch(`${API_BASE}/api/auth/profile`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ completedLevel: e.data.level })
            });
            const data = await response.json();
            
            if (data.badgeEarned) {
              toast(`🎉 UNLOCKED! Level ${e.data.level} Complete! Earned: ${data.badgeEarned.name}`, "success");
            } else {
              toast(`✨ Level ${e.data.level} completed again! Keep going!`, "info");
            }

            // Update local state too
            setUser(prev => ({
              ...prev,
              completedLevels: [...(prev?.completedLevels || []), e.data.level],
              badges: data.user?.badges || prev?.badges
            }));
          } catch (error) {
            console.error('Error updating progress:', error);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    
    fetch(`${API_BASE}/api/auth/profile`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => res.json())
      .then(data => { if (data.success) setUser(data.user); })
      .catch(console.error);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const currentAvatar = user?.profilePic ? `${API_BASE}${user.profilePic}` : null;

  return (
    <div className="min-h-screen bg-white flex font-sans text-gray-800 overflow-x-hidden relative">
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-white border border-gray-100 rounded-2xl shadow-lg text-[#a0cc5b] text-xl"
        >
          {isSidebarOpen ? <FaClose /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
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

      {/* Sidebar (matches Kiwi layout) */}
      <motion.div 
        initial={false}
        animate={{ 
          x: (typeof window !== 'undefined' && window.innerWidth < 1024 && !isSidebarOpen) ? -300 : 0,
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
        className={`fixed lg:relative w-[280px] sm:w-[300px] h-screen bg-[#f9faec] flex flex-col pt-8 pb-4 shrink-0 shadow-[4px_0_20px_rgba(0,0,0,0.03)] border-r border-gray-100 z-50 lg:z-10
          ${!isSidebarOpen ? "hidden lg:flex" : "flex"}`}
      >
        <SidebarWave />

        {/* Brand */}
        <div className="flex items-center gap-3 px-6 mb-10 cursor-pointer" onClick={() => navigate("/")}>
          <img src={Logo} alt="CodeCraft" className="w-10 h-10 object-contain rounded-full border border-[#a0cc5b]" />
          <h1 className="font-bold text-xl text-gray-800 tracking-tight">CodeCraft API</h1>
        </div>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar sidebar-menu">
          {SIDEBAR_MENU.map((group, i) => (
            <div key={i} className="mb-8">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide px-2 mb-3">
                {group.category}
              </h2>
              <ul className="space-y-1">
                {group.items.map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setSelectedGame(null);
                          setIsSidebarOpen(false); // Close sidebar on mobile after selecting
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium text-sm
                          ${isActive ? "bg-white text-green-700 shadow-sm border border-gray-100" : "text-gray-600 hover:bg-white/50"}`}
                      >
                        <span className="text-lg opacity-90">{item.icon}</span>
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        {/* Back to Home & Logout */}
        <div className="px-4 mt-auto space-y-1">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-white hover:shadow-sm transition-all font-medium text-sm"
          >
            <FaHome className="text-green-500 text-lg opacity-80" />
            Go to Home
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm"
          >
            <FaSignOutAlt className="text-blue-500 text-lg opacity-80" />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex flex-col relative h-screen overflow-y-auto bg-white pt-10 px-4 sm:px-10 lg:px-20 z-0 dashboard-content"
      >
        <Joyride
          steps={TOUR_STEPS}
          run={runTour}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: '#a0cc5b',
              zIndex: 1000,
            }
          }}
        />

        {/* Header (Avatar & Stats) - Hidden when playing game */}
        {!selectedGame && (
          <div className="flex flex-col items-center mb-12">
            {/* Top Row: Streaks & Gems */}
            <div className="flex gap-4 mb-6 stats-header animate-fade-in">
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm" title="Your Daily Streak">
                <FaFire className="text-orange-500 text-xl" />
                <span className="font-bold text-orange-700">{user?.streak || 1} Day Streak</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm" title="Your Coding Gems">
                <FaGem className="text-blue-500 text-xl" />
                <span className="font-bold text-blue-700">{user?.gems || 0} Gems</span>
              </div>
            </div>

            {/* Avatar Bubble */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-3xl shadow-md border-4 border-white mb-2 overflow-hidden cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate("/profile")}>
              {currentAvatar ? <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover" /> : "👦"}
            </div>
            <h2 className="text-lg font-bold text-gray-700 font-sans mb-6 capitalize">{user?.name || "CodeCrafter"}</h2>

            {/* Search Input */}
            <div className="w-full max-w-lg">
              <label className="text-xs font-bold text-gray-600 mb-1.5 block">Search Tutorials</label>
              <input
                type="text"
                placeholder="Find a challenge..."er="Enter search term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm shadow-sm font-medium placeholder-gray-400 transition-all"
              />
            </div>
          </div>
        )}

        {/* Dynamic Content Views */}
        <div className="w-full max-w-4xl mx-auto pb-20">
          
          {/* Game Embedded View */}
          {selectedGame ? (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{selectedGame.icon}</div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedGame.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition shadow-sm text-sm"
                >
                  Back to Levels
                </button>
              </div>
              <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl h-[70vh]">
                <iframe 
                  src={`/${selectedGame.path === 'map' ? 'index.html' : selectedGame.path + '.html'}`} 
                  title={selectedGame.name}
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          ) : (
            <>
              {/* Beginner Mode View */}
              {activeTab === "community" && (
                <div className="animate-fade-in relative px-1">
                  <div className="mb-8 flex justify-between items-center bg-[#f9faec] p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Nunito', sans-serif" }}>Community Feed</h2>
                      <p className="text-sm text-gray-500 font-medium">Share your progress with other young coders!</p>
                    </div>
                  </div>
                  
                  <CommunityFeed refreshKey={communityRefresh} />
                  
                  {/* Floating Create Post Button */}
                  <CreatePost onPostCreated={handlePostCreated} />
                </div>
              )}
              {activeTab === "beginner" && (
                <div className="space-y-4">
                  {BEGINNER_LEVELS.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((level) => {
                    const isCompleted = user?.completedLevels?.includes(level.id);
                    const isLocked = level.id > 1 && !user?.completedLevels?.includes(level.id - 1);

                    return (
                    <div key={level.id} className={`flex items-center justify-between p-4 border rounded-[20px] transition-all shadow-sm 
                      ${isLocked ? "bg-gray-50 border-gray-200 opacity-80" : "bg-[#eff5f0] border-[#e1ecdf] hover:shadow-md"}`}>
                      {/* Item Left */}
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-xl
                          ${isLocked ? "bg-gray-100 border-gray-300" : "bg-white border-[#a0cc5b]"}`}>
                          {isLocked ? <FaLock className="text-gray-400 text-sm" /> : level.icon}
                        </div>
                        <span className={`font-bold text-sm sm:text-base tracking-tight ${isLocked ? "text-gray-400" : "text-gray-700"}`}>
                          {level.name}
                        </span>
                      </div>
                      
                      {/* Item Right Actions */}
                      <div className="flex items-center gap-3">
                        {isCompleted && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold uppercase tracking-wider hidden sm:block">Completed 🌟</span>
                        )}
                        {isLocked ? (
                          <button disabled className="px-4 py-2 text-gray-400 bg-gray-200 font-bold rounded-xl cursor-not-allowed text-sm flex items-center gap-2">
                             Locked
                          </button>
                        ) : (
                          <button onClick={() => setSelectedGame(level)} className="px-4 py-2 text-white bg-[#a0cc5b] font-bold rounded-xl hover:bg-[#8ebb4a] transition shadow-sm text-sm flex items-center gap-2">
                            <FaPlay className="text-xs" /> {isCompleted ? "Replay" : "Play"}
                          </button>
                        )}
                      </div>
                    </div>
                  )})}
                </div>
              )}

              {/* Simple mappings for other tabs */}
              {activeTab === "leaderboard" && <UsersList />}
              {activeTab === "badges" && (
                <div className="bg-[#eff5f0] p-8 rounded-3xl border border-[#e1ecdf] text-center shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Your Coding Badges</h2>
                  <BadgeDisplay badges={user?.badges} size="large" />
                  {(!user?.badges || user.badges.length === 0) && (
                    <p className="text-gray-500 font-medium">Complete more games to earn badges!</p>
                  )}
                </div>
              )}
              {activeTab === "editor" && (
                <div className="h-[75vh] w-full">
                  <PythonEditor />
                </div>
              )}
              {activeTab === "profile" && (
                <div className="bg-[#eff5f0] p-8 rounded-3xl border border-[#e1ecdf] flex flex-col items-center">
                  <button onClick={() => navigate("/profile")} className="px-6 py-2 bg-green-600 text-white font-bold rounded-full">
                    Go to Full Profile Page
                  </button>
                </div>
              )}
              {activeTab === "games_pro" && (
                <div className="bg-[#eff5f0] p-8 rounded-3xl border border-[#e1ecdf] text-center">
                  <h3 className="font-bold text-gray-700 mb-4">Pro Mode Coming Soon!</h3>
                  <button onClick={() => navigate("/game/pro")} className="px-6 py-2 bg-orange-500 text-white font-bold rounded-full">
                    Try Pro Simulator
                  </button>
                </div>
              )}
              {activeTab === "shop" && (
                <div className="animate-fade-in text-center p-12 bg-orange-50 rounded-[3rem] border-2 border-dashed border-orange-200">
                  <div className="text-6xl mb-6">🎒</div>
                  <h2 className="text-2xl font-bold text-orange-800" style={{ fontFamily: "'Nunito', sans-serif" }}>Adventure Shop</h2>
                  <p className="text-orange-600 font-medium mb-8 max-w-sm mx-auto">
                    Spend your **{user?.gems || 0} Gems** on magical hats and coding pets!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                    {[
                      { name: "Magician Hat", price: 100, icon: "🎩" },
                      { name: "Coding Cat", price: 250, icon: "🐱" },
                      { name: "Glow Skin", price: 500, icon: "✨" },
                      { name: "Robot Friend", price: 750, icon: "🤖" },
                    ].map(item => (
                      <div key={item.name} className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-all">
                        <span className="text-4xl">{item.icon}</span>
                        <span className="font-bold text-gray-800">{item.name}</span>
                        <button className="mt-2 px-4 py-1.5 bg-orange-400 text-white font-bold rounded-lg text-xs flex items-center gap-1">
                          <FaGem className="text-[10px]" /> {item.price}
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-12 text-xs text-orange-400 font-bold uppercase tracking-widest">Items coming soon to your avatar!</p>
                </div>
              )}
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
}