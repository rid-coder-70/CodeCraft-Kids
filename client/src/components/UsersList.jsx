import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center text-white py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading our amazing coders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Search coders by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <div className="text-6xl mb-4">👥</div>
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
                className="backdrop-blur-xl bg-gradient-to-br from-gray-900/60 via-purple-900/10 to-gray-900/60 rounded-2xl shadow-lg border border-white/10 p-6 hover:border-purple-400/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* User Avatar & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={user.profilePic ? `http://localhost:5000${user.profilePic}` : "/default-avatar.png"}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-2 border-purple-500/50 object-cover"
                  />
                  {user.badge && (
                    <img
                      src={`http://localhost:5000${user.badge}`}
                      alt="Achievement Badge"
                      className="w-8 h-8 rounded-full border border-yellow-400"
                    />
                  )}
                </div>

                {/* User Info */}
                <h3 className="text-white font-semibold text-lg mb-2 truncate">
                  {user.name}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Levels Completed:</span>
                    <span className="text-purple-400 font-semibold">
                      {user.completedLevels?.length || 0}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Member Since:</span>
                    <span className="text-gray-400">
                      {new Date(user.createdAt).getFullYear()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{Math.min((user.completedLevels?.length || 0) * 10, 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((user.completedLevels?.length || 0) * 10, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* View Profile Button */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    to={`/profile/${user._id}`}
                    className="block w-full text-center py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl font-semibold transition-all duration-300 hover:from-purple-500/30 hover:to-pink-500/30"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Users Count */}
          <div className="text-center mt-8 text-gray-400">
            Showing {filteredUsers.length} of {users.length} amazing coders! 🌟
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;