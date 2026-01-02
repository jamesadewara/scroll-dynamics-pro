/**
 * Collection of utility functions for scroll calculations.
 */
export declare const ScrollUtils: {
    /**
     * Clamps a number between a minimum and maximum value.
     */
    clamp: (value: number, min: number, max: number) => number;
    /**
     * Maps a value from one range to another.
     * @param value - The incoming value.
     * @param inMin - Lower bound of the input range.
     * @param inMax - Upper bound of the input range.
     * @param outMin - Lower bound of the output range.
     * @param outMax - Upper bound of the output range.
     */
    mapRange: (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => number;
    /**
     * Linear interpolation between two values.
     */
    lerp: (start: number, end: number, t: number) => number;
    abs: (value: number) => number;
    min: (...values: number[]) => number;
    max: (...values: number[]) => number;
    /**
     * Rounds down to the nearest integer.
     */
    floor: (value: number) => number;
    /**
     * Returns the cosine of an angle (in radians).
     */
    cos: (angle: number) => number;
    /**
     * Returns the sine of an angle (in radians).
     */
    sin: (angle: number) => number;
    /**
     * The mathematical constant PI (π).
     */
    PI: number;
};
