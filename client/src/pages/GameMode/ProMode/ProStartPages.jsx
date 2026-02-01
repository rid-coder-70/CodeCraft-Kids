import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProStartPages() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            color: 'white',
            fontFamily: 'Comic Sans MS, Arial, sans-serif',
            padding: '20px'
        }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚀 Pro Mode</h1>
            <p style={{ fontSize: '24px', marginBottom: '30px', textAlign: 'center' }}>
                Advanced Python Challenges Coming Soon!
            </p>
            <p style={{ fontSize: '18px', marginBottom: '40px', textAlign: 'center', maxWidth: '600px' }}>
                Complete all beginner levels first to unlock Pro Mode challenges!
            </p>

            <div style={{ display: 'flex', gap: '20px' }}>
                <button
                    onClick={() => navigate('/game/beginner')}
                    style={{
                        padding: '20px 40px',
                        fontSize: '20px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                    }}
                >
                    🎮 Play Beginner Mode
                </button>

                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        padding: '20px 40px',
                        fontSize: '20px',
                        background: '#64748b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                    }}
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}
