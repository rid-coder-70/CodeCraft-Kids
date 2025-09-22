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
    <div className="relative w-full rounded-3xl shadow-2xl bg-gray-800 flex items-center justify-center">
      <div className="text-white p-8 rounded-3xl w-4/5 max-w-3xl text-center">
        
        {/* Step 0: Story */}
        {step === 0 && (
          <>
            <h1 className="text-3xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
              ✨ Welcome, Adventurer!
            </h1>
            <p className="text-lg mb-6">
              You just found a magical computer in the CodeCraft world. To unlock it, you must teach it to talk!
            </p>
            <button
              onClick={handleNext}
              className="bg-emerald-400 hover:bg-emerald-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
            >
              Got it! 🚀
            </button>
          </>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <>
            <h1 className="text-3xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
              💡 First Lesson
            </h1>
            <p className="text-lg mb-6">
              Python can make your computer talk with the <code>print()</code> command.
            </p>
            <button
              onClick={handleNext}
              className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
            >
              Let’s See Example ✨
            </button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-4">📖 Example</h1>
            <div className="bg-gray-900 text-white p-4 rounded-xl w-full text-left relative mb-4">
              <pre>{`print("Hello,\\nWelcome to CodeCraft!")`}</pre>
              <button
                onClick={() => runCode("Hello,\nWelcome to CodeCraft!")}
                className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm"
              >
                Run ▶
              </button>
            </div>
            {output && (
              <div className="mt-2 bg-white/70 backdrop-blur-sm p-4 rounded-xl w-full text-left text-black">
                <strong>Output:</strong>
                <pre>{output}</pre>
              </div>
            )}
            <button
              onClick={handleNextWithoutOutput}
              className="mt-4 bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
            >
              Next Step ➡
            </button>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold mb-4">📖 Try Input!</h1>
            <div className="bg-gray-900 text-white p-4 rounded-xl w-full text-left mb-2 flex items-center gap-1">
              <span>print("</span>
              <input
                type="text"
                placeholder="What do you want to hear from computer?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-gray-800 text-white px-2 py-1 rounded focus:outline-none"
              />
              <span>")</span>
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => {
                  setOutput(userInput);
                  setUserInput("");
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold transition transform hover:-translate-y-1 hover:scale-105"
              >
                Run ▶
              </button>
              <button
                onClick={() => {
                  setOutput("");
                  setUserInput("");
                }}
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold transition transform hover:-translate-y-1 hover:scale-105"
              >
                Clear
              </button>
            </div>
            {output && (
              <div className="mt-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl w-full text-left text-black">
                <strong>Output:</strong>
                <pre>{output}</pre>
              </div>
            )}
            <button
              onClick={handleNextWithoutOutput}
              className="mt-4 bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
            >
              Next Step ➡
            </button>
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <h1 className="text-2xl font-bold mb-4">💡 Learn Variables!</h1>
            <p className="mb-4">
              In Python, you can store a value in a <strong>variable</strong> and use it later.
            </p>
            <div className="bg-gray-900 text-white p-4 rounded-xl w-full text-left mb-2 flex items-center gap-1">
              <span>name = "</span>
              <input
                type="text"
                placeholder="Type your name..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-gray-800 text-white px-2 py-1 rounded focus:outline-none"
              />
              <span>"</span>
            </div>
            <div className="bg-gray-900 text-white p-4 rounded-xl w-full text-left mb-2">
              <pre>{`print("Hello, " + name + "!")`}</pre>
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setOutput(`Hello, ${userInput}!`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold transition transform hover:-translate-y-1 hover:scale-105"
              >
                Run ▶
              </button>
              <button
                onClick={() => {
                  setOutput("");
                  setUserInput("");
                }}
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold transition transform hover:-translate-y-1 hover:scale-105"
              >
                Clear
              </button>
            </div>
            {output && (
              <div className="mt-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl w-full text-left text-black">
                <strong>Output:</strong>
                <pre>{output}</pre>
              </div>
            )}
            <button
              onClick={handleNextWithoutOutput}
              className="mt-4 bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
            >
              Next Step ➡
            </button>
          </>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <>
            <h1 className="text-2xl font-bold mb-4">📖 Simple Math Example</h1>
            <div className="bg-gray-900 text-white p-4 rounded-xl w-full text-left relative mb-4">
              <pre>{`x = 2\ny = 3\nprint(x + y)`}</pre>
              <button
                onClick={() =>
                  runCode("5\n\nUsed '+' for Addition.\nNext, try '-', '*', '/'")
                }
                className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm"
              >
                Run ▶
              </button>
            </div>
            {output && (
              <div className="mt-2 bg-white/70 backdrop-blur-sm p-4 rounded-xl w-full text-left text-black">
                <strong>Output:</strong>
                <pre>{output}</pre>
              </div>
            )}
            <button
              onClick={handleNextWithoutOutput}
              className="mt-4 bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
            >
              Next Step ➡
            </button>
          </>
        )}

        {/* Step 6 (Final) */}
        {step === 6 && (
          <section>
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
                🎉 Congrats! You finished all 6 games!
              </h1>
              <p className="text-lg mb-6 opacity-90">
                You’ve unlocked the magic of Python basics 🚀
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
              >
                Try More
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
