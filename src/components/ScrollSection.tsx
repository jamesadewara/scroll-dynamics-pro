import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useScroll } from "../context/ScrollContext";
import { ScrollUtils } from "../utils/math";

interface ScrollSectionProps {
    /**
     * Direction of scrolling effect.
     * 'horizontal': The content inside will scroll horizontally as the user scrolls down.
     * 'vertical': Standard vertical scrolling (pass-through mostly, or parallax hook).
     * Currently optimized for 'horizontal' (mixed) flow.
     */
    direction?: "horizontal" | "vertical";
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Only for horizontal direction:
     * The width of the track relative to viewport width.
     * e.g., '300vw' means the section will take 3 viewports to scroll through.
     */
    trackLength?: string;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
    direction = "vertical",
    children,
    className,
    style,
    trackLength = "300vw",
}) => {
    const { subscribe } = useScroll();
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isVisibleRef = useRef(false);

    // We use IntersectionObserver to only update when needed
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0 } // Trigger as soon as 1px is visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Optimization: Cache layout metrics to avoid reflows in the loop
    const metricsRef = useRef({
        offsetTop: 0,
        trackHeight: 0,
        windowHeight: 0,
        scrollWidth: 0,
        windowWidth: 0
    });

    // Updates metrics on resize or mount
    useEffect(() => {
        if (direction !== "horizontal") return;

        const updateMetrics = () => {
            if (containerRef.current && trackRef.current) {
                // We need absolute offsetTop relative to document.
                // rect.top + window.scrollY is usually good enough.
                const rect = containerRef.current.getBoundingClientRect();
                const scrollTop = window.scrollY || window.pageYOffset;

                metricsRef.current = {
                    offsetTop: rect.top + scrollTop,
                    trackHeight: rect.height,
                    windowHeight: window.innerHeight,
                    scrollWidth: trackRef.current.scrollWidth,
                    windowWidth: window.innerWidth
                };
            }
        };

        updateMetrics(); // Initial
        window.addEventListener("resize", updateMetrics);
        return () => window.removeEventListener("resize", updateMetrics);
    }, [direction, children]); // Re-calc if children change size?

    // Main scroll logic
    useEffect(() => {
        if (direction !== "horizontal") return;

        return subscribe((scrollY) => {
            if (!isVisibleRef.current || !containerRef.current || !trackRef.current) return;

            const { offsetTop, trackHeight, windowHeight, scrollWidth, windowWidth } = metricsRef.current;

            // Calculate where the top of the container is relative to the viewport
            const currentTop = offsetTop - scrollY;

            // Progress calculation
            // When currentTop is 0, we are at the start of sticky.
            // We want to move from 0 to 1 as we scroll down `trackHeight - windowHeight` pixels.
            // Denominator is the scrollable distance of the container.
            const scrollableDistance = trackHeight - windowHeight;
            if (scrollableDistance <= 0) return; // Short section, no scroll needed

            const progress = -currentTop / scrollableDistance;
            const clampedProgress = ScrollUtils.clamp(progress, 0, 1);

            const maxTranslate = scrollWidth - windowWidth;

            if (maxTranslate > 0) {
                const x = clampedProgress * maxTranslate;
                trackRef.current.style.transform = `translateX(-${x}px)`;
            }
        });
    }, [direction, subscribe]);

    // Continuity check on mount (using useLayoutEffect to prevent jump)
    useLayoutEffect(() => {
        if (direction === "horizontal" && containerRef.current && trackRef.current) {
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const progress = -rect.top / (rect.height - window.innerHeight);
            const clampedProgress = ScrollUtils.clamp(progress, 0, 1);
            const track = trackRef.current;
            const maxTranslate = track.scrollWidth - window.innerWidth;

            if (maxTranslate > 0) {
                track.style.transform = `translateX(-${clampedProgress * maxTranslate}px)`;
            }
        }
    }, [direction]);

    if (direction === "vertical") {
        // Just a wrapper for normal flow
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }

    // Horizontal implementation using sticky
    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: "relative",
                height: trackLength, // Make the container tall
                ...style,
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <div
                    ref={trackRef}
                    style={{
                        height: "100%",
                        display: "flex", // Assume children stack horizontally
                        willChange: "transform",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
