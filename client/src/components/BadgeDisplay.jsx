import React from "react";

const BadgeDisplay = ({ badges, size = "medium", showTooltip = true, maxDisplay = 5 }) => {
  if (!badges || badges.length === 0) {
    return (
      <div className="flex items-center text-gray-400 font-medium">
        <span className="text-sm">Start coding to earn badges!</span>
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
    <div className="flex flex-wrap gap-3 items-center">
      {displayedBadges.map((badge, index) => (
        <div key={index} className="relative group cursor-pointer">
          <div className={`
            ${sizeClasses[size]} 
            bg-[#f4a261] text-white
            rounded-full flex items-center justify-center 
            shadow-sm border-2 border-white
            transform transition-transform duration-300 
            hover:scale-105
          `}>
            <span className="font-bold">{badge.icon}</span>
          </div>
          
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="bg-white text-gray-800 text-xs rounded-xl py-2 px-3 shadow-md border border-gray-100 min-w-max">
                <div className="font-bold text-gray-900">{badge.name}</div>
                <div className="text-gray-500 font-medium mt-1">{badge.description}</div>
                <div className="text-green-600 font-bold text-[10px] mt-1 uppercase tracking-wider">
                  Level {badge.level} • {new Date(badge.earnedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className="relative group cursor-pointer">
          <div className={`
            ${sizeClasses[size]} 
            bg-gray-100 text-gray-600
            rounded-full flex items-center justify-center 
            shadow-sm border-2 border-white
            transform transition-transform duration-300 
            hover:scale-105
          `}>
            <span className="font-bold text-xs">+{remainingCount}</span>
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
             <div className="bg-white text-gray-800 text-xs rounded-xl py-2 px-3 shadow-md border border-gray-100 min-w-max">
              <div className="font-bold text-gray-900">{remainingCount} more badges</div>
              <div className="text-gray-500 font-medium text-[10px] mt-1 uppercase tracking-wider">Complete more levels!</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;