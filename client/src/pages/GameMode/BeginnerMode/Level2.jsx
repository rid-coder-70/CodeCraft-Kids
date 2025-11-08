import React, { useState, useEffect } from "react";

export default function Level2({ onComplete }) {
  const [step, setStep] = useState(1);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pyodide, setPyodide] = useState(null);
  const [move, setMove] = useState(false);
  const [blockTouched, setBlockTouched] = useState(false);

  // ---- Load Pyodide ----
  useEffect(() => {
    const loadPyodide = async () => {
      setLoading(true);
      try {
        const pyodideModule = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        });
        setPyodide(pyodideModule);
      } catch (err) {
        console.error("Failed to load Pyodide:", err);
        setMessage("❌ Failed to load Python engine.");
      } finally {
        setLoading(false);
      }
    };

    if (!window.loadPyodide) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
      script.onload = loadPyodide;
      document.body.appendChild(script);
    } else {
      loadPyodide();
    }
  }, []);

  // ---- Run Code ----
  const runCode = async () => {
    if (!pyodide) return;
    setLoading(true);
    setOutput("");
    setMessage("");

    try {
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = mystdout = StringIO()
`);
      await pyodide.runPythonAsync(userCode);
      const result = pyodide.runPython("mystdout.getvalue()");
      setOutput(result.trim());
    } catch (err) {
      setOutput(err.toString());
    } finally {
      setLoading(false);
    }
  };

  // ---- Submit code ----
  const handleSubmit = () => {
    const correctPatterns = [
      "<class 'int'>",
      "<class 'float'>",
      "<class 'str'>",
    ];

    const isCorrect = correctPatterns.every((t) => output.includes(t));

    if (isCorrect) {
      setMessage("🎉 Excellent! Watch your hero move!");
      setMove(true);

      // After walking animation ends (~2.5s), turn block green + show unlock
      setTimeout(() => {
        setBlockTouched(true);
        setMessage("🥳 Congratulations! You've unlocked: Types of Variables!");
        setLevelCompleted(true);
      }, 2500);
    } else {
      setMessage(
        "❌ Make sure you print the types of an int, float, and string using type()."
      );
    }
  };

  const handleNextLevel = () => {
    onComplete();
    setUserCode("");
    setOutput("");
    setMessage("");
    setLevelCompleted(false);
    setStep(1);
    setMove(false);
    setBlockTouched(false);
  };

  // ---- Step 1: Learn ----
  if (step === 1) {
    return (
      <div className="bg-gray-700 p-6 rounded-2xl shadow-xl text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">
          🧠 Learn: Python Data Types
        </h2>
        <p className="text-white/80 mb-4">
          Python can store many kinds of data: numbers, text, True/False values.
        </p>
        <pre className="bg-gray-900 text-left p-4 rounded-lg mb-4 text-green-400 font-mono">
{`print(type(10))       # int
print(type(3.14))     # float
print(type("Hello"))  # str
print(type(True))     # bool`}
        </pre>
        <button
          onClick={() => setStep(2)}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition"
        >
          Next ➡ Try It Yourself
        </button>
      </div>
    );
  }

  // ---- Step 2: Challenge ----
  return (
    <div className="bg-gray-700 p-6 rounded-2xl shadow-xl text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🐍 Level 2: Discover Data Types</h2>
      <p className="text-white/80 mb-4">
        Create 3 variables — an integer, a float, and a string — and print their data types using <code>type()</code>.
      </p>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder={`# Example:\nnum = 5\npi = 3.14\nname = "Priom"\n\nprint(type(num))\nprint(type(pi))\nprint(type(name))`}
        className="w-full h-40 px-4 py-2 mb-3 bg-gray-900 border-2 border-purple-600 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="flex gap-2 justify-center mb-3">
        <button
          onClick={runCode}
          disabled={loading}
          className="bg-blue-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Code ▶"}
        </button>

        <button
          onClick={handleSubmit}
          className="bg-purple-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition"
        >
          Submit Code
        </button>

        {levelCompleted && (
          <button
            onClick={handleNextLevel}
            className="bg-green-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-green-700 transition"
          >
            Next Level ➡
          </button>
        )}
      </div>

      {output && (
        <div className="mt-3 bg-gray-900 text-left p-3 rounded-lg text-green-400 font-mono border border-gray-600">
          <strong>Output:</strong>
          <pre className="whitespace-pre-wrap mt-1">{output}</pre>
        </div>
      )}

      {message && (
        <p
          className={`mt-4 font-semibold ${
            levelCompleted ? "text-green-400" : "text-yellow-400"
          }`}
        >
          {message}
        </p>
      )}

      {/* ---- Animation Section ---- */}
      <div className="relative h-40 mt-8">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-800" />
        {/* Block */}
        <div
          className={`absolute bottom-0 right-80 w-20 h-16 rounded-xl transition-all duration-500 ${
            blockTouched ? "bg-green-500" : "bg-blue-500"
          }`}
        />
        {/* Man */}
        <div
          className={`absolute bottom-0 left-10 text-4xl transition-all ${
            move ? "walk-animation" : ""
          }`}
        >
          🧍‍♂️
        </div>
      </div>

      <style>{`
        @keyframes walkToBlock {
          0% { left: 40px; bottom: 0; }
          100% { left: 200px; bottom: 0; }
        }
        .walk-animation {
          animation: walkToBlock 2.5s linear forwards;
        }
      `}</style>
    </div>
  );
}
