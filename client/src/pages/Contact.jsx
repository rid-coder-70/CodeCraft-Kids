import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const formRef = useRef(null);
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

    if (formRef.current) observer.observe(formRef.current);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Glow accents */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl opacity-30"></div>

      <div
        ref={formRef}
        className={`relative z-10 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/10 p-8 md:p-12 w-full max-w-md transform transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0 scale-100 animate-floating" : "opacity-0 -translate-y-10 scale-95"
        }`}
      >
        {/* Logo/Brand */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center space-x-3 mb-4">
            
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              CodeCraft Kids
            </h2>
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
        </div>

        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
            />
          </div>

          <div>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300 resize-none"
            />
          </div>

          <button className="w-full relative px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden">
            <span className="relative z-10">Send Message</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}