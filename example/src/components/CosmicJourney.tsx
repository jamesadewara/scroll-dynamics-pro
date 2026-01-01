import React from 'react';
import { ScrollTransform, Scrollytelling, ScrollUtils } from 'scroll-dynamics-pro';

export const CosmicJourney = () => {
    return (
        <React.Fragment>
            <div style={{ padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 5%)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
                <ScrollTransform effect="fade">
                    <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '20px', fontWeight: '700' }}>Cosmic Journey</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>Experience the universe through scroll-driven storytelling.</p>
                </ScrollTransform>
            </div>

            <Scrollytelling height="500vh">
                {(progress: number) => {
                    const getPhaseOpacity = (start: number, end: number, fadeEdges = 0.1) => {
                        if (progress < start || progress > end) return 0;
                        const duration = end - start;
                        const localProgress = (progress - start) / duration;

                        if (localProgress < fadeEdges) {
                            return localProgress / fadeEdges;
                        }
                        if (localProgress > 1 - fadeEdges) {
                            return (1 - localProgress) / fadeEdges;
                        }
                        return 1;
                    };

                    const phase1Opacity = getPhaseOpacity(0.0, 0.25);
                    const phase2Opacity = getPhaseOpacity(0.25, 0.5);
                    const phase3Opacity = getPhaseOpacity(0.5, 0.75);
                    const phase4Opacity = getPhaseOpacity(0.75, 1.0);

                    // Dynamic vibrant background colors
                    const getBackgroundColor = () => {
                        if (progress < 0.25) {
                            const t = progress / 0.25;
                            return `rgb(${ScrollUtils.floor(10 + t * 30)}, ${ScrollUtils.floor(5 + t * 20)}, ${ScrollUtils.floor(20 + t * 40)})`;
                        } else if (progress < 0.5) {
                            const t = (progress - 0.25) / 0.25;
                            return `rgb(${ScrollUtils.floor(40 - t * 20)}, ${ScrollUtils.floor(25 + t * 50)}, ${ScrollUtils.floor(60 + t * 80)})`;
                        } else if (progress < 0.75) {
                            const t = (progress - 0.5) / 0.25;
                            return `rgb(${ScrollUtils.floor(20 + t * 30)}, ${ScrollUtils.floor(75 + t * 60)}, ${ScrollUtils.floor(140 - t * 20)})`;
                        } else {
                            const t = (progress - 0.75) / 0.25;
                            return `rgb(${ScrollUtils.floor(50 + t * 52)}, ${ScrollUtils.floor(135 - t * 25)}, ${ScrollUtils.floor(120 + t * 30)})`;
                        }
                    };

                    // Beautiful particle system
                    const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 60;
                    const particles = Array.from({ length: particleCount }, (_, i) => {
                        const angle = (i / particleCount) * ScrollUtils.PI * 2;
                        const distance = 100 + (i % 5) * 50;
                        const baseX = 50 + ScrollUtils.cos(angle) * (distance * progress * 0.5);
                        const baseY = 50 + ScrollUtils.sin(angle) * (distance * progress * 0.5);
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
                                    boxShadow: `0 0 ${size * 3}px ${i % 3 === 0 ? '#fff' : i % 3 === 1 ? '#a8edea' : '#fed6e3'}`,
                                    transform: `scale(${1 + progress * 2})`,
                                    transition: 'all 0.1s linear',
                                }}
                            />
                        );
                    });

                    // Glowing central orb
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

                            {/* Central Glowing Orb */}
                            <div style={{
                                position: 'absolute',
                                width: 'clamp(80px, 15vw, 150px)',
                                height: 'clamp(80px, 15vw, 150px)',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(168,237,234,0.5) 40%, transparent 100%)',
                                transform: `scale(${orbScale})`,
                                opacity: orbOpacity,
                                boxShadow: '0 0 80px rgba(255,255,255,0.8), 0 0 150px rgba(168,237,234,0.5)',
                                transition: 'all 0.1s linear',
                            }} />

                            {/* Radial gradient overlay for depth */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                                pointerEvents: 'none',
                            }} />

                            {/* Text Content */}
                            <div style={{ position: 'relative', zIndex: 10, width: '100%', textAlign: 'center', maxWidth: '900px', padding: 'clamp(2px, 4vw, 4px)' }}>
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) scale(${0.9 + phase1Opacity * 0.1})`,
                                    opacity: phase1Opacity,
                                    transition: 'all 0.2s ease',
                                }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '8px 20px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '50px',
                                        marginBottom: 'clamp(20px, 4vh, 30px)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1.5px solid rgba(255,255,255,0.25)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                    }}>
                                        <span style={{
                                            fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                                            color: '#fff',
                                            textTransform: 'uppercase',
                                            letterSpacing: '3px',
                                            fontWeight: '700',
                                        }}>
                                            Chapter I
                                        </span>
                                    </div>
                                    <h3 style={{
                                        fontSize: 'clamp(3rem, 9vw, 6rem)',
                                        color: '#fff',
                                        textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 8px 30px rgba(0,0,0,0.6), 0 0 60px rgba(255,255,255,0.3)',
                                        fontWeight: '900',
                                        marginBottom: 'clamp(20px, 4vh, 35px)',
                                        letterSpacing: '-2px',
                                        lineHeight: '1',
                                    }}>
                                        Birth of Stars
                                    </h3>
                                    <p style={{
                                        fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                                        color: '#fff',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)',
                                        lineHeight: '1.8',
                                        fontWeight: '400',
                                        maxWidth: '650px',
                                        margin: '0 auto',
                                    }}>
                                        From the void, light emerges. Energy coalesces into matter, the first stars burning bright against the cosmic canvas.
                                    </p>
                                </div>

                                {/* Phase 2 */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) scale(${0.9 + phase2Opacity * 0.1})`,
                                    opacity: phase2Opacity,
                                    transition: 'all 0.2s ease',
                                }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '8px 20px',
                                        background: 'rgba(168,237,234,0.15)',
                                        borderRadius: '50px',
                                        marginBottom: 'clamp(20px, 4vh, 30px)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1.5px solid rgba(168,237,234,0.4)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                    }}>
                                        <span style={{
                                            fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                                            color: '#a8edea',
                                            textTransform: 'uppercase',
                                            letterSpacing: '3px',
                                            fontWeight: '700',
                                        }}>
                                            Chapter II
                                        </span>
                                    </div>
                                    <h3 style={{
                                        fontSize: 'clamp(3rem, 9vw, 6rem)',
                                        color: '#a8edea',
                                        textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 8px 30px rgba(0,0,0,0.6), 0 0 60px rgba(168,237,234,0.5)',
                                        fontWeight: '900',
                                        marginBottom: 'clamp(20px, 4vh, 35px)',
                                        letterSpacing: '-2px',
                                        lineHeight: '1',
                                    }}>
                                        Nebula Formation
                                    </h3>
                                    <p style={{
                                        fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                                        color: '#fff',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)',
                                        lineHeight: '1.8',
                                        fontWeight: '400',
                                        maxWidth: '650px',
                                        margin: '0 auto',
                                    }}>
                                        Cosmic clouds swirl and dance. Dust and gas collide, compress, and ignite—creating nurseries where new worlds are born.
                                    </p>
                                </div>

                                {/* Phase 3 */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) scale(${0.9 + phase3Opacity * 0.1})`,
                                    opacity: phase3Opacity,
                                    transition: 'all 0.2s ease',
                                }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '8px 20px',
                                        background: 'rgba(254,214,227,0.15)',
                                        borderRadius: '50px',
                                        marginBottom: 'clamp(20px, 4vh, 30px)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1.5px solid rgba(254,214,227,0.4)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                    }}>
                                        <span style={{
                                            fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                                            color: '#fed6e3',
                                            textTransform: 'uppercase',
                                            letterSpacing: '3px',
                                            fontWeight: '700',
                                        }}>
                                            Chapter III
                                        </span>
                                    </div>
                                    <h3 style={{
                                        fontSize: 'clamp(3rem, 9vw, 6rem)',
                                        color: '#fed6e3',
                                        textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 8px 30px rgba(0,0,0,0.6), 0 0 60px rgba(254,214,227,0.5)',
                                        fontWeight: '900',
                                        marginBottom: 'clamp(20px, 4vh, 35px)',
                                        letterSpacing: '-2px',
                                        lineHeight: '1',
                                    }}>
                                        Galaxy Expansion
                                    </h3>
                                    <p style={{
                                        fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                                        color: '#fff',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)',
                                        lineHeight: '1.8',
                                        fontWeight: '400',
                                        maxWidth: '650px',
                                        margin: '0 auto',
                                    }}>
                                        Spiraling arms stretch across the void. Billions of stars dance in gravity's eternal choreography across light-years.
                                    </p>
                                </div>

                                {/* Phase 4 */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) scale(${0.9 + phase4Opacity * 0.1})`,
                                    opacity: phase4Opacity,
                                    transition: 'all 0.2s ease',
                                }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '8px 20px',
                                        background: 'rgba(102,126,234,0.15)',
                                        borderRadius: '50px',
                                        marginBottom: 'clamp(20px, 4vh, 30px)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1.5px solid rgba(102,126,234,0.4)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                    }}>
                                        <span style={{
                                            fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                                            color: '#667eea',
                                            textTransform: 'uppercase',
                                            letterSpacing: '3px',
                                            fontWeight: '700',
                                        }}>
                                            Chapter IV
                                        </span>
                                    </div>
                                    <h3 style={{
                                        fontSize: 'clamp(3rem, 9vw, 6rem)',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontWeight: '900',
                                        marginBottom: 'clamp(20px, 4vh, 35px)',
                                        letterSpacing: '-2px',
                                        lineHeight: '1',
                                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8)) drop-shadow(0 0 60px rgba(118,75,162,0.6))',
                                    }}>
                                        Cosmic Harmony
                                    </h3>
                                    <p style={{
                                        fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                                        color: '#fff',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)',
                                        lineHeight: '1.8',
                                        fontWeight: '400',
                                        maxWidth: '650px',
                                        margin: '0 auto',
                                    }}>
                                        The universe finds balance. Energy, matter, space, and time align—a cosmic symphony across infinite existence.
                                    </p>
                                </div>
                            </div>

                            {/* Progress Indicator */}
                            <div style={{
                                position: 'absolute',
                                bottom: 'clamp(30px, 5vh, 50px)',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <div style={{
                                    width: 'clamp(180px, 35vw, 250px)',
                                    height: '3px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '2px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${progress * 100}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)',
                                        boxShadow: '0 0 15px rgba(168,237,234,0.9)',
                                        transition: 'width 0.1s linear',
                                    }} />
                                </div>
                                <span style={{
                                    color: 'rgba(255,255,255,0.7)',
                                    fontFamily: 'monospace',
                                    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                                    letterSpacing: '1px',
                                }}>
                                    {ScrollUtils.floor(progress * 100)}%
                                </span>
                            </div>
                        </div>
                    );
                }}
            </Scrollytelling>
        </React.Fragment>
    );
};
