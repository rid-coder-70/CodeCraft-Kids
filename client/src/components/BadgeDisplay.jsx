import React from "react";

const BadgeDisplay = ({ badges, size = "medium", showTooltip = true, maxDisplay = 5 }) => {
  if (!badges || badges.length === 0) {
    return (
      <div className="flex items-center text-gray-400">
        <span className="text-sm">🌟 Start coding to earn badges!</span>
      </div>
    );
  }

  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    medium: "w-12 h-12 text-lg",
    large: "w-16 h-16 text-xl",
    xlarge: "w-20 h-20 text-2xl"
  };

  const displayedBadges = maxDisplay ? badges.slice(-maxDisplay).reverse() : badges.reverse();
  const remainingCount = maxDisplay ? badges.length - maxDisplay : 0;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayedBadges.map((badge, index) => (
        <div key={index} className="relative group">
          <div className={`
            ${sizeClasses[size]} 
            bg-gradient-to-br from-yellow-400 to-orange-500 
            rounded-full flex items-center justify-center 
            shadow-lg border-2 border-yellow-300
            transform transition-all duration-300 
            hover:scale-110 hover:rotate-12 hover:shadow-xl
          `}>
            <span className="font-bold">{badge.icon}</span>
          </div>
          
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-white/10 backdrop-blur-sm min-w-max">
                <div className="font-semibold text-yellow-300">{badge.name}</div>
                <div className="text-gray-300 mt-1">{badge.description}</div>
                <div className="text-gray-400 text-xs mt-1">
                  Level {badge.level} • {new Date(badge.earnedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className="relative group">
          <div className={`
            ${sizeClasses[size]} 
            bg-gradient-to-br from-purple-500 to-pink-500 
            rounded-full flex items-center justify-center 
            shadow-lg border-2 border-purple-300
            transform transition-all duration-300 
            hover:scale-110
          `}>
            <span className="font-bold text-white">+{remainingCount}</span>
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-white/10 backdrop-blur-sm">
              <div className="font-semibold">{remainingCount} more badges</div>
              <div className="text-gray-300 text-xs mt-1">Complete more levels!</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;