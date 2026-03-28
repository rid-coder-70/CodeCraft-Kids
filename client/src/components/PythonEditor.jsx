import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaTrash, FaTerminal, FaCode } from "react-icons/fa";

const PythonEditor = () => {
  const [code, setCode] = useState("print('Hello, CodeCrafter!')\n# Write your Python code here\nfor i in range(5):\n    print('Loop number:', i)");
  const [output, setOutput] = useState("");
  const [isSkulptLoaded, setIsSkulptLoaded] = useState(false);
  const outputRef = useRef(null);

  useEffect(() => {
    // Load Skulpt from CDN
    const addScript = (src, id) => {
        if (document.getElementById(id)) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.id = id;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    addScript("https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js", "skulpt-js")
      .then(() => addScript("https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js", "skulpt-stdlib-js"))
      .then(() => setIsSkulptLoaded(true))
      .catch((err) => console.error("Skulpt load error:", err));

    return () => {
      const s1 = document.getElementById("skulpt-js");
      const s2 = document.getElementById("skulpt-stdlib-js");
      if (s1) document.body.removeChild(s1);
      if (s2) document.body.removeChild(s2);
    };
  }, []);

  const outf = (text) => {
    setOutput((prev) => prev + text);
    if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  };

  const builtinRead = (x) => {
    if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles["files"][x] === undefined) {
      throw "File not found: '" + x + "'";
    }
    return window.Sk.builtinFiles["files"][x];
  };

  const runCode = () => {
    if (!isSkulptLoaded || !window.Sk) return;
    
    setOutput(""); // Clear output before running
    window.Sk.pre = "output";
    window.Sk.configure({
      output: outf,
      read: builtinRead,
      __future__: window.Sk.python3
    });

    const myPromise = window.Sk.misceval.asyncToPromise(() => {
      return window.Sk.importMainWithBody("<stdin>", false, code, true);
    });

    myPromise.then(
      () => console.log("Success!"),
      (err) => setOutput((prev) => prev + "\n" + err.toString())
    );
  };

  const clearTerm = () => setOutput("");

  return (
    <div className="w-full h-full flex flex-col animate-fade-in bg-[#f9faec] rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl">
      {/* Editor Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
            <FaCode />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 leading-none" style={{ fontFamily: "'Nunito', sans-serif" }}>Python Lab</h2>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Try-it-Yourself</span>
          </div>
        </div>

        <div className="flex gap-2">
           <button 
             onClick={clearTerm}
             className="p-3 text-gray-400 hover:text-red-500 transition-colors"
             title="Clear Console"
           >
             <FaTrash />
           </button>
           <button 
             onClick={runCode}
             disabled={!isSkulptLoaded}
             className="px-6 py-2 bg-[#a0cc5b] hover:bg-[#8ebb4a] text-white font-bold rounded-xl transition shadow-sm text-sm flex items-center gap-2 disabled:opacity-50"
           >
             <FaPlay /> Run Code
           </button>
        </div>
      </div>

      {/* Editor Main Section (W3Schools Layout) */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Code Input */}
        <div className="flex-1 border-r border-gray-100 bg-white relative flex flex-col min-h-0">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            className="flex-1 w-full p-6 font-mono text-sm sm:text-base leading-relaxed text-gray-700 bg-transparent focus:outline-none resize-none"
            placeholder="# Write your Python code here..."
          />
          <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 font-mono pointer-events-none">
            Skulpt v1.2.0 • Python 3
          </div>
        </div>

        {/* Console Output */}
        <div className="flex-1 bg-[#1e293b] flex flex-col min-h-0 relative">
          <div className="px-4 py-2 border-b border-gray-700/50 flex items-center gap-2 text-gray-400 shrink-0">
            <FaTerminal className="text-xs" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Result Terminal</span>
          </div>
          
          <div 
            ref={outputRef}
            className="flex-1 p-6 font-mono text-green-400 text-sm overflow-y-auto custom-scrollbar"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {output || <span className="opacity-30 italic">Console output will appear here...</span>}
          </div>

          <div className="absolute top-2 right-4 dot-indicators flex gap-1">
             <div className="w-2 h-2 rounded-full bg-red-400/30"></div>
             <div className="w-2 h-2 rounded-full bg-yellow-400/30"></div>
             <div className="w-2 h-2 rounded-full bg-green-400/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonEditor;
