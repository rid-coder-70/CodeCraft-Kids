import React, { useState } from "react";
import axios from "axios";

const CreatePost = ({ onPostCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    activityType: "achievement",
    tags: "",
    levelCompleted: "",
    isPublic: true,
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("content", formData.content);
      submitData.append("activityType", formData.activityType);
      submitData.append("tags", JSON.stringify(formData.tags.split(',').map(tag => tag.trim())));
      submitData.append("levelCompleted", formData.levelCompleted);
      submitData.append("isPublic", formData.isPublic);
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      await axios.post(
        "http://localhost:5000/api/community/posts",
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({
        title: "",
        content: "",
        activityType: "achievement",
        tags: "",
        levelCompleted: "",
        isPublic: true,
        image: null
      });
      setIsOpen(false);
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/30 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]"
      >
        + Create Post
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 via-purple-900/30 to-gray-900/90 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Share Your Achievement
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              
              <textarea
                placeholder="What did you accomplish? Share your coding journey..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                required
              />

              <select
                value={formData.activityType}
                onChange={(e) => setFormData({...formData, activityType: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl bg-gray-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="achievement">🎉 Achievement</option>
                <option value="project">💻 Project</option>
                <option value="question">❓ Question</option>
                <option value="tip">💡 Tip</option>
                <option value="milestone">🏆 Milestone</option>
              </select>

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <input
                type="number"
                placeholder="Level Completed (optional)"
                value={formData.levelCompleted}
                onChange={(e) => setFormData({...formData, levelCompleted: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                className="w-full px-4 py-3 rounded-2xl bg-gray-800/50 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  className="rounded focus:ring-purple-400"
                />
                <label htmlFor="isPublic" className="text-gray-300">
                  Make this post public
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? "Posting..." : "Share with Community"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 bg-gray-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;