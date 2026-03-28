import { FaRocket, FaGamepad, FaCode, FaPuzzlePiece, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: <FaRocket className="text-4xl text-green-500 mb-4" />,
    title: "Our Mission",
    content: "We want to inspire the next generation of developers by providing beginner-friendly coding lessons, awesome games, and fun challenges! Every kid can code! 💪✨",
  },
  {
    icon: <FaPuzzlePiece className="text-4xl text-blue-500 mb-4" />,
    title: "Join the Adventure!",
    content: "Explore the world of coding with colorful challenges, playful learning, and cute characters that make every lesson an adventure! Let's code together! 🌈🎨",
  },
  {
    icon: <FaCode className="text-4xl text-purple-500 mb-4" />,
    title: "What You'll Learn!",
    content: "Master Python programming, build games, solve problems, and unlock your creative coding potential through fun interactive tasks.",
  }
];

export default function About() {
  return (
    <div className="bg-white min-h-[calc(100vh-6rem)] font-sans text-gray-800 py-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            About CodeCraft Kids
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            We're an interactive platform that makes learning to code super fun and exciting for kids! No boring lectures — just games and adventures!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.06)] transition-shadow">
              <div className="flex flex-col items-center text-center">
                {f.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {f.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center pt-10 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-8" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Building the future, one line of code at a time!
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-[#a0cc5b] hover:bg-[#8ebb4a] text-white font-bold rounded-xl transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              <FaRocket /> Join Now!
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold rounded-xl transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              <FaGraduationCap /> Already a Coder? Login!
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}