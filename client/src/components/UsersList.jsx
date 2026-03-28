import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";
import { 
  FaSearch, 
  FaUsers, 
  FaUser, 
  FaTrophy, 
  FaAward,
  FaCalendar,
  FaRocket,
  FaStar,
  FaChartLine
} from "react-icons/fa";
import { 
  GiRank3,
  GiProgression
} from "react-icons/gi";
import { 
  IoSparkles,
  IoSpeedometer
} from "react-icons/io5";
import { 
  MdEmojiPeople,
  MdGroups
} from "react-icons/md";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserLevel = (completedLevels) => completedLevels?.length || 0;

  const getHighestBadge = (badges) => {
    if (!badges || badges.length === 0) return "⭐";
    const highest = badges.reduce((a, b) => ((b.level || 0) > (a.level || 0) ? b : a));
    return highest.icon || "🏆";
  };

  const getProgressPercentage = (completedLevels) => {
    const levelCount = completedLevels?.length || 0;
    return Math.min(levelCount * 10, 100);
  };

  const getCurrentBadge = (user) => {
    if (user.currentBadge) return user.currentBadge;
    if (user.badges && user.badges.length > 0) {
      return getHighestBadge(user.badges);
    }
    return <FaStar className="text-yellow-400" />;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-500 font-bold">Loading community...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center justify-center gap-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Community Leaderboard
        </h1>
        <p className="text-gray-500 font-medium">
          Connect with fellow students and track your coding journey together
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 transition text-sm font-medium text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
          <div className="text-5xl mb-4 flex justify-center text-gray-300">
            <MdEmojiPeople />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">No users found</h3>
          <p className="text-sm">Try adjusting your search terms</p>
        </div>
      ) : (
        <>
          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 hover:shadow-[0_4px_25px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                {/* User Avatar & Badge */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                  <div className="relative">
                    {user.profilePic ? (
                      <img
                        src={`${API_BASE}${user.profilePic}`}
                        alt={user.name}
                        className="w-16 h-16 rounded-full border-2 border-green-100 object-cover group-hover:border-green-300 transition-colors"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a0cc5b] to-[#8ebb4a] flex items-center justify-center text-white font-black text-2xl border-2 border-green-50">
                        {user.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-100 shadow-sm">
                      <span className="text-lg" title="Current Badge">
                        {getCurrentBadge(user)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl mb-1 text-yellow-400 drop-shadow-sm">
                      {getHighestBadge(user.badges)}
                    </span>
                    <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                      <FaAward className="text-xs text-orange-400" /> {user.badges?.length || 0} badges
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <h3 className="text-gray-900 font-extrabold text-lg mb-4 truncate flex items-center gap-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {user.name}
                </h3>
                
                <div className="space-y-3 text-sm text-gray-600 font-medium">
                  <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl">
                    <span className="flex items-center gap-2">
                       Levels Completed:
                    </span>
                    <span className="text-green-600 font-extrabold text-base">
                      {getUserLevel(user.completedLevels)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl">
                    <span className="flex items-center gap-2">
                      Member Since:
                    </span>
                    <span className="text-gray-500 font-bold">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                    <span>Progress</span>
                    <span className="text-green-600">{getProgressPercentage(user.completedLevels)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#a0cc5b] h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${getProgressPercentage(user.completedLevels)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-2 bg-[#f9faec] text-gray-600 font-bold px-6 py-3 rounded-2xl border border-gray-100 shadow-sm text-sm">
              Showing {filteredUsers.length} of {users.length} coders
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;