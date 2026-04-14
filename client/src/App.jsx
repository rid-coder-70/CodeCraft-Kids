import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import BeginnerMode from "./pages/GameMode/BeginnerMode/BeginnerStartPage";
import ProMode from "./pages/GameMode/ProMode/ProStartPages";
import Level1 from "./pages/GameMode/BeginnerMode/Level1";
import Level2 from "./pages/GameMode/BeginnerMode/Level2";
import Level3 from "./pages/GameMode/BeginnerMode/Level3";
import Level4 from "./pages/GameMode/BeginnerMode/Level4";
import Level5 from "./pages/GameMode/BeginnerMode/Level5";
import { ToastProvider } from "./components/Toast";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // payload.exp is in seconds; Date.now() is in ms
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!isTokenValid(token)) {
    // Clear any stale/expired token so the server never receives it
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />

            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<Navigate to="/dashboard" />} />
            <Route path="/game/beginner" element={<PrivateRoute><BeginnerMode /></PrivateRoute>} />
            <Route path="/game/pro" element={<PrivateRoute><ProMode /></PrivateRoute>} />

            <Route path="/game/level/1" element={<PrivateRoute><Level1 /></PrivateRoute>} />
            <Route path="/game/level/2" element={<PrivateRoute><Level2 /></PrivateRoute>} />
            <Route path="/game/level/3" element={<PrivateRoute><Level3 /></PrivateRoute>} />
            <Route path="/game/level/4" element={<PrivateRoute><Level4 /></PrivateRoute>} />
            <Route path="/game/level/5" element={<PrivateRoute><Level5 /></PrivateRoute>} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
