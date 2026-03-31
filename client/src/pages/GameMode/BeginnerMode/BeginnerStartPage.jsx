import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPython } from "react-icons/fa";

/**
 * BeginnerStartPage — now levels are served as proper React routes at /game/level/:id
 * This page simply redirects to the Dashboard where the level picker lives.
 */
export default function BeginnerStartPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect immediately to dashboard (beginner tab)
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  // Shown briefly during redirect
  return (
    <div className="min-h-screen bg-[#f9faec] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="text-5xl mb-4 animate-bounce text-green-500 w-fit mx-auto">
          <FaPython />
        </div>
        <p className="font-black text-gray-600" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
          Loading your adventure...
        </p>
      </motion.div>
    </div>
  );
}
