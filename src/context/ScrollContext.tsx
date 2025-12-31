import React, { createContext, useContext, useEffect, useRef } from "react";

type ScrollCallback = (scrollY: number, velocity: number) => void;

interface ScrollContextValue {
    subscribe: (callback: ScrollCallback) => () => void;
    getScrollY: () => number;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const listenersRef = useRef<Set<ScrollCallback>>(new Set());
    const scrollYRef = useRef<number>(0);
    const tickingRef = useRef<boolean>(false);

    // Core Upgrade: Track velocity
    const previousScrollYRef = useRef<number>(0);

    useEffect(() => {
        // Initial scroll position
        if (typeof window !== "undefined") {
            scrollYRef.current = window.scrollY;
            previousScrollYRef.current = window.scrollY;
        }

        const update = () => {
            const currentScroll = window.scrollY;
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

        window.addEventListener("scroll", requestTick, { passive: true });
        window.addEventListener("resize", requestTick, { passive: true });

        return () => {
            window.removeEventListener("scroll", requestTick);
            window.removeEventListener("resize", requestTick);
        };
    }, []);

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
