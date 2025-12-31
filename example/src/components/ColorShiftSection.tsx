import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const ColorShiftSection: React.FC = () => {
    // We'll use a wrapper diving whose background we manipulate locally
    return (
        <ScrollSection style={{ position: 'relative' }}>
            {/* Dynamic Background Layer */}
            <ScrollTransform effect="hue-rotate" intensity={1} style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,
                backgroundColor: '#2d3436' // Base color
            }}>
                <div style={{ width: '100%', height: '100%' }} />
            </ScrollTransform>

            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '4rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Dynamic Colors</h2>
                <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>
                    Background changes HSL hue based on scroll progress.
                </p>
                <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                    <code>effect="hue-rotate"</code>
                </div>
            </div>
        </ScrollSection>
    );
};
