import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const AdvancedTransforms: React.FC = () => {
    return (
        <ScrollSection style={{ padding: 'clamp(80px, 15vh, 150px) clamp(20px, 5vw, 40px)', background: '#0a0a0a' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vh, 80px)' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>3D Perspectives</h2>
                <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>Scroll-driven 3D transforms</p>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(30px, 5vw, 50px)',
                perspective: '1000px', // Critical for 3D effect
                flexWrap: 'wrap'
            }}>
                {/* Card 1: Rotates X */}
                <ScrollTransform effect="rotate-x" intensity={1}>
                    <div style={{
                        width: 'min(300px, 85vw)',
                        height: 'clamp(300px, 50vw, 400px)',
                        background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
                        borderRadius: 'clamp(12px, 3vw, 20px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        fontWeight: 'bold',
                    }}>
                        Rotate X
                    </div>
                </ScrollTransform>

                {/* Card 2: Rotates Y */}
                <ScrollTransform effect="rotate-y" intensity={1}>
                    <div style={{
                        width: 'min(300px, 85vw)',
                        height: 'clamp(300px, 50vw, 400px)',
                        background: 'linear-gradient(135deg, #00cec9, #81ecec)',
                        borderRadius: 'clamp(12px, 3vw, 20px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        fontWeight: 'bold',
                        color: '#004daa'
                    }}>
                        Rotate Y
                    </div>
                </ScrollTransform>
            </div>
        </ScrollSection>
    );
};
