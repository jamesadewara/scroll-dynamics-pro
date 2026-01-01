/**
 * Collection of utility functions for scroll calculations.
 */
export const ScrollUtils = {
    /**
     * Clamps a number between a minimum and maximum value.
     */
    clamp: (value: number, min: number, max: number): number => {
        return Math.min(max, Math.max(min, value));
    },

    /**
     * Maps a value from one range to another.
     * @param value - The incoming value.
     * @param inMin - Lower bound of the input range.
     * @param inMax - Upper bound of the input range.
     * @param outMin - Lower bound of the output range.
     * @param outMax - Upper bound of the output range.
     */
    mapRange: (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
        return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
    },

    /**
     * Linear interpolation between two values.
     */
    lerp: (start: number, end: number, t: number): number => {
        return start * (1 - t) + end * t;
    },

    abs: (value: number): number => Math.abs(value),
    min: (...values: number[]): number => Math.min(...values),
    max: (...values: number[]): number => Math.max(...values),

    /**
     * Rounds down to the nearest integer.
     */
    floor: (value: number): number => Math.floor(value),

    /**
     * Returns the cosine of an angle (in radians).
     */
    cos: (angle: number): number => Math.cos(angle),

    /**
     * Returns the sine of an angle (in radians).
     */
    sin: (angle: number): number => Math.sin(angle),

    /**
     * The mathematical constant PI (π).
     */
    PI: Math.PI
};
