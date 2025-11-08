import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate user level based on completed levels
  const getUserLevel = (completedLevels) => {
    return completedLevels?.length || 0;
  };

  // Get highest badge icon from badges array
  const getHighestBadge = (badges) => {
    if (!badges || badges.length === 0) return <FaStar className="text-yellow-400" />;
    const highestLevelBadge = badges.reduce((highest, current) => 
      (current.level > highest.level) ? current : highest
    );
    return highestLevelBadge.icon || <FaStar className="text-yellow-400" />;
  };

  // Calculate progress percentage
  const getProgressPercentage = (completedLevels) => {
    const levelCount = completedLevels?.length || 0;
    return Math.min(levelCount * 10, 100);
  };

  // Get current badge display
  const getCurrentBadge = (user) => {
    if (user.currentBadge) return user.currentBadge;
    if (user.badges && user.badges.length > 0) {
      return getHighestBadge(user.badges);
    }
    return <FaStar className="text-yellow-400" />;
  };

  if (loading) {
    return (
      <div className="text-center text-white py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading our amazing coders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <MdGroups className="text-purple-400" /> Code Warriors Community
        </h1>
        <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
          <FaUsers className="text-gray-500" />
          Connect with fellow programmers and track your coding journey together
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search coders by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300 backdrop-blur-sm"
          />
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <div className="text-6xl mb-4 flex justify-center">
            <MdEmojiPeople className="text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No users found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      ) : (
        <>
          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="backdrop-blur-xl bg-gradient-to-br from-gray-900/60 via-purple-900/10 to-gray-900/60 rounded-2xl shadow-lg border border-white/10 p-6 hover:border-purple-400/30 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                {/* User Avatar & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <img
                      src={user.profilePic ? `http://localhost:5000${user.profilePic}` : "/default-avatar.png"}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border-2 border-purple-500/50 object-cover group-hover:border-purple-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-1 border border-purple-500/50">
                      <span className="text-lg text-yellow-400">
                        {getCurrentBadge(user)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl mb-1 text-yellow-400">
                      {getHighestBadge(user.badges)}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <FaAward className="text-xs" /> {user.badges?.length || 0} badges
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <h3 className="text-white font-semibold text-lg mb-2 truncate flex items-center gap-2">
                  <FaUser className="text-purple-400 text-sm" /> {user.name}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <GiRank3 className="text-purple-400" /> Levels Completed:
                    </span>
                    <span className="text-purple-400 font-semibold">
                      {getUserLevel(user.completedLevels)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <FaTrophy className="text-yellow-400" /> Badges Earned:
                    </span>
                    <span className="text-yellow-400 font-semibold">
                      {user.badges?.length || 0}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-gray-400" /> Member Since:
                    </span>
                    <span className="text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span className="flex items-center gap-1">
                      <IoSpeedometer className="text-green-400" /> Progress
                    </span>
                    <span>{getProgressPercentage(user.completedLevels)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${getProgressPercentage(user.completedLevels)}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* View Profile Button */}
                {/* <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    to={`/profile/${user._id}`}
                    className="block w-full text-center py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl font-semibold transition-all duration-300 hover:from-purple-500/30 hover:to-pink-500/30 hover:text-white flex items-center justify-center gap-2"
                  >
                    <FaUser /> View Profile
                  </Link>
                </div> */}
              </div>
            ))}
          </div>

          {/* Users Count */}
          <div className="text-center mt-8 text-gray-400">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 px-6 py-3 rounded-2xl border border-white/10">
              <FaStar className="text-purple-400" />
              Showing {filteredUsers.length} of {users.length} amazing coders!
              <FaRocket className="text-purple-400" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;