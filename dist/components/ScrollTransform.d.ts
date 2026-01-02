import React from "react";
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
export declare const ScrollTransform: React.FC<ScrollTransformProps>;
export {};
