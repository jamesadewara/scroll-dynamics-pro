import React, { useRef, useEffect } from "react";
import { useScroll } from "../context/ScrollContext";
import { ScrollUtils } from "../utils/math";

interface ScrollTransformProps {
    children: React.ReactNode;
    /**
     * The effect to apply.
     * 'parallax': Moves the element at a different speed than scroll.
     * 'fade': Changes opacity from 0 to 1 based on entry.
     * 'scale': Scales element from start scale to end scale.
     * 'skew-velocity': Skews the element based on global scroll velocity.
     * 'rotate': Rotates the element based on scroll progress.
     * 'slide-in': Slides the element in from a direction.
     * 'custom': Use the `transform` prop function.
     */
    effect?: "parallax" | "fade" | "scale" | "skew-velocity" | "rotate" | "rotate-x" | "rotate-y" | "slide-in" | "blur" | "hue-rotate" | "custom";
    /**
     * For parallax: speed factor.
     * 0.5 = moves at half speed.
     * -0.5 = moves in reverse.
     */
    speed?: number;
    /**
     * Multiplier for effect intensity (e.g. max skew angle, rotation degrees, slide distance).
     * Default: 1
     */
    intensity?: number;
    /**
     * Direction for slide-in or other directional effects.
     */
    direction?: "up" | "down" | "left" | "right";
    /**
     * For fade/scale: input range [start, end] as generic progress 0..1 (viewport relative).
     * default: [0, 1] meaning full viewport traversal.
     */
    range?: [number, number];
    /**
     * For custom effect: A function that receives progress (0..1) or scrollY and applies style.
     * Warning: Keep this performant. direct DOM manipulation recommended.
     */
    transform?: (element: HTMLElement, progress: number, scrollY: number, velocity: number) => void;
    /**
     * Callback fired when element enters the viewport.
     */
    onEnter?: () => void;
    /**
     * Callback fired when element leaves the viewport.
     */
    onLeave?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const ScrollTransform: React.FC<ScrollTransformProps> = ({
    children,
    effect = "parallax",
    speed = 0.2, // Subtle parallax by default
    intensity = 1,
    direction = "up",
    range = [0, 1],
    transform,
    onEnter,
    onLeave,
    className,
    style,
}) => {
    const { subscribe } = useScroll();
    const elementRef = useRef<HTMLDivElement>(null);
    const isVisibleRef = useRef(false);
    const initialTopRef = useRef<number>(0);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = isVisibleRef.current;
                isVisibleRef.current = entry.isIntersecting;

                if (entry.isIntersecting) {
                    if (!wasVisible && onEnter) onEnter();

                    // Optimization: When becoming visible, recalculate layout if needed
                    if (elementRef.current) {
                        const rect = elementRef.current.getBoundingClientRect();
                        initialTopRef.current = rect.top + window.scrollY;
                    }
                } else {
                    if (wasVisible && onLeave) onLeave();
                }
            },
            { threshold: 0 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        return subscribe((scrollY, velocity) => {
            if (!isVisibleRef.current || !elementRef.current) return;

            const element = elementRef.current;
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate progress: 0 when top of element enters bottom of viewport
            // 1 when bottom of element leaves top of viewport
            // Total travel distance = viewportHeight + element.offsetHeight
            const totalTravel = viewportHeight + rect.height;
            const currentPos = viewportHeight - rect.top;
            const rawProgress = currentPos / totalTravel; // 0..1 roughly

            // Apply Range: map [range[0], range[1]] to [0, 1]
            const [rStart, rEnd] = range;
            let progress = 0;
            if (rStart === rEnd) {
                progress = rawProgress >= rStart ? 1 : 0;
            } else {
                progress = ScrollUtils.clamp((rawProgress - rStart) / (rEnd - rStart), 0, 1);
            }

            if (effect === "parallax") {
                const offset = (rect.top - (viewportHeight / 2)) * speed;
                element.style.transform = `translateY(${offset}px)`;

            } else if (effect === "fade") {
                // Opacity 0 -> 1 based on progress
                element.style.opacity = progress.toString();
                // Optional: translateY for "slide up" feel if intensity > 0
                if (intensity > 0) {
                    element.style.transform = `translateY(${(1 - progress) * 20 * intensity}px)`;
                }

            } else if (effect === "scale") {
                const scale = 0.8 + (0.2 * ScrollUtils.clamp(progress, 0, 1)) * intensity;
                element.style.transform = `scale(${scale})`;

            } else if (effect === "skew-velocity") {
                // Max skew 15 degrees * intensity
                const maxSkew = 15 * intensity;
                // velocity is roughly pixels per frame. 
                const skew = ScrollUtils.max(-maxSkew, ScrollUtils.min(maxSkew, velocity * 0.1));
                // Optional stretch
                const scaleY = 1 + ScrollUtils.min(0.2, ScrollUtils.abs(velocity * 0.0005) * intensity);

                element.style.transform = `skewY(${skew}deg) scaleY(${scaleY})`;

            } else if (effect === "rotate") {
                // Rotate based on progress (0 -> 1)
                // -360 to 360 based on intensity?
                // logic: center is 0 rotation.
                // intensity 1 = 1 full rotation across viewport? Maybe too much.
                // Let's say intensity 1 = 45 degrees.
                const deg = (progress - 0.5) * 2 * (45 * intensity);
                element.style.transform = `rotate(${deg}deg)`;

            } else if (effect === "rotate-x") {
                // 3D Flip X
                const deg = (0.5 - progress) * 2 * (45 * intensity); // 45deg -> -45deg
                element.style.transform = `perspective(1000px) rotateX(${deg}deg)`;

            } else if (effect === "rotate-y") {
                // 3D Flip Y
                const deg = (progress - 0.5) * 2 * (45 * intensity);
                element.style.transform = `perspective(1000px) rotateY(${deg}deg)`;

            } else if (effect === "slide-in") {
                // Slide from 100px (intensity) -> 0
                if (progress >= 1) {
                    element.style.transform = 'none';
                    element.style.opacity = '1';
                } else {
                    const dist = 100 * intensity;
                    const val = (1 - progress) * dist;
                    element.style.opacity = progress.toString();

                    if (direction === 'up') element.style.transform = `translateY(${val}px)`;
                    else if (direction === 'down') element.style.transform = `translateY(${-val}px)`;
                    else if (direction === 'left') element.style.transform = `translateX(${val}px)`;
                    else if (direction === 'right') element.style.transform = `translateX(${-val}px)`;
                }

            } else if (effect === "blur") {
                // blur(10px) -> blur(0)
                const px = (1 - progress) * 10 * intensity;
                element.style.filter = `blur(${px}px)`;
                element.style.opacity = progress.toString();

            } else if (effect === "hue-rotate") {
                // 0 -> 360deg
                const deg = progress * 360 * intensity;
                element.style.filter = `hue-rotate(${deg}deg)`;

            } else if (effect === "custom" && transform) {
                transform(element, progress, scrollY, velocity);
            }
        });
    }, [effect, speed, intensity, direction, range, transform, subscribe]);

    return (
        <div ref={elementRef} className={className} style={{ willChange: 'transform, opacity', ...style }}>
            {children}
        </div>
    );
};
