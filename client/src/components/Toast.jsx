import { useState, useCallback, useEffect, createContext, useContext } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
  };

  const icons = {
    success: <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />,
    error: <FaTimesCircle className="text-red-400 text-xl flex-shrink-0" />,
    info: <FaInfoCircle className="text-blue-400 text-xl flex-shrink-0" />,
  };

  const colors = {
    success: "border-green-400/40 bg-green-500/10",
    error: "border-red-400/40 bg-red-500/10",
    info: "border-blue-400/40 bg-blue-500/10",
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(({ id, message, type, exiting }) => (
          <div
            key={id}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${colors[type]} ${exiting ? "toast-exit" : "toast-enter"}`}
          >
            {icons[type]}
            <p className="text-white font-bold text-sm flex-1">{message}</p>
            <button
              onClick={() => removeToast(id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
