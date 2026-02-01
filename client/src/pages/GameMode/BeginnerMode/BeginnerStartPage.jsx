import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BeginnerStartPage() {
    const [currentLevel, setCurrentLevel] = useState('map'); // map, learn-print, challenges-print, learn-variables, challenges-variables
    const navigate = useNavigate();

    useEffect(() => {
        // Check localStorage for progress
        const checkProgress = () => {
            const level1Complete = localStorage.getItem('pythonGame_level1_completed');
            const level2Complete = localStorage.getItem('pythonGame_level2_completed');

            console.log('Level 1 Complete:', level1Complete);
            console.log('Level 2 Complete:', level2Complete);
        };

        checkProgress();
    }, [currentLevel]);

    // Function to render the current game level
    const renderGameContent = () => {

        switch (currentLevel) {
            case 'map':
                return (
                    <iframe
                        src="/index.html"
                        title="Python Island Map"
                        style={{
                            width: '100%',
                            height: 'calc(100vh - 80px)',
                            border: 'none',
                            display: 'block'
                        }}
                    />
                );

            case 'learn-print':
                return (
                    <iframe
                        src="/learn-print.html"
                        title="Learn Print Function"
                        style={{
                            width: '100%',
                            height: 'calc(100vh - 80px)',
                            border: 'none',
                            display: 'block'
                        }}
                    />
                );

            case 'challenges-print':
                return (
                    <iframe
                        src="/page2.html"
                        title="Print Challenges"
                        style={{
                            width: '100%',
                            height: 'calc(100vh - 80px)',
                            border: 'none',
                            display: 'block'
                        }}
                    />
                );

            case 'learn-variables':
                return (
                    <iframe
                        src="/learn-variables.html"
                        title="Learn Variables"
                        style={{
                            width: '100%',
                            height: 'calc(100vh - 80px)',
                            border: 'none',
                            display: 'block'
                        }}
                    />
                );

            case 'challenges-variables':
                return (
                    <iframe
                        src="/challenge-variables.html"
                        title="Variable Challenges"
                        style={{
                            width: '100%',
                            height: 'calc(100vh - 80px)',
                            border: 'none',
                            display: 'block'
                        }}
                    />
                );

            default:
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh - 80px)',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontFamily: 'Comic Sans MS, Arial, sans-serif'
                    }}>
                        <h1 style={{ fontSize: '48px', marginBottom: '30px' }}>🎮 Python Adventure!</h1>
                        <p style={{ fontSize: '20px', marginBottom: '40px' }}>Choose your starting point:</p>
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <button
                                onClick={() => setCurrentLevel('map')}
                                style={{
                                    padding: '20px 40px',
                                    fontSize: '20px',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
                                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                🗺️ Island Map
                            </button>

                            <button
                                onClick={() => setCurrentLevel('learn-print')}
                                style={{
                                    padding: '20px 40px',
                                    fontSize: '20px',
                                    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                                }}
                            >
                                📖 Learn Print
                            </button>

                            <button
                                onClick={() => setCurrentLevel('challenges-print')}
                                style={{
                                    padding: '20px 40px',
                                    fontSize: '20px',
                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                                }}
                            >
                                🎮 Print Challenges
                            </button>
                        </div>

                        <button
                            onClick={() => navigate('/dashboard')}
                            style={{
                                marginTop: '40px',
                                padding: '15px 30px',
                                fontSize: '16px',
                                background: '#64748b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                );
        }
    };

    return (
        <div style={{
            width: '100%',
            minHeight: 'calc(100vh - 80px)',
            marginTop: '80px',
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            padding: 0,
            overflow: 'hidden'
        }}>
            {renderGameContent()}
        </div>
    );
}
