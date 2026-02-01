import { useEffect, useRef, useState } from "react";

export default function About() {
  const aboutRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-green-400 via-teal-500 to-blue-600" style={{ fontFamily: "'Comic Sans MS', 'Arial', sans-serif" }}>
      {/* Animated Background Elements - MAXIMUM ANIMATIONS! */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Huge amount of twinkling stars */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-200 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ⭐
          </div>
        ))}

        {/* Floating rockets */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`rocket-${i}`}
            className="absolute text-4xl animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            🚀
          </div>
        ))}

        {/* Bouncing animals EVERYWHERE */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`animal-${i}`}
            className="absolute text-5xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {['🐼', '😺', '🐻', '🦄', '🐨', '🦊', '🐸', '🐷', '🐵', '🐶', '🐹', '🦁', '🐰', '🐭', '🐯'][i]}
          </div>
        ))}

        {/* Spinning rainbows */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`rainbow-${i}`}
            className="absolute text-5xl animate-spin-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            🌈
          </div>
        ))}

        {/* Floating code symbols */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`code-${i}`}
            className="absolute text-white/20 font-mono font-bold text-3xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            {['</>', '{}', 'print()', 'def', 'for', 'if', '🐍', '💻', '⚡', '✨'][Math.floor(Math.random() * 10)]}
          </div>
        ))}

        {/* Glowing orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-2xl opacity-30 animate-pulse-slow"
            style={{
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 150 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 5)]} 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={aboutRef}
        className={`relative z-10 bg-white/98 backdrop-blur-xl rounded-[50px] shadow-[0_0_60px_rgba(34,197,94,0.9)] border-8 border-green-400 p-8 md:p-16 w-full max-w-5xl transform transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0 scale-100 rainbow-border-about" : "opacity-0 -translate-y-10 scale-95"
          }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,253,250,0.98) 100%)',
        }}
      >
        {/* Logo/Brand with MEGA Emojis */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl animate-spin-slow">💻</span>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              CodeCraft Kids
            </h1>
            <span className="text-7xl animate-spin-slow" style={{ animationDelay: '2s' }}>🎮</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-teal-600 mb-4 animate-bounce-slow">
            🌟 About Our Mission! 🌟
          </h2>
          <p className="text-2xl text-blue-600 font-bold">Making coding FUN for kids! 🚀</p>
        </div>

        {/* Super Cute Character Row */}
        <div className="flex justify-center gap-3 mb-10 text-6xl flex-wrap">
          <span className="animate-wiggle" style={{ animationDelay: '0s' }}>🐼</span>
          <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>😺</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.2s' }}>🐻</span>
          <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🦄</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.4s' }}>🐨</span>
          <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🦊</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.6s' }}>🐸</span>
        </div>

        {/* Content Cards with Animations */}
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-3xl p-8 border-4 border-green-400 transform hover:scale-105 transition-all shadow-lg animate-slide-in-left">
            <div className="flex items-start gap-4">
              <span className="text-6xl animate-bounce">🎉</span>
              <div>
                <h3 className="text-2xl font-black text-green-700 mb-3">What is CodeCraft Kids?</h3>
                <p className="text-xl text-teal-700 leading-relaxed font-bold">
                  We're an <span className="text-green-600">interactive platform</span> that makes learning to code
                  <span className="text-pink-600"> super fun</span> and <span className="text-blue-600">exciting</span> for kids!
                  No boring lectures - just <span className="text-purple-600">games</span> and <span className="text-orange-600">adventures</span>! 🎮
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl p-8 border-4 border-blue-400 transform hover:scale-105 transition-all shadow-lg animate-slide-in-right">
            <div className="flex items-start gap-4">
              <span className="text-6xl animate-wiggle">🚀</span>
              <div>
                <h3 className="text-2xl font-black text-blue-700 mb-3">Our Mission!</h3>
                <p className="text-xl text-indigo-700 leading-relaxed font-bold">
                  We want to inspire the <span className="text-purple-600">next generation of developers</span> by providing
                  <span className="text-pink-600"> beginner-friendly</span> coding lessons,
                  <span className="text-green-600"> awesome games</span>, and
                  <span className="text-orange-600"> fun challenges</span>! Every kid can code! 💪✨
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 border-4 border-purple-400 transform hover:scale-105 transition-all shadow-lg animate-slide-in-left">
            <div className="flex items-start gap-4">
              <span className="text-6xl animate-bounce-slow">🧩</span>
              <div>
                <h3 className="text-2xl font-black text-purple-700 mb-3">Join the Adventure!</h3>
                <p className="text-xl text-pink-700 leading-relaxed font-bold">
                  Explore the world of coding with <span className="text-blue-600">colorful challenges</span>,
                  <span className="text-green-600"> playful learning</span>, and
                  <span className="text-orange-600"> cute characters</span> that make every lesson an adventure!
                  Let's code together! 🌈🎨
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-400 transform hover:scale-105 transition-all shadow-lg animate-slide-in-right">
            <div className="flex items-start gap-4">
              <span className="text-6xl animate-spin-slow">🏆</span>
              <div>
                <h3 className="text-2xl font-black text-orange-700 mb-3">What You'll Learn!</h3>
                <p className="text-xl text-yellow-800 leading-relaxed font-bold">
                  <span className="text-green-600">🐍 Python programming</span> •
                  <span className="text-blue-600"> 🎮 Game development</span> •
                  <span className="text-purple-600"> 🎨 Creative coding</span> •
                  <span className="text-pink-600"> 🧩 Problem solving</span> •
                  <span className="text-teal-600"> 🌟 And so much more!</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Footer */}
        <div className="mt-12 pt-8 border-t-4 border-teal-300">
          <div className="text-center">
            <p className="text-3xl font-black text-blue-600 mb-4">
              Building the future, one line of code at a time! 💫
            </p>
            <div className="flex justify-center gap-3 text-5xl mb-6">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>🌈</span>
              <span className="animate-wiggle" style={{ animationDelay: '0.2s' }}>⭐</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎮</span>
              <span className="animate-wiggle" style={{ animationDelay: '0.6s' }}>💖</span>
              <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🚀</span>
              <span className="animate-wiggle" style={{ animationDelay: '1s' }}>⭐</span>
              <span className="animate-bounce" style={{ animationDelay: '1.2s' }}>🌈</span>
            </div>
            <p className="text-xl text-teal-600 font-bold">
              Join thousands of kids learning to code! 🎉
            </p>
          </div>
        </div>
      </div>

      {/* MEGA ANIMATIONS */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 8s ease-in-out infinite;
          }
          
          @keyframes wiggle {
            0%, 100% { transform: rotate(-8deg); }
            50% { transform: rotate(8deg); }
          }
          .animate-wiggle {
            animation: wiggle 1s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-40px) rotate(15deg); }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          
          @keyframes float-up {
            from { transform: translateY(100vh) rotate(0deg); }
            to { transform: translateY(-100px) rotate(360deg); }
          }
          .animate-float-up {
            animation: float-up 10s linear infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(2); }
          }
          .animate-twinkle {
            animation: twinkle 2s ease-in-out infinite;
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.15); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2.5s ease-in-out infinite;
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 15s linear infinite;
          }
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          
          @keyframes slide-in-left {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in-left {
            animation: slide-in-left 1s ease-out;
          }
          
          @keyframes slide-in-right {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in-right {
            animation: slide-in-right 1s ease-out;
          }
          
          @keyframes rainbow-border-about {
            0% { border-color: #10b981; }
            16% { border-color: #06b6d4; }
            33% { border-color: #3b82f6; }
            50% { border-color: #8b5cf6; }
            66% { border-color: #ec4899; }
            83% { border-color: #f59e0b; }
            100% { border-color: #10b981; }
          }
          .rainbow-border-about {
            animation: rainbow-border-about 5s linear infinite;
          }
        `}
      </style>
    </div>
  );
}