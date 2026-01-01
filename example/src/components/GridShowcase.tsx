import React from 'react';
import { ScrollSection, ScrollTransform, ScrollUtils } from 'scroll-dynamics-pro';

export const GridShowcase: React.FC = () => {
    // Generate dummy data
    const items = Array.from({ length: 8 }, (_, i) => i + 1);

    return (
        <ScrollSection style={{ background: '#222f3e', color: '#fff', padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 5%)' }}>

            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vh, 80px)' }}>
                <ScrollTransform effect="fade">
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Staggered Grids</h2>
                </ScrollTransform>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 'clamp(15px, 3vw, 20px)',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {items.map((num, index) => (
                    <ScrollTransform
                        key={index}
                        effect="custom"
                        transform={(el: HTMLElement, p: number) => {
                            // Simplified stagger logic
                            const stagger = index * 0.05;
                            const effectiveP = ScrollUtils.clamp((p * 2) - stagger, 0, 1);
                            const y = (1 - effectiveP) * 100;
                            el.style.opacity = effectiveP.toString();
                            el.style.transform = `translateY(${y}px)`;
                        }}
                    >
                        <div style={{
                            height: 'clamp(150px, 30vw, 200px)',
                            background: `hsl(${200 + index * 10}, 70%, 50%)`,
                            borderRadius: 'clamp(6px, 2vw, 8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            fontWeight: 'bold'
                        }}>
                            {num}
                        </div>
                    </ScrollTransform>
                ))}
            </div>

        </ScrollSection>
    );
};
