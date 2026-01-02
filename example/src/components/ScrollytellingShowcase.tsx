import React from 'react';
import { ScrollTransform, Scrollytelling, ScrollUtils } from 'scroll-dynamics-pro';

export const ScrollytellingShowcase = () => {
    return (
        <React.Fragment>
            <div style={{ padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 5%)', background: '#000', color: 'white', textAlign: 'center' }}>
                <ScrollTransform effect="fade">
                    <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '20px' }}>V2: Scrollytelling Engine</h2>
                    <p style={{ color: '#888', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>High-performance sticky rendering tied to precise progress (0 - 1).</p>
                </ScrollTransform>
            </div>

            <Scrollytelling height="400vh">
                {(progress: number) => {
                    // Logic for text triggers
                    // Layer 1: 0.1 - 0.3
                    // Layer 2: 0.4 - 0.6
                    // Layer 3: 0.7 - 0.9

                    const getOpacity = (start: number, end: number) => {
                        if (progress < start || progress > end) return 0;
                        const rangeDuration = end - start;
                        const center = start + rangeDuration / 2;
                        const dist = ScrollUtils.abs(progress - center);
                        return ScrollUtils.max(0, 1 - (dist / (rangeDuration / 2)) * 1.5);
                    };

                    const opacity1 = getOpacity(0.05, 0.35);
                    const opacity2 = getOpacity(0.35, 0.65);
                    const opacity3 = getOpacity(0.65, 0.95);

                    // Background scale driven by full progress
                    const bgScale = 1 + progress * 0.5; // 1 -> 1.5
                    // Let's dim it: starts bright, gets dark? Or opposite. 
                    // Let's make it brighter.

                    return (
                        <div style={{
                            height: '100%',
                            width: '100%',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            backgroundColor: '#000'
                        }}>
                            {/* Background Image */}
                            <img
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
                                alt="Abstract Bg"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.6,
                                    transform: `scale(${bgScale})`,
                                    transition: 'transform 0.1s linear', // smooth out rAF jitter if any, though rAF should be direct
                                    willChange: 'transform, opacity'
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 20%, #000 100%)' }} />

                            {/* Text Layers */}
                            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', width: "100%" }}>
                                <h3 style={{
                                    fontSize: 'clamp(2rem, 6vw, 4rem)',
                                    position: 'absolute',
                                    width: '100%',
                                    top: '50%',
                                    left: '0',
                                    transform: 'translateY(-50%)',
                                    opacity: opacity1,
                                    color: '#fff',
                                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}>
                                    Stage 1: Initialization
                                </h3>

                                <h3 style={{
                                    fontSize: 'clamp(2rem, 6vw, 4rem)',
                                    position: 'absolute',
                                    width: '100%',
                                    top: '50%',
                                    left: '0',
                                    transform: 'translateY(-50%)',
                                    opacity: opacity2,
                                    color: '#e056fd',
                                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}>
                                    Stage 2: Processing
                                </h3>

                                <h3 style={{
                                    fontSize: 'clamp(2rem, 6vw, 4rem)',
                                    position: 'absolute',
                                    width: '100%',
                                    top: '50%',
                                    left: '0',
                                    transform: 'translateY(-50%)',
                                    opacity: opacity3,
                                    color: '#7bed9f',
                                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}>
                                    Stage 3: Success
                                </h3>
                            </div>

                            {/* Progress Indicator */}
                            <div style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontFamily: 'monospace' }}>
                                Progress: {progress.toFixed(2)}
                            </div>
                        </div>
                    );
                }}
            </Scrollytelling>
        </React.Fragment>
    );
};
