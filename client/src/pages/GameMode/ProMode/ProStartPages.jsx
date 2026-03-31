import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGamepad } from 'react-icons/fa';

export default function ProStartPages() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-[#f9faec] text-gray-800 font-sans p-6">
            <div className="bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 max-w-lg w-full text-center">
                <span className="text-5xl block mb-6">🚀</span>
                
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'KG Primary Penmanship', 'Lazy Sunday', 'Jenna Sue', 'Sunny Spells', 'Caveat', cursive" }}>
                    Pro Mode
                </h1>
                
                <p className="text-gray-900 font-bold text-lg mb-2">
                    Advanced Python Challenges Coming Soon!
                </p>
                <p className="text-gray-500 font-medium mb-10 leading-relaxed text-sm">
                    Complete all beginner levels first to unlock the Pro Mode challenges and earn advanced badges!
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/game/beginner')}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#a0cc5b] hover:bg-[#8ebb4a] text-white rounded-xl font-bold transition-colors shadow-sm"
                    >
                        <FaGamepad /> Play Beginner Mode
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold transition-colors"
                    >
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
