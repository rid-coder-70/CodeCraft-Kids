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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 px-4 overflow-hidden">
      {/* Contact Form */}
      <div
        ref={formRef}
        className={`bg-gray-900/90 p-10 sm:p-14 md:p-16 lg:p-20 rounded-3xl shadow-2xl max-w-3xl w-full border-2 border-gray-700 
        ${visible ? "fade-slide" : "fade-slide-hidden"}`}
      >
        {/* Floating glowing circles */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl opacity-30 animate-pulse"></div>
  
      <div className="absolute top-0 left-0 w-20 h-20 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl opacity-30 animate-pulse"></div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-400 mb-8 drop-shadow-lg">
          Contact Us
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 transition"
          />
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 transition"
          />
          <button className="w-full bg-green-400 hover:bg-green-500 text-gray-900 py-3 rounded-2xl font-bold shadow-lg transition-transform transform hover:scale-105 text-base sm:text-lg">
            Send Message
          </button>
        </form>
      </div>

      <style>
        {`
          .fade-slide-hidden {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          .fade-slide {
            opacity: 1;
            transform: translateY(0) scale(1);
            transition: all 0.9s ease-out;
          }
        `}
      </style>
    </div>
  );
}
