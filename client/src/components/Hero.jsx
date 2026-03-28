import { Link } from "react-router-dom";
import { FaUserAlt, FaStar, FaPuzzlePiece } from "react-icons/fa";
import { MdViewModule } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import CommunityFeed from "./CommunityFeed";

export default function Hero() {
  return (
    <div className="bg-white min-h-[calc(100vh-6rem)] font-sans text-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content Area */}
          <div className="flex-1 lg:max-w-xl text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 tracking-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}>
              Digital playground where<br />
              education meets<br />
              imagination
            </h1>
            <p className="text-gray-500 text-lg lg:text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
              CodeCraft's the name, it's time for some fun. <br className="hidden lg:block"/>
              Learning and giggles, for everyone!
            </p>
            <div className="pt-4">
              <Link
                to="/signup"
                className="inline-block px-8 py-3 bg-[#a0cc5b] hover:bg-[#8ebb4a] text-white font-bold rounded-xl text-lg transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Content Area (Illustration placeholder) */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              {/* Approximated Kids Illustration from the Screenshot using HTML/CSS/Emojis */}
              <div className="absolute top-10 left-20 w-32 h-20 bg-blue-100 rounded-full blur-sm opacity-60"></div>
              <div className="absolute top-4 right-16 text-yellow-300 text-6xl drop-shadow-md">☀️</div>
              <div className="absolute top-12 left-12 text-blue-300 text-6xl drop-shadow-md">☁️</div>
              <div className="absolute top-24 right-24 text-blue-200 text-5xl drop-shadow-md">☁️</div>

              <div className="flex items-end gap-10 mt-20">
                {/* Girl */}
                <div className="text-9xl transform hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-xl"
                  title="Girl coding!">👧</div>
                {/* Boy */}
                <div className="text-9xl transform hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-xl"
                  title="Boy coding!">👦</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Section */}
        <div className="mt-24 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left mx-auto max-w-4xl">
          {/* Card 1 */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-gray-100 transition-colors bg-white hover:shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-xl shrink-0">
              <FaUserAlt />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg">6-15</div>
              <div className="text-sm text-gray-500 font-medium">range of the user's age</div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-gray-100 transition-colors bg-white hover:shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center text-2xl shrink-0">
              <MdViewModule />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg">5</div>
              <div className="text-sm text-gray-500 font-medium">Core features</div>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-gray-100 transition-colors bg-white hover:shadow-sm">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center text-xl shrink-0">
              <BsBoxSeam />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg">4</div>
              <div className="text-sm text-gray-500 font-medium">Microservices</div>
            </div>
          </div>
        </div>

        {/* Community Highlights Section (New) */}
        <div className="mt-32 pt-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Community Highlights
            </h2>
            <p className="text-gray-500 font-medium max-w-lg mx-auto">
              See what other young creators are building and sharing in our global digital playground!
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <CommunityFeed />
          </div>
        </div>
      </main>
    </div>
  );
}