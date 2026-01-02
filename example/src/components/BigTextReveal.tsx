import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const BigTextReveal: React.FC = () => {
    // "Mixed" scrolling often tricky with direct vertical content if not carefully managed.
    // simpler to use standard vertical here but with big sticky text?
    // Let's do standard vertical with multiple scroll transforms.

    const words = ["SMOOTH", "FAST", "NATIVE"];

    return (
        <ScrollSection style={{ background: '#000', color: '#fff', padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 5%)', minHeight: '150vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            {/* Intro Label */}
            <ScrollTransform effect="fade">
                <div style={{ textTransform: 'uppercase', letterSpacing: 'clamp(0.1rem, 0.5vw, 0.2rem)', marginBottom: 'clamp(30px, 5vh, 40px)', color: '#e056fd', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                    Experience the difference
                </div>
            </ScrollTransform>

            {/* BIG TEXT */}
            <div style={{
                fontSize: 'clamp(4rem, 15vw, 20rem)',
                lineHeight: 0.9,
                fontWeight: 900,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {words.map((word) => (
                    <div key={word} style={{ overflow: 'hidden' }}>
                        <ScrollTransform
                            effect="slide-in"
                            direction="up"
                            intensity={0.5}
                            style={{ display: 'inline-block' }}
                        >
                            {word}
                        </ScrollTransform>
                    </div>
                ))}
            </div>

            <ScrollTransform effect="scale" range={[0, 1]}>
                <div style={{ marginTop: 'clamp(30px, 5vh, 50px)', width: 'clamp(40px, 8vw, 50px)', height: 'clamp(40px, 8vw, 50px)', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>
                    ↓
                </div>
            </ScrollTransform>

        </ScrollSection>
    );
};
