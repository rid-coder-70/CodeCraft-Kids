import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import {
  FaHeart, FaRegHeart, FaComments, FaTrashAlt,
  FaChevronLeft, FaChevronRight, FaSpinner
} from "react-icons/fa";
import { useToast } from "./Toast";

const avatarColor = (name = "") => {
  const colors = [
    "from-[#f4a261] to-[#e76f51]", "from-[#2a9d8f] to-[#264653]",
    "from-[#e9c46a] to-[#f4a261]", "from-[#a0cc5b] to-[#8ebb4a]",
  ];
  let sum = 0;
  for (let c of name) sum += c.charCodeAt(0);
  return colors[sum % colors.length];
};

const ACTIVITY_LABELS = {
  achievement: { label: "Performance", color: "bg-purple-100 text-purple-600 border border-purple-200" },
  question: { label: "Question", color: "bg-blue-100 text-blue-600 border border-blue-200" },
  tip: { label: "Coding Tip", color: "bg-yellow-100 text-yellow-600 border border-yellow-200" },
  milestone: { label: "Milestone", color: "bg-green-100 text-green-600 border border-green-200" },
};

const CommunityFeed = ({ refreshKey, onPostDeleted }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: null, postTitle: "" });
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(null); // stores postId being commented on
  const toast = useToast();

  useEffect(() => {
    fetchPosts();
    const token = localStorage.getItem("token");
    if (token) fetchCurrentUser(token);
  }, [refreshKey]);

  const fetchCurrentUser = async (token) => {
    try {
      const res = await axios.get(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setCurrentUser(res.data.user);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/community/posts?page=${page}&limit=5`);
      setPosts(res.data.posts || []);
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
      toast("Please login to like posts!", "info");
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE}/api/community/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(prev => prev.map(post =>
        post._id === postId
          ? { ...post, likes: res.data.likes, _likesCount: res.data.likesCount }
          : post
      ));
      if (res.data.liked) {
        setLikedPosts(prev => new Set([...prev, postId]));
      } else {
        setLikedPosts(prev => { const s = new Set(prev); s.delete(postId); return s; });
      }
    } catch (err) {
      console.error("Error liking post:", err);
      if (err.response?.status === 401) toast("Please login to like posts!", "error");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) { toast("Please login!", "error"); return; }
    try {
      const res = await axios.delete(
        `${API_BASE}/api/community/posts/${deleteModal.postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setPosts(prev => prev.filter(p => p._id !== deleteModal.postId));
        toast("Post deleted successfully", "success");
        if (onPostDeleted) onPostDeleted();
        setDeleteModal({ isOpen: false, postId: null, postTitle: "" });
      }
    } catch (err) {
      toast(err.response?.data?.message || "Failed to delete post. Try again!", "error");
      setDeleteModal({ isOpen: false, postId: null, postTitle: "" });
    }
  };

  const isPostAuthor = (post) =>
    currentUser && post.author?._id?.toString() === currentUser._id?.toString();

  const isLiked = (post) =>
    likedPosts.has(post._id) ||
    (currentUser && post.likes?.some?.(id => id.toString() === currentUser._id?.toString()));

  const getLikesCount = (post) =>
    post._likesCount !== undefined ? post._likesCount : (post.likes?.length || 0);

  const toggleComments = (postId) => {
    setExpandedComments(prev => {
      const s = new Set(prev);
      if (s.has(postId)) s.delete(postId);
      else s.add(postId);
      return s;
    });
  };

  const handleAddComment = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("Please login to comment!", "info");
      return;
    }
    if (!newComment.trim()) return;

    try {
      setSubmittingComment(postId);
      const res = await axios.post(
        `${API_BASE}/api/community/posts/${postId}/comment`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.success) {
        setPosts(prev => prev.map(p => 
          p._id === postId ? { ...p, comments: [...(p.comments || []), res.data.comment] } : p
        ));
        setNewComment("");
        toast("Comment added!", "success");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      toast("Failed to add comment", "error");
    } finally {
      setSubmittingComment(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <FaSpinner className="animate-spin text-3xl text-green-500 mb-4" />
        <p className="text-gray-500 font-bold">Loading community posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="text-5xl mb-4 text-gray-300 flex justify-center">📝</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>No posts yet!</h3>
        <p className="text-gray-500 font-medium">Be the first to share your coding journey!</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6 pb-12">
        {posts.map(post => {
          const activityInfo = ACTIVITY_LABELS[post.activityType] || ACTIVITY_LABELS.achievement;
          const liked = isLiked(post);
          return (
            <div
              key={post._id}
              className="relative bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 transition-all duration-300"
            >
              {isPostAuthor(post) && (
                <button
                  onClick={() => setDeleteModal({ isOpen: true, postId: post._id, postTitle: post.title })}
                  className="absolute top-4 right-4 p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                  title="Delete post"
                >
                  <FaTrashAlt />
                </button>
              )}
              <div className="flex items-center space-x-4 mb-4">
                {post.author?.profilePic ? (
                  <img
                    src={`${API_BASE}${post.author.profilePic}`}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColor(post.author?.name)} flex items-center justify-center text-white font-bold text-lg border border-gray-100`}>
                    {post.author?.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-gray-900 font-bold text-base" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>{post.author?.name || "Anonymous"}</h3>
                    {isPostAuthor(post) && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${activityInfo.color}`}>
                      {activityInfo.label}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">
                      {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    {post.levelCompleted && (
                      <span className="text-[10px] bg-yellow-50 text-yellow-600 border border-yellow-200 px-2 py-0.5 rounded-full font-bold uppercase">
                        Level {post.levelCompleted}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>{post.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line text-sm font-medium">{post.content}</p>

              {post.image && (
                <img
                  src={`${API_BASE}${post.image}`}
                  alt="Post"
                  className="w-full rounded-2xl mb-4 max-h-80 object-cover border border-gray-100"
                />
              )}

              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-sm font-bold border border-gray-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2 mb-4">
                <button
                  onClick={() => handleLike(post._id)}
                  className={`flex items-center gap-2 font-bold text-sm transition-all duration-300 ${liked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"}`}
                >
                  {liked ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
                  <span>{getLikesCount(post)} {getLikesCount(post) === 1 ? "Like" : "Likes"}</span>
                </button>
                <button
                  onClick={() => toggleComments(post._id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-green-500 font-bold text-sm transition-colors"
                >
                  <FaComments className="text-lg" />
                  <span>{post.comments?.length || 0} {post.comments?.length === 1 ? "Comment" : "Comments"}</span>
                </button>
              </div>

              {expandedComments.has(post._id) && (
                <div className="mt-4 pt-4 border-t border-gray-50 animate-fade-in">
                  <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {post.comments?.map((comment, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(comment.user?.name)} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                          {comment.user?.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-3 flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-gray-800">{comment.user?.name || "User"}</span>
                            <span className="text-[10px] text-gray-400">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just now"}</span>
                          </div>
                          <p className="text-sm text-gray-600 font-medium">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                    {(!post.comments || post.comments.length === 0) && (
                      <p className="text-center text-sm text-gray-400 font-medium py-2">No comments yet. Start the conversation!</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder={currentUser ? "Add a comment..." : "Login to comment"}
                      disabled={!currentUser}
                      value={submittingComment === post._id ? newComment : (submittingComment === null ? newComment : "")}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-green-400 transition-all font-medium disabled:opacity-50"
                      onKeyPress={(e) => { if (e.key === 'Enter') handleAddComment(post._id) }}
                    />
                    <button 
                      onClick={() => handleAddComment(post._id)}
                      disabled={!currentUser || !newComment.trim() || submittingComment !== null}
                      className="px-4 py-2 bg-[#a0cc5b] text-white rounded-xl text-sm font-bold hover:bg-[#8ebb4a] transition-colors disabled:opacity-50 shrink-0"
                    >
                      {submittingComment === post._id ? "..." : "Send"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => fetchPosts(currentPage - 1)}
              disabled={currentPage <= 1}
              className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold transition-all duration-300 hover:bg-gray-50 disabled:opacity-40 shadow-sm"
            >
              <FaChevronLeft className="text-sm" /> Prev
            </button>
            <span className="text-gray-500 font-bold text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => fetchPosts(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold transition-all duration-300 hover:bg-gray-50 disabled:opacity-40 shadow-sm"
            >
              Next <FaChevronRight className="text-sm" />
            </button>
          </div>
        )}
      </div>

      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Post?</h3>
            <p className="text-gray-500 text-sm font-medium mb-6">Are you sure you want to delete this? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, postId: null, postTitle: "" })}
                className="flex-1 py-2.5 bg-gray-50 text-gray-600 rounded-xl font-bold border border-gray-200 transition-all hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold transition-all hover:bg-red-600 shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityFeed;