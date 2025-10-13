import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PythonIntro() {
  const [step, setStep] = useState(0);
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const handleNext = () => setStep((prev) => prev + 1);

  const handleNextWithoutOutput = () => {
    setOutput("");
    setStep((prev) => prev + 1);
  };

  const runCode = (message) => {
    setOutput(message);
  };

  return (
    <div className="relative w-full rounded-3xl shadow-2xl shadow-purple-500/10 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 border border-white/10 flex items-center justify-center animate-floating">
      <div className="text-white p-8 rounded-3xl w-full max-w-4xl text-center">
        
        {/* Step 0: Story */}
        {step === 0 && (
          <>
            <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ✨ Welcome, Adventurer!
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              You just found a magical computer in the CodeCraft world. To unlock it, you must teach it to talk!
            </p>
            <button
              onClick={handleNext}
              className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Got it! 🚀</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <>
            <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              💡 First Lesson
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Python can make your computer talk with the <code className="bg-gray-800/50 px-2 py-1 rounded-lg border border-white/10">print()</code> command.
            </p>
            <button
              onClick={handleNext}
              className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Let's See Example ✨</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📖 Example</h1>
            <div className="backdrop-blur-xl bg-gray-800/70 p-6 rounded-2xl border border-white/10 shadow-lg mb-6 text-left relative">
              <pre className="text-lg font-mono text-gray-200">{`print("Hello,\\nWelcome to CodeCraft!")`}</pre>
              <button
                onClick={() => runCode("Hello,\nWelcome to CodeCraft!")}
                className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Run ▶
              </button>
            </div>
            {output && (
              <div className="mt-4 backdrop-blur-xl bg-white/90 p-6 rounded-2xl border border-white/20 shadow-lg w-full text-left text-black">
                <strong className="text-gray-800">Output:</strong>
                <pre className="text-gray-700 mt-2">{output}</pre>
              </div>
            )}
            <button
              onClick={handleNextWithoutOutput}
              className="mt-6 relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Next Step ➡</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📖 Try Input!</h1>
            <div className="backdrop-blur-xl bg-gray-800/70 p-6 rounded-2xl border border-white/10 shadow-lg mb-4 text-left">
              <div className="flex items-center gap-2 font-mono text-lg">
                <span className="text-gray-300">print("</span>
                <input
                  type="text"
                  placeholder="What do you want to hear from computer?"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 bg-gray-700/50 border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                />
                <span className="text-gray-300">")</span>
              </div>
            </div>
            <div className="flex gap-4 mb-6 justify-center">
              <button
                onClick={() => {
                  setOutput(userInput);
                  setUserInput("");
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Run ▶
              </button>
              <button
                onClick={() => {
                  setOutput("");
                  setUserInput("");
                }}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Clear
              </button>
            </div>
            {output && (
              <div className="mt-4 backdrop-blur-xl bg-white/90 p-6 rounded-2xl border border-white/20 shadow-lg w-full text-left text-black">
                <strong className="text-gray-800">Output:</strong>
                <pre className="text-gray-700 mt-2">{output}</pre>
              </div>
            )}
            <button
              onClick={handleNextWithoutOutput}
              className="mt-6 relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Next Step ➡</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">💡 Learn Variables!</h1>
            <p className="text-lg text-gray-300 mb-6">
              In Python, you can store a value in a <strong className="text-purple-300">variable</strong> and use it later.
            </p>
            <div className="backdrop-blur-xl bg-gray-800/70 p-6 rounded-2xl border border-white/10 shadow-lg mb-4 text-left">
              <div className="flex items-center gap-2 font-mono text-lg">
                <span className="text-gray-300">name = "</span>
                <input
                  type="text"
                  placeholder="Type your name..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 bg-gray-700/50 border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                />
                <span className="text-gray-300">"</span>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-gray-800/70 p-6 rounded-2xl border border-white/10 shadow-lg mb-4 text-left">
              <pre className="text-lg font-mono text-gray-200">{`print("Hello, " + name + "!")`}</pre>
            </div>
            <div className="flex gap-4 mb-6 justify-center">
              <button
                onClick={() => setOutput(`Hello, ${userInput}!`)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Run ▶
              </button>
              <button
                onClick={() => {
                  setOutput("");
                  setUserInput("");
                }}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Clear
              </button>
            </div>
            {output && (
              <div className="mt-4 backdrop-blur-xl bg-white/90 p-6 rounded-2xl border border-white/20 shadow-lg w-full text-left text-black">
                <strong className="text-gray-800">Output:</strong>
                <pre className="text-gray-700 mt-2">{output}</pre>
              </div>
            )}
            <button
              onClick={handleNextWithoutOutput}
              className="mt-6 relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Next Step ➡</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📖 Simple Math Example</h1>
            <div className="backdrop-blur-xl bg-gray-800/70 p-6 rounded-2xl border border-white/10 shadow-lg mb-6 text-left relative">
              <pre className="text-lg font-mono text-gray-200">{`x = 2\ny = 3\nprint(x + y)`}</pre>
              <button
                onClick={() =>
                  runCode("5\n\nUsed '+' for Addition.\nNext, try '-', '*', '/'")
                }
                className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Run ▶
              </button>
            </div>
            {output && (
              <div className="mt-4 backdrop-blur-xl bg-white/90 p-6 rounded-2xl border border-white/20 shadow-lg w-full text-left text-black">
                <strong className="text-gray-800">Output:</strong>
                <pre className="text-gray-700 mt-2">{output}</pre>
              </div>
            )}
            <button
              onClick={handleNextWithoutOutput}
              className="mt-6 relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Next Step ➡</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </>
        )}

        {/* Step 6 (Final) */}
        {step === 6 && (
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎉 Congrats! You finished all 6 games!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              You've unlocked the magic of Python basics 🚀
            </p>
            <button
              onClick={() => navigate("/login")}
              className="relative px-12 py-6 text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] group overflow-hidden"
            >
              <span className="relative z-10">Try More Challenges 🚀</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
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