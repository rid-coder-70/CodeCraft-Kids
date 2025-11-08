import React, { useState, useEffect } from "react";

export default function Level1({ onComplete }) {
  const [step, setStep] = useState(1);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pyodide, setPyodide] = useState(null);
  const [jump, setJump] = useState(false);

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

  // ---- Run Code using Pyodide ----
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
    if (output === "10") {
      setMessage("🎉 Correct! Your program output is 10.");
      setLevelCompleted(true);
      setJump(true); // Trigger jump animation
    } else {
      setMessage("❌ Output incorrect. Make sure your program prints 10.");
    }
  };

  const handleNextLevel = () => {
    onComplete();
    setUserCode("");
    setOutput("");
    setMessage("");
    setLevelCompleted(false);
    setStep(1);
    setJump(false);
  };

  // ---- Step 1: Instructions ----
  if (step === 1) {
    return (
      <div className="bg-gray-700 p-6 rounded-2xl shadow-xl text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">🐍 Learn: Variables & print()</h2>
        <p className="text-white/80 mb-4">
          Store a variable and print its value. Your program should print <code>10</code>.
        </p>
        <pre className="bg-gray-900 text-left p-4 rounded-lg mb-4 text-green-400 font-mono">
{`x = 10
print(x)`}</pre>
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
      <h2 className="text-3xl font-bold mb-4">🐍 Level 1: Print 10</h2>
      <p className="text-white/80 mb-4">Write Python code that prints <code>10</code>.</p>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="# Example: x = 10\n# print(x)"
        className="w-full h-32 px-4 py-2 mb-3 bg-gray-900 border-2 border-purple-600 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        <p className={`mt-3 font-semibold ${levelCompleted ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}

   {/* Ground, Block and Man Emoji */}
<div className="relative h-32 mt-6">
  {/* Ground */}
  <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-800" />
  {/* Block */}
  <div className="absolute bottom-0 right-78 w-20 h-16 bg-blue-500" />
  {/* Man Emoji */}
  <div
    className={`absolute bottom-0 left-39 text-4xl transition-all duration-500 ${
      jump ? "emoji-jump" : ""
    }`}
  >
    🧍‍♂️
  </div>
</div>

{/* Animation CSS */}
<style>{`
  @keyframes jump {
    0% { bottom: 0; left: 25%; transform: scaleY(1); }
    50% { bottom: 64px; left: 33%; transform: scaleY(1); } /* apex of jump */
    100% { bottom: 64px; left: 34%; transform: scaleY(1); } /* land on block */
  }
  .emoji-jump {
    animation: jump 1s ease-in-out forwards;
  }
`}</style>



    </div>
  );
}
