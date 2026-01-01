import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const PinnedContent: React.FC = () => {
    // Classic Pinned Section: Left text sticky, right images scroll
    const images = [
        'linear-gradient(45deg, #ff9ff3, #feca57)',
        'linear-gradient(45deg, #ff6b6b, #ee5253)',
        'linear-gradient(45deg, #48dbfb, #0abde3)',
        'linear-gradient(45deg, #1dd1a1, #10ac84)'
    ];

    return (
        <ScrollSection style={{ background: '#111', color: 'white' }}>
            <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', gap: 'clamp(20px, 4vw, 0)' }}>

                {/* Sticky Left Column */}
                <div style={{
                    flex: '1 1 min(300px, 100%)',
                    padding: 'clamp(40px, 8vh, 80px) clamp(20px, 4vw, 40px)',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <ScrollTransform effect="fade">
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '20px' }}>Pinned Content</h2>
                    </ScrollTransform>
                    <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: 1.6, color: '#aaa' }}>
                        This text stays pinned to the left while the visuals on the right scroll by.
                        <br /><br />
                        Commonly used for feature showcases or storytelling.
                        Achieved easily with native <code style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>position: sticky</code> within a standard container.
                    </p>
                </div>

                {/* Scrolling Right Column */}
                <div style={{ flex: '1 1 min(400px, 100%)', padding: 'clamp(40px, 8vh, 80px) clamp(20px, 4vw, 40px)' }}>
                    {images.map((bg, i) => (
                        <ScrollTransform key={i} effect="scale" range={[0, 0.3]}>
                            <div style={{
                                height: 'clamp(300px, 60vw, 500px)',
                                background: bg,
                                marginBottom: 'clamp(40px, 8vw, 60px)',
                                borderRadius: 'clamp(12px, 3vw, 16px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                                color: 'rgba(255,255,255,0.5)',
                                fontWeight: 'bold'
                            }}>
                                {i + 1}
                            </div>
                        </ScrollTransform>
                    ))}
                </div>

            </div>
        </ScrollSection>
    );
};
