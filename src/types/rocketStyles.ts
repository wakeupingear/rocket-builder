export type Color = [string, number];

export type RocketStyle = {
    stages: {
        fuel: Color;
        oxidizer: Color;
        bulkhead: Color;
        interstage?: Color;
    }[];
    engines: Color[];
};

export const DEFAULT_ROCKET_STYLE: RocketStyle = {
    stages: [
        {
            fuel: ['purple', 1],
            oxidizer: ['green', 1],
            bulkhead: ['orange', 0.6],
        },
        {
            fuel: ['purple', 1],
            oxidizer: ['green', 1],
            bulkhead: ['red', 0.6],
        },
        {
            fuel: ['purple', 1],
            oxidizer: ['green', 1],
            bulkhead: ['blue', 0.6],
        },
    ],
    engines: [
        ['yellow', 1],
        ['red', 1],
        ['blue', 1],
        ['green', 1],
        ['purple', 1],
        ['orange', 1],
    ],
};

export const colorProps = (color: Color) => ({
    color: color[0],
    opacity: color[1],
    transparent: color[1] < 1,
});
