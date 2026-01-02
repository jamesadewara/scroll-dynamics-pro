import React from "react";
type ScrollCallback = (scrollY: number, velocity: number) => void;
interface ScrollContextValue {
    subscribe: (callback: ScrollCallback) => () => void;
    getScrollY: () => number;
}
export declare const ScrollProvider: React.FC<{
    children: React.ReactNode;
    containerRef?: React.RefObject<HTMLElement>;
}>;
export declare const useScroll: () => ScrollContextValue;
export {};
