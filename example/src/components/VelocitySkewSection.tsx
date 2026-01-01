import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const VelocitySkewSection: React.FC = () => {
    const images = [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=400&q=80'
    ];

    return (
        <ScrollSection style={{ background: '#f1f2f6', padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 5%)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vh, 80px)' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#222' }}>Physics & Velocity</h2>
                <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>Items warp based on scroll speed (GSAP-style).</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
                gap: 'clamp(30px, 5vw, 40px)',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {images.map((src, i) => (
                    // We render a ScrollTransform for EACH item to control it individually
                    <ScrollTransform
                        key={i}
                        effect="skew-velocity"
                        intensity={1}
                    >
                        <div style={{
                            height: 'clamp(300px, 60vw, 400px)',
                            borderRadius: 'clamp(8px, 2vw, 12px)',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}>
                            <img
                                src={src}
                                alt="Demo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </ScrollTransform>
                ))}
            </div>
        </ScrollSection>
    );
};
