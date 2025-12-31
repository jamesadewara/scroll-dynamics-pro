import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const EffectsShowcase: React.FC = () => {
    return (
        <ScrollSection className="effects-section" style={{ minHeight: '150vh', background: '#111', padding: '100px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>

                <ScrollTransform effect="fade">
                    <h2 style={{ fontSize: '3rem', marginBottom: '50px' }}>Advanced Effects</h2>
                </ScrollTransform>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                    <ScrollTransform effect="scale">
                        <div style={{ height: '300px', background: '#222', borderRadius: '12px', padding: '20px' }}>
                            <h3>Scale In</h3>
                            <p>Scales up as it enters the viewport.</p>
                        </div>
                    </ScrollTransform>

                    <ScrollTransform effect="custom" transform={(el: HTMLElement, p: number) => {
                        el.style.transform = `translateY(${p * 50}px) rotate(${p * 10}deg)`;
                        el.style.opacity = (1 - p).toString(); // Fade out as it leaves
                    }}>
                        <div style={{ height: '300px', background: '#e056fd', borderRadius: '12px', padding: '20px', color: 'black' }}>
                            <h3>Custom Transform</h3>
                            <p>Rotates and translates via custom function.</p>
                        </div>
                    </ScrollTransform>

                </div>
            </div>
        </ScrollSection>
    );
};
