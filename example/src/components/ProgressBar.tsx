import React, { useEffect, useRef } from 'react';
import { useScroll, ScrollUtils } from 'scroll-dynamics-pro';

export const ProgressBar: React.FC = () => {
    const { subscribe } = useScroll();

    // We use a local ref to store the latest value to decouple the subscriber 
    // from React state updates if we want to throttle, but for a progress bar
    // we want visual smoothness. 
    // However, updating state on every scroll event (60fps) is heavy.
    // Ideally we update a ref for DOM, but here we show a simple state approach 
    // or direct DOM manipulation for strict performance.

    // Let's use direct DOM manipulation for maximum performance example!
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return subscribe((scrollY: number) => {
            // Calculate total scrollable height
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const p = ScrollUtils.clamp(scrollY / totalHeight, 0, 1);

            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${p})`;
            }
        });
    }, [subscribe]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '6px',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 1000
        }}>
            <div
                ref={barRef}
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#e056fd',
                    transformOrigin: '0 50%',
                    transform: 'scaleX(0)',
                    willChange: 'transform'
                }}
            />
        </div>
    );
};
