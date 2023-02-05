import { RocketStyle } from './rocketStyles';

// Density of liquid oxygen in kg/m^3
export type Fuel = {
    name: string;
    density: number;
};
export const RP1: Fuel = {
    name: 'RP1/Kerosene',
    density: 820,
};
export const METHANE: Fuel = {
    name: 'Liquid Methane',
    density: 657,
};
export const HYDROGEN: Fuel = {
    name: 'Liquid Hydrogen',
    density: 71,
};

export type Oxidizer = Fuel;
export const LOX: Oxidizer = {
    name: 'Liquid Oxygen',
    density: 1141,
};

export type FuelOxidizer = {
    fuel: Fuel;
    oxidizer: Oxidizer;
};
export const KEROLOX: FuelOxidizer = {
    fuel: RP1,
    oxidizer: LOX,
};
export const METHALOX: FuelOxidizer = {
    fuel: METHANE,
    oxidizer: LOX,
};
export const HYDROLOX: FuelOxidizer = {
    fuel: HYDROGEN,
    oxidizer: LOX,
};

// Mass in kg
export type Engine = {
    massFlow: number;
    mixtureRatio: number;
    thrust: number;
    isp: number;
    mass: number;
    fuelOxidizer: FuelOxidizer;
    radius: number;
    length: number;
};
export const RAPTOR_ENGINE: Engine = {
    massFlow: 650,
    mixtureRatio: 3.6,
    thrust: 185000,
    isp: 363,
    mass: 1600,
    fuelOxidizer: METHALOX,
    radius: 0.65,
    length: 3.1,
};
export const F1_ENGINE: Engine = {
    massFlow: 1789,
    mixtureRatio: 2.27,
    thrust: 690367.5848,
    isp: 263,
    mass: 8400,
    fuelOxidizer: KEROLOX,
    radius: 1.85,
    length: 5.6,
};

export type EngineConfig = {
    engine: Engine;
    offset: [
        number, // x
        number, // y
        number // z
    ];
};

// Dry mass in kg
export type Stage = {
    density: number;
    radius: number;
    height: number;
    heightOffset?: number;
    hasPropellant?: boolean;
    fuelFirst?: boolean;
    fuelHeight?: number;
    oxidizerHeight?: number;
};

export type Rocket = {
    name: string;
    engines: EngineConfig[];
    stages: Stage[];
    fuelOxidizer: FuelOxidizer;
};

export type RocketSection = 'engine' | 'stage' | 'interstage';

// Rockets
export const SATURN_V: Rocket = {
    name: 'Saturn V',
    engines: [
        {
            engine: F1_ENGINE,
            offset: [0, 0, 0],
        },
        {
            engine: F1_ENGINE,
            offset: [4, 0, 0],
        },
        {
            engine: F1_ENGINE,
            offset: [-4, 0, 0],
        },
        {
            engine: F1_ENGINE,
            offset: [0, 0, 4],
        },
        {
            engine: F1_ENGINE,
            offset: [0, 0, -4],
        },
    ],
    stages: [
        {
            height: 36.4,
            radius: 5,
            density: 62637.3626374,
            hasPropellant: true,
            fuelFirst: true,
            fuelHeight: 13.1064,
            oxidizerHeight: 19.5072,
        },
        {
            height: 24.9,
            radius: 5,
            density: 19277.1084337,
            hasPropellant: false,
            heightOffset: 3,
        },
        {
            height: 7.81,
            radius: 3.3,
            density: 15749.0396927,
            hasPropellant: false,
            heightOffset: 6,
        },
        {
            height: 7.81,
            radius: 1.2,
            density: 100,
            hasPropellant: false,
            heightOffset: 6,
        },
    ],
    fuelOxidizer: KEROLOX,
};
export const SATURN_V_STYLE: RocketStyle = {
    engines: [
        ['#333333', 1],
        ['#444444', 1],
        ['#444444', 1],
        ['#444444', 1],
        ['#444444', 1],
    ],
    stages: [
        {
            fuel: ['orange', 1],
            oxidizer: ['green', 1],
            bulkhead: ['white', 1],
        },
        {
            fuel: ['orange', 1],
            oxidizer: ['green', 1],
            bulkhead: ['white', 1],
        },
        {
            fuel: ['orange', 1],
            oxidizer: ['green', 1],
            bulkhead: ['white', 1],
        },
        {
            fuel: ['orange', 1],
            oxidizer: ['green', 1],
            bulkhead: ['white', 1],
        },
    ],
};
