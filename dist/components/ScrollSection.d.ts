import React from "react";
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
export declare const ScrollSection: React.FC<ScrollSectionProps>;
export {};
