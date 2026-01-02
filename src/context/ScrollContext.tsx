import React, { createContext, useContext, useEffect, useRef } from "react";

type ScrollCallback = (scrollY: number, velocity: number) => void;

interface ScrollContextValue {
    subscribe: (callback: ScrollCallback) => () => void;
    getScrollY: () => number;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export const ScrollProvider: React.FC<{ children: React.ReactNode; containerRef?: React.RefObject<HTMLElement> }> = ({
    children,
    containerRef,
}) => {
    const listenersRef = useRef<Set<ScrollCallback>>(new Set());
    const scrollYRef = useRef<number>(0);
    const tickingRef = useRef<boolean>(false);

    // Core Upgrade: Track velocity
    const previousScrollYRef = useRef<number>(0);

    useEffect(() => {
        const target = containerRef?.current || (typeof window !== "undefined" ? window : null);
        if (!target) return;

        const getScrollPosition = () => {
            if (target instanceof Window) {
                return target.scrollY;
            }
            return (target as HTMLElement).scrollTop;
        };

        // Initial scroll position
        const initialScroll = getScrollPosition();
        scrollYRef.current = initialScroll;
        previousScrollYRef.current = initialScroll;


        const update = () => {
            const currentScroll = getScrollPosition();
            const velocity = currentScroll - previousScrollYRef.current;

            scrollYRef.current = currentScroll;
            previousScrollYRef.current = currentScroll;

            listenersRef.current.forEach((cb) => cb(scrollYRef.current, velocity));
            tickingRef.current = false;
        };

        const requestTick = () => {
            if (!tickingRef.current) {
                requestAnimationFrame(update);
                tickingRef.current = true;
            }
        };

        target.addEventListener("scroll", requestTick, { passive: true });
        if (target instanceof Window) {
            target.addEventListener("resize", requestTick, { passive: true });
        }

        return () => {
            target.removeEventListener("scroll", requestTick);
            if (target instanceof Window) {
                target.removeEventListener("resize", requestTick);
            }
        };
    }, [containerRef]);

    const subscribe = (callback: ScrollCallback) => {
        listenersRef.current.add(callback);
        // Immediately call with current value
        callback(scrollYRef.current, 0);
        return () => {
            listenersRef.current.delete(callback);
        };
    };

    const getScrollY = () => scrollYRef.current;

    return (
        <ScrollContext.Provider value={{ subscribe, getScrollY }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error("useScroll must be used within a ScrollProvider");
    }
    return context;
};
