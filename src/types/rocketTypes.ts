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
export const KERALOX: FuelOxidizer = {
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

export type EngineConfig = {
    engine: Engine;
    offset: [
        number, // x
        number, // y
        number // z
    ];
};

// Dry mass in kg
export type Tank = {
    mass: number;
    type: 'fuel' | 'oxidizer';
    radius: number;
    height: number;
    heightOffset?: number;
};

export type Rocket = {
    name: string;
    engines: EngineConfig[];
    tanks: Tank[];
    fuelOxidizer?: FuelOxidizer;
};
