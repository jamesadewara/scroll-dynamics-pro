import { useState, useEffect, RefObject } from 'react';
import { useScroll } from '../context/ScrollContext';
import { ScrollUtils } from '../utils/math';

export const useScrollProgress = (ref: RefObject<HTMLElement>) => {
    const [progress, setProgress] = useState(0);
    const { subscribe } = useScroll();

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let isActive = false;
        let rectCache = { top: 0, height: 0, windowHeight: 0 };

        // 1. IntersectionObserver to detect when section enters viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                isActive = entry.isIntersecting;
                // Update layout cache when intersection changes (optimistic)
                if (isActive) {
                    const rect = element.getBoundingClientRect();
                    const scrollTop = window.scrollY || window.pageYOffset;
                    rectCache = {
                        top: rect.top + scrollTop,
                        height: rect.height,
                        windowHeight: window.innerHeight
                    };
                    // Force an initial update in case we are in the middle
                    // handleScroll(scrollTop); // logic moved to subscriber
                }
            },
            { threshold: 0 } // minimal threshold to catch any part
        );

        observer.observe(element);

        // 2. Scroll Subscriber (single listener via Context)
        const unsubscribe = subscribe((scrollY) => {
            if (!isActive) return;

            // Optional: Recalculate metrics if needed? 
            // For rigorous scrollytelling, we might trust cached vals or read fresh if performant.
            // Let's use cached 'top' but maybe re-read windowHeight if generic resize isn't handled.
            // For now, simple logic:

            // Calculate progress
            // Start: When top of element touches top of viewport? 
            // OR: When top of element touches bottom?
            // "Scrollytelling" usually means: Sticky container.
            // Progress 0: Sticky starts (element top at viewport top).
            // Progress 1: Sticky ends (element bottom at viewport bottom?).

            // Standard Formula for a sticky container that is TALLER than viewport:
            // The "scrollable distance" is (elementHeight - windowHeight).
            // Progress = (scrollY - elementTop) / (elementHeight - windowHeight).

            const start = rectCache.top;
            const distance = rectCache.height - rectCache.windowHeight;

            if (distance <= 0) return; // Not scrollable (shorter than viewport)

            let p = (scrollY - start) / distance;

            // Clone clamp behavior
            p = ScrollUtils.clamp(p, 0, 1);

            setProgress(p);
        });

        return () => {
            observer.disconnect();
            unsubscribe();
        };
    }, [ref, subscribe]);

    return progress;
};
