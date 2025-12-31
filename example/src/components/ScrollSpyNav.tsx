import React, { useRef, useEffect } from 'react';
import { useScroll, ScrollUtils } from 'scroll-dynamics-pro';

export const ScrollSpyNav: React.FC = () => {
    const { subscribe } = useScroll();
    const navRef = useRef<HTMLElement>(null);

    // We can change style directly for performance, or state for simple class toggles
    // Let's use direct style manipulation for background opacity

    useEffect(() => {
        return subscribe((scrollY: number) => {
            if (navRef.current) {

                // Fade in background after 100px
                const opacity = ScrollUtils.clamp(ScrollUtils.mapRange(scrollY, 50, 250, 0, 1), 0, 1);
                navRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity * 0.9})`;
                navRef.current.style.backdropFilter = `blur(${opacity * 10}px)`;
                navRef.current.style.borderBottom = `1px solid rgba(255,255,255,${opacity * 0.1})`;
            }
        });
    }, [subscribe]);

    return (
        <nav
            ref={navRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '20px 40px',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'padding 0.3s',
                willChange: 'background-color, backdrop-filter',
                // Initial state
                backgroundColor: 'rgba(0,0,0,0)',
            }}
        >
            <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>
                Scroll<span style={{ color: '#e056fd' }}>Dynamics</span>
            </div>

            <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem', fontWeight: 500 }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Guide</a>
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Examples</a>
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Docs</a>
            </div>
        </nav>
    );
};
