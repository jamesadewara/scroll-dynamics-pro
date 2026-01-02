import React from 'react';
interface ScrollytellingProps {
    /**
     * Total height of the scrollable track (e.g. '300vh').
     */
    height?: string | number;
    /**
     * Render prop function receiving progress (0 to 1).
     */
    children: (progress: number) => React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Scrollytelling: React.FC<ScrollytellingProps>;
export {};
