import React, { useState, useEffect } from "react";

// Load Pyodide from CDN
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";

export default function Level1_PrintReveal({ onComplete }) {
  const [step, setStep] = useState(1); // 1 = learning, 2 = task
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---- Load Pyodide once ----
  useEffect(() => {
    const loadPyodide = async () => {
      setLoading(true);
      const script = document.createElement("script");
      script.src = PYODIDE_URL;
      script.onload = async () => {
        // @ts-ignore
        const pyodideInstance = await window.loadPyodide();
        setPyodide(pyodideInstance);
        setLoading(false);
      };
      document.body.appendChild(script);
    };
    loadPyodide();
  }, []);

  // ---- Run Code using Pyodide ----
 const runCode = async () => {
  if (!pyodide) return;
  setLoading(true);
  setOutput("");
  setMessage("");

  try {
    // Create a Python string to capture stdout
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = mystdout = StringIO()
`);

    // Run user's code
    await pyodide.runPythonAsync(userCode);

    // Get stdout
    const result = pyodide.runPython("mystdout.getvalue()");
    setOutput(result);
  } catch (err) {
    setOutput(err.toString());
  } finally {
    setLoading(false);
  }
};


  // ---- Submission ----
  const handleSubmit = () => {
    if (output.trim() === "Reveal") {
      setRevealed(true);
      setMessage("🎉 Well done! You printed 'Reveal'.");
      setLevelCompleted(true);
    } else {
      setMessage("❌ Output mismatch. Make sure your code prints 'Reveal'.");
    }
  };

  const handleNextLevel = () => {
    onComplete();
    setUserCode("");
    setOutput("");
    setMessage("");
    setRevealed(false);
    setLevelCompleted(false);
    setStep(1);
  };

  // ---- Step 1: Learning ----
  if (step === 1) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">
          🧠 Learn: The print() Function
        </h2>

        <p className="text-gray-300 mb-4">
          In Python, <code>print()</code> displays text or values on the screen.
        </p>

        <pre className="bg-gray-900 text-left p-4 rounded-lg mb-4 text-green-400 font-mono">
{`print("Hello, world!")`}
        </pre>

        <p className="mb-2 text-gray-400">
          🖥️ Output:
          <br />
          <span className="text-green-400 font-mono">Hello, world!</span>
        </p>

        <button
          onClick={() => setStep(2)}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition"
        >
          Next ➡️ Try It Yourself
        </button>
      </div>
    );
  }

  // ---- Step 2: Challenge ----
  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-purple-400">
        🧱 Task: Reveal the Hidden Wall
      </h2>
      <p className="mb-3 text-white/80">
        Write Python code that prints <code>"Reveal"</code> to unlock the wall.
      </p>

      {/* Wall */}
      <div
        className={`w-full h-48 mb-4 rounded-xl border-4 transition-all duration-700 flex items-center justify-center ${
          revealed
            ? "bg-white border-black text-black text-2xl font-bold"
            : "bg-gray-700 border-gray-600 text-transparent"
        }`}
      >
        ✨ Hidden Message Revealed! ✨
      </div>

      {/* Code Editor */}
      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder='Example: print("Reveal")'
        className="w-full h-32 px-4 py-2 mb-3 bg-gray-900 border-2 border-purple-600 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Buttons */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={runCode}
          disabled={loading || !pyodide}
          className="bg-blue-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Code ▶"}
        </button>

        <button
          onClick={handleSubmit}
          className="bg-purple-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition"
        >
          Submit
        </button>

        {levelCompleted && (
          <button
            onClick={handleNextLevel}
            className="bg-green-600 py-2 px-4 rounded-xl font-bold shadow-lg hover:bg-green-700 transition"
          >
            Next Level ➡️
          </button>
        )}
      </div>

      {/* Output */}
      {output && (
        <div className="mt-4 bg-gray-900 text-left p-3 rounded-lg text-green-400 font-mono border border-gray-600">
          <strong>Output:</strong>
          <pre className="whitespace-pre-wrap mt-1">{output}</pre>
        </div>
      )}

      {message && (
        <p className={`mt-3 font-semibold ${revealed ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
