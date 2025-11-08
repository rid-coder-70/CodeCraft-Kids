import React, { useState, useEffect } from "react";

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";

export default function Level2_Arithmetic({ onComplete }) {
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [task, setTask] = useState(1);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [blockGreen, setBlockGreen] = useState(null);
  const [manMovingTo, setManMovingTo] = useState(null);
  const [task1Complete, setTask1Complete] = useState(false);
  const [task2Complete, setTask2Complete] = useState(false);
  const [showUnlockMsg, setShowUnlockMsg] = useState(false);

  // ✅ Load Pyodide cleanly
  useEffect(() => {
    async function initPyodide() {
      try {
        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = PYODIDE_URL;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        const py = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        });

        setPyodide(py);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load Pyodide:", err);
        setMessage("❌ Failed to load Python engine.");
      }
    }

    initPyodide();
  }, []);

  // ✅ Run Python code safely
  const runCode = async () => {
    if (!pyodide) return;
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
      setOutput(result.trim() || "✅ Code ran successfully!");
    } catch (err) {
      setOutput("❌ " + err.toString());
    }
  };

  const outputContainsNumber = (n) => output.includes(n.toString());

  // ✅ Task 1 logic
  const submitTask1 = () => {
    const need = [15, 5, 50, 2];
    const ok = need.every((n) => outputContainsNumber(n));
    if (ok) {
      setMessage("🎉 Task 1 complete! Watch the man move to Block 1.");
      setTask1Complete(true);
      setManMovingTo("block1");
      setTimeout(() => {
        setBlockGreen("block1");
        setManMovingTo(null);
        setTask(2);
        setMessage("Task 1 done! Now Task 2: the twist.");
        setOutput("");
      }, 2000);
    } else {
      setMessage("❌ Output didn’t include 15, 5, 50, and 2.");
    }
  };

  // ✅ Task 2 logic
  const submitTask2 = () => {
    if (output && output.includes("25")) {
      setMessage("🎉 Task 2 complete! Watch the man move to Block 2.");
      setTask2Complete(true);
      setManMovingTo("block2");
      setTimeout(() => {
        setBlockGreen("block2");
        setShowUnlockMsg(true);
        setTimeout(() => onComplete && onComplete(), 2000);
      }, 2000);
    } else {
      setMessage("❌ Make sure your code prints 25 (print(5 ** 2)).");
    }
  };

  // ✅ Loading Screen
  if (loading) {
    return (
      <div className="p-6 text-green-300 font-mono text-sm bg-gray-900 rounded-lg text-center">
        ⏳ Loading Python environment... please wait.
      </div>
    );
  }

  // ✅ Main content
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg font-mono max-w-2xl mx-auto">
      <style>
        {`
        @keyframes jump {
          0% { transform: translateY(0); }
          25% { transform: translateY(-40px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .jumping {
          animation: jump 1s ease-in-out;
        }
      `}
      </style>

      <h2 className="text-2xl font-bold mb-4 text-purple-400">
        🏗 Level 2 — Arithmetic Adventure
      </h2>

      {step === 1 && (
        <>
          <p className="mb-4 text-green-300">
            Welcome to the world of numbers! Let's learn how to add, subtract,
            multiply, and divide in Python.
          </p>
          <pre className="bg-gray-800 p-3 rounded-lg text-sm text-green-200 mb-3">
            {`a = 10
b = 5
print(a + b)   # Addition
print(a - b)   # Subtraction
print(a * b)   # Multiplication
print(a / b)   # Division`}
          </pre>
          <button
            onClick={() => {
              setStep(2);
              setTask(1);
              setMessage("");
              setUserCode("");
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl transition"
          >
            Start Task 1 ➡
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-3 text-green-300">
            {task === 1 ? (
              <>
                🧮 <b>Task 1:</b> Perform the four arithmetic operations with{" "}
                <code>a = 10</code> and <code>b = 5</code>.
              </>
            ) : (
              <>
                ⚡ <b>Task 2:</b> Make 5 become 25 using exponentiation (
                <code>**</code>).
              </>
            )}
          </div>

          <textarea
            className="w-full h-40 p-3 mb-3 bg-gray-900 border-2 border-purple-600 rounded-xl text-green-200 focus:outline-none"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder={
              task === 1
                ? `# Task 1 example
a = 10
b = 5
print(a + b)
print(a - b)
print(a * b)
print(a / b)`
                : "# Task 2 example\nprint(5 ** 2)"
            }
          />

          <div className="flex gap-3 mb-3">
            <button
              onClick={runCode}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-bold transition"
            >
              ▶ Run Code
            </button>
            <button
              onClick={task === 1 ? submitTask1 : submitTask2}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-bold transition"
            >
              ✅ Submit Task
            </button>
          </div>

          <pre className="bg-gray-800 p-3 rounded-lg text-sm mb-3 text-yellow-300 min-h-[50px] whitespace-pre-wrap">
            {output}
          </pre>
          <p className="mb-4 text-center text-purple-300">{message}</p>

          {/* Arena */}
          <div className="relative h-40 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4">
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-800 rounded-b-xl" />

            {/* Blocks */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-around px-24">
              <div
                className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold transition-colors duration-500 ${
                  blockGreen === "block1" || task1Complete
                    ? "bg-green-500"
                    : "bg-blue-600"
                }`}
              >
                ①
              </div>
              <div
                className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold transition-colors duration-500 ${
                  blockGreen === "block2" || task2Complete
                    ? "bg-green-500"
                    : "bg-blue-600"
                }`}
              >
                ②
              </div>
            </div>

            {/* Man emoji with jump animation */}
            <div
              className={`absolute bottom-12 left-6 text-4xl transition-transform duration-1000 ${
                manMovingTo === "block1"
                  ? "translate-x-[200px] jumping"
                  : manMovingTo === "block2"
                  ? "translate-x-[400px] jumping"
                  : ""
              }`}
            >
              🧍‍♂️
            </div>

            {/* Celebration / Unlock message */}
            {showUnlockMsg && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white rounded-xl">
                <h2 className="text-2xl font-bold mb-2">🥳 Congratulations!</h2>
                <p className="mb-2">
                  You unlocked: <strong>Arithmetic Operators</strong>
                </p>
                <p className="text-green-300">
                  Next up: Decisions with IF–ELSE
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}   