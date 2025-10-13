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
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Glow accents */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl opacity-30"></div>

      <div
        ref={aboutRef}
        className={`relative z-10 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-8 md:p-12 w-full max-w-4xl transform transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0 scale-100 animate-floating" : "opacity-0 -translate-y-10 scale-95"
        }`}
      >
        {/* Logo/Brand */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center space-x-4 mb-6">
            {/* <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative h-16 w-16 bg-gray-900 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] border-2 border-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg">CCK</span>
              </div>
            </div> */}
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              CodeCraft Kids
            </h1>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
            About Our Mission
          </h2>
        </div>

        <div className="space-y-6 text-center">
          <p className="text-xl text-gray-300 leading-relaxed">
            🎉 <span className="font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">CodeCraft Kids</span>{" "}
            is an interactive platform designed to make learning programming fun
            and exciting for kids.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed">
            🚀 Our mission is to provide beginner-friendly coding lessons, games,
            and challenges to inspire the next generation of developers.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed">
            🧩 Join us and explore the world of coding with colorful challenges
            and playful learning!
          </p>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-lg text-gray-400">
              Building the future, one line of code at a time 💫
            </p>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
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
        `}
      </style>
    </div>
  );
}