import React, { useRef, useEffect } from 'react';
import { useScroll, ScrollUtils } from 'scroll-dynamics-pro';
import { Link, useLocation } from 'react-router-dom';

export const Nav: React.FC = () => {
    const { subscribe } = useScroll();
    const navRef = useRef<HTMLElement>(null);
    const location = useLocation();

    useEffect(() => {
        return subscribe((scrollY: number) => {
            if (navRef.current) {
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
                padding: 'clamp(15px, 3vw, 20px) clamp(20px, 4vw, 40px)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'padding 0.3s',
                willChange: 'background-color, backdrop-filter',
                backgroundColor: 'rgba(0,0,0,0)',
            }}
        >
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <div style={{ fontWeight: 800, fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', letterSpacing: '-0.05em' }}>
                    Scroll<span style={{ color: '#e056fd' }}>Dynamics</span>
                </div>
            </Link>

            <div style={{ display: 'flex', gap: 'clamp(15px, 3vw, 30px)', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', fontWeight: 500 }}>
                <Link to="/" style={{ color: location.pathname === '/' ? '#e056fd' : 'white', textDecoration: 'none' }}>Showcase</Link>
                <Link to="/docs" style={{ color: location.pathname === '/docs' ? '#e056fd' : 'white', textDecoration: 'none' }}>Documentation</Link>
                <a href="https://github.com/jamesadewara/scroll-dynamics-pro" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>GitHub</a>
            </div>
        </nav>
    );
};
