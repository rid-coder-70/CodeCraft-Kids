import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGem } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

const BADGE_COLORS = [
  "from-yellow-400 to-orange-400",
  "from-purple-400 to-purple-600",
  "from-green-400 to-green-600",
  "from-blue-400 to-blue-600",
  "from-pink-400 to-pink-600",
  "from-sky-400 to-sky-600",
  "from-amber-400 to-red-400",
  "from-teal-400 to-teal-600",
  "from-indigo-400 to-indigo-600",
  "from-lime-400 to-lime-600",
];

const BadgeDisplay = ({ badges, size = "medium", showTooltip = true, maxDisplay = 5 }) => {
  if (!badges || badges.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="text-4xl opacity-30 text-yellow-500"><FaIcons.FaMedal /></div>
        <p className="text-gray-400 font-semibold text-sm">Start coding to earn badges!</p>
      </div>
    );
  }

  const sizeConfig = {
    small:  { outer: "w-9 h-9",  text: "text-base", ring: "ring-2" },
    medium: { outer: "w-14 h-14", text: "text-xl",   ring: "ring-2" },
    large:  { outer: "w-20 h-20", text: "text-3xl",  ring: "ring-4" },
    xlarge: { outer: "w-24 h-24", text: "text-4xl",  ring: "ring-4" },
  };
  const cfg = sizeConfig[size] || sizeConfig.medium;

  const displayedBadges = maxDisplay != null ? badges.slice(-maxDisplay).reverse() : [...badges].reverse();
  const remainingCount = maxDisplay != null ? Math.max(0, badges.length - maxDisplay) : 0;

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <AnimatePresence>
        {displayedBadges.map((badge, index) => {
          const gradient = BADGE_COLORS[((badge.level || 1) - 1) % BADGE_COLORS.length];
          const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
          const isEmoji = emojiRegex.test(badge.icon);
          const IconComp = !isEmoji && badge.icon && FaIcons[badge.icon] ? FaIcons[badge.icon] : null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: index * 0.06, type: "spring", stiffness: 200, damping: 15 }}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`} />

              <motion.div
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`relative ${cfg.outer} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md ${cfg.ring} ring-white border border-white/20`}
              >
                <span className={`${cfg.text} ${IconComp ? 'text-white' : ''}`}>
                  {IconComp ? <IconComp /> : badge.icon}
                </span>
              </motion.div>

              {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-30 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white text-gray-800 text-sm rounded-2xl py-3 px-4 shadow-xl border border-gray-100 min-w-max max-w-[180px]"
                  >
                    <div className="font-black text-gray-900 text-sm">{badge.name}</div>
                    <div className="text-gray-400 font-semibold mt-0.5 leading-snug">{badge.description}</div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                      <span className="text-green-600 font-black text-[10px] uppercase tracking-wider">Level {badge.level}</span>
                      <span className="text-blue-500 font-black text-[10px] flex items-center gap-0.5">
                        <FaGem className="text-[8px]" /> +50 Gems
                      </span>
                    </div>
                    <div className="text-gray-300 text-[9px] font-bold mt-1">
                      {new Date(badge.earnedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-gray-100 rotate-45 -translate-y-1.5" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          );
        })}
        {remainingCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`${cfg.outer} rounded-full bg-gray-100 flex items-center justify-center shadow-sm ring-2 ring-white border border-gray-200`}
            >
              <span className="font-black text-gray-500 text-sm">+{remainingCount}</span>
            </motion.div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
              <div className="bg-white text-gray-700 text-sm rounded-xl py-2 px-3 shadow-lg border border-gray-100 min-w-max font-bold">
                {remainingCount} more badge{remainingCount > 1 ? "s" : ""} earned!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BadgeDisplay;