import React from 'react';
import { ScrollSection, ScrollTransform, ScrollUtils } from 'scroll-dynamics-pro';

export const GridShowcase: React.FC = () => {
    // Generate dummy data
    const items = Array.from({ length: 8 }, (_, i) => i + 1);

    return (
        <ScrollSection style={{ background: '#222f3e', color: '#fff', padding: '100px 5%' }}>

            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <ScrollTransform effect="fade">
                    <h2 style={{ fontSize: '3rem' }}>Staggered Grids</h2>
                </ScrollTransform>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {items.map((num, index) => (
                    <ScrollTransform
                        key={index}
                        effect="custom"
                        transform={(el: HTMLElement, p: number) => {
                            // STAGGERED ENTRANCE
                            // We can simulate stagger by using the index.
                            // Usually this is done by Delay.
                            // We can do manual "staggered threshold" logic:
                            // We want the element to start moving LATER based on index?
                            // Or simpler: Just set transition-delay via style!

                            // Reveal logic: Slide up and fade in
                            // p: 0 (bottom of viewport) -> 1 (top of viewport)
                            // entry is usually around 0 to 0.3 depending on element height.

                            // Let's use standard sliding but with css transition-delay applied ONCE.
                            // But ScrollTransform drives the style every frame. 
                            // Better: Use `transform` to offset P based on index?
                            // e.g. effectiveP = p - (index * 0.02)

                            const stagger = index * 0.05;
                            const effectiveP = ScrollUtils.max(0, (p * 2) - stagger); // accelerate * 2
                            const clamped = ScrollUtils.min(1, effectiveP);

                            const y = (1 - clamped) * 100;
                            el.style.opacity = clamped.toString();
                            el.style.transform = `translateY(${y}px)`;
                        }}
                    >
                        <div style={{
                            height: '200px',
                            background: `hsl(${200 + index * 10}, 70%, 50%)`,
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
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
