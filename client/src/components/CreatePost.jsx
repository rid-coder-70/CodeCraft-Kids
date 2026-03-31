import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import {
  FaPlus, FaTimes, FaPaperPlane, FaImage,
  FaTag, FaGamepad, FaSpinner
} from "react-icons/fa";
import { useToast } from "./Toast";

const ACTIVITY_OPTIONS = [
  { value: "achievement", label: "Performance" },
  { value: "question", label: "Question" },
  { value: "tip", label: "Coding Tip" },
  { value: "milestone", label: "Milestone" },
];

const CreatePost = ({ onPostCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "", content: "", activityType: "achievement",
    tags: "", levelCompleted: "", isPublic: true, image: null
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", activityType: "achievement", tags: "", levelCompleted: "", isPublic: true, image: null });
    setImagePreview(null);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast("Please fill in title and content!", "info");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const submitData = new FormData();
      submitData.append("title", formData.title.trim());
      submitData.append("content", formData.content.trim());
      submitData.append("activityType", formData.activityType);
      submitData.append("tags", JSON.stringify(
        formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      ));
      submitData.append("levelCompleted", formData.levelCompleted);
      submitData.append("isPublic", formData.isPublic);
      if (formData.image) submitData.append("image", formData.image);

      await axios.post(`${API_BASE}/api/community/posts`, submitData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      toast("Post shared with the community!", "success");
      resetForm();
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error("Error creating post:", err);
      toast("Couldn't share your post. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-5 py-4 rounded-2xl bg-[#a0cc5b] hover:bg-[#8ebb4a] text-white font-bold shadow-lg transition-transform hover:scale-105"
        title="Create a new post"
      >
        <FaPlus className="text-xl" />
        <span className="hidden sm:block">Share Post</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
                Create Post
              </h2>
              <button
                onClick={resetForm}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-gray-600 font-bold text-sm mb-1.5 uppercase tracking-wide">Post Title</label>
                <input
                  type="text"
                  placeholder="What's your achievement called?"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm font-medium transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-bold text-sm mb-1.5 uppercase tracking-wide">Your Story</label>
                <textarea
                  placeholder="Tell us about your coding adventure! What did you learn?"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 resize-none text-sm font-medium transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-bold text-sm mb-1.5 uppercase tracking-wide">Post Type</label>
                <select
                  value={formData.activityType}
                  onChange={(e) => setFormData({...formData, activityType: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm font-bold transition-colors"
                >
                  {ACTIVITY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold text-sm mb-1.5 uppercase tracking-wide flex items-center gap-1">
                    <FaTag /> Tags
                  </label>
                  <input
                    type="text"
                    placeholder="python, loops..."
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm font-medium transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold text-sm mb-1.5 uppercase tracking-wide flex items-center gap-1">
                    <FaGamepad /> Level #
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 3"
                    min="1"
                    max="10"
                    value={formData.levelCompleted}
                    onChange={(e) => setFormData({...formData, levelCompleted: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm font-medium transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold text-sm mb-1.5 uppercase tracking-wide flex items-center gap-1">
                  <FaImage /> Add Image
                </label>
                <label className="cursor-pointer block">
                  <div className="w-full py-4 px-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-center text-gray-500 hover:border-green-400 hover:bg-green-50 hover:text-green-600 transition-colors text-sm font-bold">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
                    ) : (
                      <span>Click to upload image</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <input
                  type="checkbox"
                  id="isPublicCP"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                />
                <label htmlFor="isPublicCP" className="text-gray-600 font-bold text-sm cursor-pointer select-none">
                  Make this post public
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 bg-white text-gray-700 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#a0cc5b] text-white rounded-xl font-bold hover:bg-[#8ebb4a] transition-colors disabled:opacity-50 text-sm shadow-sm"
                >
                  {loading
                    ? <><FaSpinner className="animate-spin" /> Sharing...</>
                    : <><FaPaperPlane /> Share Post</>
                  }
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