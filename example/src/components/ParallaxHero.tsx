import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const ParallaxHero: React.FC = () => {
    return (
        <ScrollSection style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Background Layer (Moves Slow) */}
            <ScrollTransform effect="parallax" speed={0.1} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', zIndex: 0 }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #2f3542 0%, #000 70%)',
                    backgroundSize: 'cover'
                }} />
            </ScrollTransform>

            {/* Midground Shapes (Move Medium) */}
            <ScrollTransform effect="parallax" speed={0.3} style={{ position: 'absolute', top: '20%', left: '10%', zIndex: 1 }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(45deg, #ff4757, #ff6b81)', opacity: 0.6, filter: 'blur(20px)' }} />
            </ScrollTransform>

            <ScrollTransform effect="parallax" speed={0.4} style={{ position: 'absolute', bottom: '20%', right: '10%', zIndex: 1 }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(45deg, #1e90ff, #70a1ff)', opacity: 0.5, filter: 'blur(30px)' }} />
            </ScrollTransform>

            {/* Foreground Content (Moves Fast / Scrolls Normal) */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
                <ScrollTransform effect="scale" range={[0, 0.2]}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '0', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        Scroll<span style={{ color: '#e056fd' }}>Dynamics</span>
                    </h1>
                </ScrollTransform>

                <ScrollTransform effect="fade">
                    <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#ccc', marginTop: '20px' }}>
                        Production-ready smooth scrolling for React
                    </p>
                </ScrollTransform>
            </div>

        </ScrollSection>
    );
};
