import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const AdvancedTransforms: React.FC = () => {
    return (
        <ScrollSection style={{ padding: '150px 20px', background: '#0a0a0a' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '3rem' }}>3D Perspectives</h2>
                <p style={{ color: '#666' }}>Scroll-driven 3D transforms</p>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '50px',
                perspective: '1000px', // Critical for 3D effect
                flexWrap: 'wrap'
            }}>
                {/* Card 1: Rotates X */}
                <ScrollTransform effect="rotate-x" intensity={1}>
                    <div style={{
                        width: '300px',
                        height: '400px',
                        background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                    }}>
                        Rotate X
                    </div>
                </ScrollTransform>

                {/* Card 2: Rotates Y */}
                <ScrollTransform effect="rotate-y" intensity={1}>
                    <div style={{
                        width: '300px',
                        height: '400px',
                        background: 'linear-gradient(135deg, #00cec9, #81ecec)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        fontSize: '2rem',
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
