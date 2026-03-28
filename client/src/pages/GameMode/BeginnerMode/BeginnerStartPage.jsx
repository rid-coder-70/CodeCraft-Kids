import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMap, FaBook, FaGamepad, FaArrowLeft } from 'react-icons/fa';

export default function BeginnerStartPage() {
    const location = useLocation();
    const [currentLevel, setCurrentLevel] = useState(location.state?.targetLevel || 'map');
    const navigate = useNavigate();

    useEffect(() => {
        const handleMessage = async (e) => {
            if (e.data && e.data.type === 'LEVEL_COMPLETE') {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
                        await fetch(`${API_BASE}/api/auth/profile`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({ completedLevel: e.data.level })
                        });
                    } catch (error) {
                        console.error('Error updating progress:', error);
                    }
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const renderGameContent = () => {
        switch (currentLevel) {
            case 'map':
                return <iframe src="/map.html" title="Python Island Map" className="w-full h-[calc(100vh-80px)] border-none block" />;
            case 'level1':
                return <iframe src="/level1.html" title="Level 1" className="w-full h-[calc(100vh-80px)] border-none block" />;
            case 'level2':
                return <iframe src="/level2.html" title="Level 2" className="w-full h-[calc(100vh-80px)] border-none block" />;
            case 'level3':
                return <iframe src="/level3.html" title="Level 3" className="w-full h-[calc(100vh-80px)] border-none block" />;
            case 'level4':
                return <iframe src="/level4.html" title="Level 4" className="w-full h-[calc(100vh-80px)] border-none block" />;
            case 'level5':
                return <iframe src="/level5.html" title="Level 5" className="w-full h-[calc(100vh-80px)] border-none block" />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-[#f9faec] text-gray-800 font-sans p-6 rounded-tr-3xl">
                        <div className="bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 max-w-2xl w-full text-center">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>Python Adventure!</h1>
                            <p className="text-gray-500 font-bold mb-8">Choose your starting point below to begin your journey.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mb-10">
                                <button
                                    onClick={() => setCurrentLevel('map')}
                                    className="flex flex-col items-center justify-center p-6 bg-white border-2 border-green-200 rounded-2xl text-green-700 hover:bg-green-50 hover:border-green-400 transition-all font-bold shadow-sm"
                                >
                                    <FaMap className="text-3xl mb-3" /> Island Map
                                </button>

                                <button
                                    onClick={() => setCurrentLevel('level1')}
                                    className="flex flex-col items-center justify-center p-6 bg-white border-2 border-blue-200 rounded-2xl text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all font-bold shadow-sm"
                                >
                                    <FaBook className="text-3xl mb-3" /> Play Level 1
                                </button>

                                <button
                                    onClick={() => setCurrentLevel('level2')}
                                    className="flex flex-col items-center justify-center p-6 bg-white border-2 border-orange-200 rounded-2xl text-orange-700 hover:bg-orange-50 hover:border-orange-400 transition-all font-bold shadow-sm"
                                >
                                    <FaGamepad className="text-3xl mb-3" /> Play Level 2
                                </button>
                            </div>

                            <button
                                onClick={() => navigate('/dashboard')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl font-bold transition-colors"
                            >
                                <FaArrowLeft /> Back to Dashboard
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] overflow-hidden m-0 p-0 bg-[#f9faec]">
            {renderGameContent()}
        </div>
    );
}
