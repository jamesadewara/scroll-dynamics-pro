import React from 'react';
import { ScrollSection, ScrollTransform, ScrollUtils } from 'scroll-dynamics-pro';

export const FixedBackgroundStory: React.FC = () => {
    return (
        // Outer container defines the total scroll distance
        <ScrollSection style={{ height: '300vh', position: 'relative' }}>

            {/* 
        Sticky Background 
        This element stays fixed in the viewport while we scroll through the 300vh container.
      */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                background: 'radial-gradient(circle at center, #222f3e, #000000)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
            }}>
                <ScrollTransform effect="scale" range={[0, 1]}>
                    <div style={{
                        width: '60vw',
                        height: '60vw',
                        background: 'radial-gradient(circle, rgba(224, 86, 253, 0.2) 0%, rgba(0,0,0,0) 70%)',
                        borderRadius: '50%',
                    }} />
                </ScrollTransform>
            </div>

            {/* 
        Scrolling Content Layer
        This sits on top (z-index 2) and scrolls naturally.
        We position items vertically to appear at different scroll points.
      */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 2,
                pointerEvents: 'none' // Let scroll pass through if needed, though mostly text
            }}>

                {/* Story Part 1: Enters immediately */}
                <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ScrollTransform effect="fade">
                        <h2 style={{ fontSize: '4rem', color: 'white', textShadow: '0 4px 20px black' }}>The Beginning</h2>
                    </ScrollTransform>
                </div>

                {/* Story Part 2 */}
                <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10%' }}>
                    <ScrollTransform effect="slide-in" direction="right" intensity={0.5}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '8px', maxWidth: '400px', color: '#fff' }}>
                            <h3>Part II: The Slide</h3>
                            <p>As you scroll deeper, the background stays rooted, anchoring the experience.</p>
                        </div>
                    </ScrollTransform>
                </div>

                {/* Story Part 3 */}
                <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10%' }}>
                    <ScrollTransform effect="custom" transform={(el: HTMLElement, p: number) => {
                        // Slide in from right and rotate
                        const translate = ScrollUtils.lerp(100, 0, p);
                        el.style.transform = `translateX(${translate}px) rotate(${translate * 0.1}deg)`;
                        el.style.opacity = p.toString();
                    }}>
                        <div style={{ background: 'rgba(255,107,129,0.2)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '8px', maxWidth: '400px', color: '#fff' }}>
                            <h3>Part III: The Twist</h3>
                            <p>Elements can enter from any direction, creating a dynamic narrative flow.</p>
                        </div>
                    </ScrollTransform>
                </div>

            </div>
        </ScrollSection>
    );
};
