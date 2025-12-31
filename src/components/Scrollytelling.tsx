import React, { useRef } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

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

export const Scrollytelling: React.FC<ScrollytellingProps> = ({
    height = '300vh',
    children,
    className,
    style
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = useScrollProgress(containerRef);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                height,
                position: 'relative',
                ...style
            }}
        >
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100%',
                overflow: 'hidden'
            }}>
                {children(progress)}
            </div>
        </div>
    );
};
