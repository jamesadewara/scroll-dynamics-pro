import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const HorizontalGallery: React.FC = () => {
    return (
        <ScrollSection direction="horizontal" trackLength="300vw">
            <div style={{ display: 'flex', height: '100vh', width: '300vw', alignItems: 'center' }}>

                {/* Slide 1 */}
                <div style={{ width: '100vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ScrollTransform effect="scale" range={[0, 0.5]}>
                        <div className="card">
                            <h2>Horizontal Scrolling</h2>
                            <p>Native smooth scrolling with sticky positioning.</p>
                        </div>
                    </ScrollTransform>
                </div>

                {/* Slide 2 */}
                <div style={{ width: '100vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ScrollTransform effect="parallax" speed={-0.1}>
                        <div className="card" style={{ background: '#222' }}>
                            <h2>Parallax Cards</h2>
                            <p>This card moves slightly against the scroll direction.</p>
                        </div>
                    </ScrollTransform>
                </div>

                {/* Slide 3 */}
                <div style={{ width: '100vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="card" style={{ background: '#333' }}>
                        <h2>The End</h2>
                    </div>
                </div>

            </div>
        </ScrollSection>
    );
};
