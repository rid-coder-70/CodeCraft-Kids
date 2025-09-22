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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div
        ref={aboutRef}
        className={`bg-gradient-to-b from-gray-800 via-gray-900 to-black p-12 sm:p-16 md:p-20 lg:p-24 rounded-3xl shadow-2xl max-w-3xl w-full border border-gray-700 ${
          visible ? "fade-slide" : ""
        }`}
      >
        {/* Floating glowing circles */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-20 h-20 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl opacity-30 animate-pulse"></div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-cyan-400 mb-8">
          About Us
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl text-center leading-relaxed">
          🎉 <span className="text-pink-400 font-semibold">CodeCraft Kids</span>{" "}
          is an interactive platform designed to make learning programming fun
          and exciting for kids.
          <br />
          <br />
          🚀 Our mission is to provide beginner-friendly coding lessons, games,
          and challenges to inspire the next generation of developers.
          <br />
          <br />
          🧩 Join us and explore the world of coding with colorful challenges
          and playful learning!
        </p>
      </div>
    </div>
  );
}
