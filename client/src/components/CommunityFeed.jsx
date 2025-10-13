import React, { useState, useEffect } from "react";
import axios from "axios";

const CommunityFeed = ({ refreshKey, onPostDeleted }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: null, postTitle: "" });

  useEffect(() => {
    fetchPosts();
    // Get current user info
    const token = localStorage.getItem("token");
    if (token) {
      fetchCurrentUser(token);
    }
  }, [refreshKey]);

  const fetchCurrentUser = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCurrentUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/community/posts?page=${page}&limit=5`);
      setPosts(res.data.posts);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to like posts!");
      return;
    }
    
    try {
      const res = await axios.post(
        `http://localhost:5000/api/community/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, likes: res.data.likesCount } 
          : post
      ));
    } catch (err) {
      console.error("Error liking post:", err);
      if (err.response?.status === 401) {
        alert("Please login to like posts!");
      }
    }
  };

  const openDeleteModal = (postId, postTitle) => {
    setDeleteModal({ isOpen: true, postId, postTitle });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, postId: null, postTitle: "" });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to delete posts!");
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/community/posts/${deleteModal.postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        // Remove post from local state
        setPosts(posts.filter(post => post._id !== deleteModal.postId));
        
        // Show success message
        alert("Post deleted successfully!");
        
        // Notify parent component
        if (onPostDeleted) {
          onPostDeleted();
        }
        
        closeDeleteModal();
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete post. Please try again.");
      }
      closeDeleteModal();
    }
  };

  const isPostAuthor = (post) => {
    return currentUser && post.author._id === currentUser._id;
  };

  if (loading) {
    return (
      <div className="text-center text-white py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading community posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
        <p>Be the first to share your coding journey!</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.map(post => (
          <div key={post._id} className="backdrop-blur-xl bg-gradient-to-br from-gray-900/60 via-purple-900/10 to-gray-900/60 rounded-3xl shadow-xl shadow-purple-500/5 border border-white/10 p-6 hover:border-white/20 transition-all duration-300 relative">
            
            {/* Delete Button (only for post author) */}
            {isPostAuthor(post) && (
              <button
                onClick={() => openDeleteModal(post._id, post.title)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors duration-300 group"
                title="Delete post"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}

            {/* Post Header */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={post.author.profilePic ? `http://localhost:5000${post.author.profilePic}` : "/default-avatar.png"}
                alt={post.author.name}
                className="w-12 h-12 rounded-full border-2 border-purple-500/50 object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-white font-semibold">{post.author.name}</h3>
                  {isPostAuthor(post) && (
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()} • {post.activityType}
                  {post.levelCompleted && ` • Level ${post.levelCompleted}`}
                </p>
              </div>
              {post.author.badge && (
                <img
                  src={`http://localhost:5000${post.author.badge}`}
                  alt="Badge"
                  className="w-8 h-8"
                />
              )}
            </div>

            {/* Post Content */}
            <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
            <p className="text-gray-300 mb-4 whitespace-pre-line">{post.content}</p>

            {/* Post Image */}
            {post.image && (
              <img
                src={`http://localhost:5000${post.image}`}
                alt="Post"
                className="w-full rounded-2xl mb-4 max-h-96 object-cover"
              />
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors duration-300"
              >
                <span className="text-lg">❤️</span>
                <span>{post.likes?.length || 0} Likes</span>
              </button>
              <span className="text-gray-400">
                {post.comments?.length || 0} Comments
              </span>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-4 mt-8">
            {currentPage > 1 && (
              <button
                onClick={() => fetchPosts(currentPage - 1)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={() => fetchPosts(currentPage + 1)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 via-purple-900/30 to-gray-900/90 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Delete Post</h3>
            <p className="text-gray-300 mb-2">
              Are you sure you want to delete this post?
            </p>
            <p className="text-gray-400 text-sm mb-6">
              "{deleteModal.postTitle}"
            </p>
            <p className="text-red-400 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="flex-1 py-3 bg-gray-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityFeed;