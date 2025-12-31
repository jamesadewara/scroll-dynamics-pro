import React from 'react';
import { ScrollTransform, Scrollytelling, ScrollUtils } from 'scroll-dynamics-pro';

export const CosmicJourney = () => {
    return (
        <React.Fragment>
            <div style={{ padding: '100px 5%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
                <ScrollTransform effect="fade">
                    <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: '700' }}>Cosmic Journey</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>Experience the universe through scroll-driven storytelling.</p>
                </ScrollTransform>
            </div>

            <Scrollytelling height="500vh">
                {(progress: number) => {
                    // Define story phases
                    // Phase 1: Birth of Stars (0.0 - 0.25)
                    // Phase 2: Nebula Formation (0.25 - 0.5)
                    // Phase 3: Galaxy Expansion (0.5 - 0.75)
                    // Phase 4: Cosmic Harmony (0.75 - 1.0)

                    const getPhaseOpacity = (start: number, end: number, fadeEdges = 0.1) => {
                        if (progress < start || progress > end) return 0;
                        const duration = end - start;
                        const localProgress = (progress - start) / duration;

                        // Fade in at start
                        if (localProgress < fadeEdges) {
                            return localProgress / fadeEdges;
                        }
                        // Fade out at end
                        if (localProgress > 1 - fadeEdges) {
                            return (1 - localProgress) / fadeEdges;
                        }
                        return 1;
                    };

                    const phase1Opacity = getPhaseOpacity(0.0, 0.25);
                    const phase2Opacity = getPhaseOpacity(0.25, 0.5);
                    const phase3Opacity = getPhaseOpacity(0.5, 0.75);
                    const phase4Opacity = getPhaseOpacity(0.75, 1.0);

                    // Dynamic background color based on progress
                    const getBackgroundColor = () => {
                        if (progress < 0.25) {
                            // Deep space black to purple
                            const t = progress / 0.25;
                            return `rgb(${Math.floor(10 + t * 30)}, ${Math.floor(5 + t * 20)}, ${Math.floor(20 + t * 40)})`;
                        } else if (progress < 0.5) {
                            // Purple to blue
                            const t = (progress - 0.25) / 0.25;
                            return `rgb(${Math.floor(40 - t * 20)}, ${Math.floor(25 + t * 50)}, ${Math.floor(60 + t * 80)})`;
                        } else if (progress < 0.75) {
                            // Blue to teal
                            const t = (progress - 0.5) / 0.25;
                            return `rgb(${Math.floor(20 + t * 30)}, ${Math.floor(75 + t * 60)}, ${Math.floor(140 - t * 20)})`;
                        } else {
                            // Teal to cosmic purple
                            const t = (progress - 0.75) / 0.25;
                            return `rgb(${Math.floor(50 + t * 52)}, ${Math.floor(135 - t * 25)}, ${Math.floor(120 + t * 30)})`;
                        }
                    };

                    // Particle effects - stars that scale and move
                    const particleCount = 50;
                    const particles = Array.from({ length: particleCount }, (_, i) => {
                        const angle = (i / particleCount) * Math.PI * 2;
                        const distance = 100 + (i % 5) * 50;
                        const baseX = 50 + Math.cos(angle) * (distance * progress * 0.5);
                        const baseY = 50 + Math.sin(angle) * (distance * progress * 0.5);
                        const size = 2 + (i % 3) * 2;
                        const opacity = ScrollUtils.max(0, 1 - progress * 0.7) * (0.3 + (i % 10) / 20);

                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    left: `${baseX}%`,
                                    top: `${baseY}%`,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    borderRadius: '50%',
                                    background: i % 3 === 0 ? '#fff' : i % 3 === 1 ? '#a8edea' : '#fed6e3',
                                    opacity: opacity,
                                    boxShadow: `0 0 ${size * 2}px ${i % 3 === 0 ? '#fff' : i % 3 === 1 ? '#a8edea' : '#fed6e3'}`,
                                    transform: `scale(${1 + progress * 2})`,
                                    transition: 'all 0.1s linear',
                                }}
                            />
                        );
                    });

                    // Central orb that grows and pulses
                    const orbScale = 1 + progress * 3;
                    const orbOpacity = ScrollUtils.max(0, 1 - progress * 0.5);

                    return (
                        <div style={{
                            height: '100%',
                            width: '100%',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            background: getBackgroundColor(),
                            transition: 'background 0.3s ease',
                        }}>
                            {/* Particles */}
                            {particles}

                            {/* Central Orb */}
                            <div style={{
                                position: 'absolute',
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(168,237,234,0.4) 50%, transparent 100%)',
                                transform: `scale(${orbScale})`,
                                opacity: orbOpacity,
                                boxShadow: '0 0 60px rgba(255,255,255,0.6), 0 0 120px rgba(168,237,234,0.4)',
                                transition: 'all 0.1s linear',
                            }} />

                            {/* Gradient Overlays for depth */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
                                pointerEvents: 'none',
                            }} />

                            {/* Text Layers */}
                            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', padding: '0 20px' }}>
                                {/* Phase 1 */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) scale(${0.8 + phase1Opacity * 0.2})`,
                                    opacity: phase1Opacity,
                                    transition: 'all 0.2s ease',
                                }}>
                                    <h3 style={{
                                        fontSize: '4.5rem',
                                        color: '#fff',
                                        textShadow: '0 0 20px rgba(255,255,255,0.5), 0 10px 40px rgba(0,0,0,0.8)',
                                        fontWeight: '800',
                                        marginBottom: '20px',
                                        letterSpacing: '2px',
                                    }}>
                                        Birth of Stars
                                    </h3>
                                    <p style={{
                                        fontSize: '1.3rem',
                                        color: 'rgba(255,255,255,0.9)',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                                        lineHeight: '1.6',
                                    }}>
                                        From the void, light emerges. Energy coalesces into matter.
                                    </p>
                                </div>

                                {/* Phase 2 */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) scale(${0.8 + phase2Opacity * 0.2})`,
                                    opacity: phase2Opacity,
                                    transition: 'all 0.2s ease',
                                }}>
                                    <h3 style={{
                                        fontSize: '4.5rem',
                                        color: '#a8edea',
                                        textShadow: '0 0 30px rgba(168,237,234,0.8), 0 10px 40px rgba(0,0,0,0.8)',
                                        fontWeight: '800',
                                        marginBottom: '20px',
                                        letterSpacing: '2px',
                                    }}>
                                        Nebula Formation
                                    </h3>
                                    <p style={{
                                        fontSize: '1.3rem',
                                        color: 'rgba(255,255,255,0.9)',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                                        lineHeight: '1.6',
                                    }}>
                                        Cosmic clouds swirl and dance, creating the canvas of creation.
                                    </p>
                                </div>

                                {/* Phase 3 */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) scale(${0.8 + phase3Opacity * 0.2})`,
                                    opacity: phase3Opacity,
                                    transition: 'all 0.2s ease',
                                }}>
                                    <h3 style={{
                                        fontSize: '4.5rem',
                                        color: '#fed6e3',
                                        textShadow: '0 0 30px rgba(254,214,227,0.8), 0 10px 40px rgba(0,0,0,0.8)',
                                        fontWeight: '800',
                                        marginBottom: '20px',
                                        letterSpacing: '2px',
                                    }}>
                                        Galaxy Expansion
                                    </h3>
                                    <p style={{
                                        fontSize: '1.3rem',
                                        color: 'rgba(255,255,255,0.9)',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                                        lineHeight: '1.6',
                                    }}>
                                        Spiraling arms reach across the cosmos, building worlds.
                                    </p>
                                </div>

                                {/* Phase 4 */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) scale(${0.8 + phase4Opacity * 0.2})`,
                                    opacity: phase4Opacity,
                                    transition: 'all 0.2s ease',
                                }}>
                                    <h3 style={{
                                        fontSize: '4.5rem',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        textShadow: 'none',
                                        fontWeight: '800',
                                        marginBottom: '20px',
                                        letterSpacing: '2px',
                                        filter: 'drop-shadow(0 0 30px rgba(118,75,162,0.6))',
                                    }}>
                                        Cosmic Harmony
                                    </h3>
                                    <p style={{
                                        fontSize: '1.3rem',
                                        color: 'rgba(255,255,255,0.95)',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                                        lineHeight: '1.6',
                                    }}>
                                        The universe finds balance. Energy, matter, and time align.
                                    </p>
                                </div>
                            </div>

                            {/* Progress Indicator */}
                            <div style={{
                                position: 'absolute',
                                bottom: '40px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <div style={{
                                    width: '200px',
                                    height: '4px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '2px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${progress * 100}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)',
                                        boxShadow: '0 0 10px rgba(168,237,234,0.8)',
                                        transition: 'width 0.1s linear',
                                    }} />
                                </div>
                                <span style={{
                                    color: 'rgba(255,255,255,0.7)',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9rem',
                                }}>
                                    {Math.floor(progress * 100)}%
                                </span>
                            </div>
                        </div>
                    );
                }}
            </Scrollytelling>
        </React.Fragment>
    );
};
