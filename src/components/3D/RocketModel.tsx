import { Engine, Rocket } from '@/types/rocketTypes';
import { Vector3 } from 'three';

const TANK_COLORS = ['orange', 'green'];

interface EngineModelProps {
    engine: Engine;
    offset?: [number, number, number];
    scale?: number;
}

export function EngineModel({
    engine,
    offset = [0, 0, 0],
    scale = 1,
}: EngineModelProps) {
    const { radius, length } = engine;
    return (
        <mesh
            position={[
                offset[0] * scale,
                (offset[1] - length / 2) * scale,
                offset[2] * scale,
            ]}
        >
            <cylinderGeometry
                args={[radius * scale, radius * scale, length * scale]}
            />
            <meshStandardMaterial color="yellow" />
        </mesh>
    );
}

interface RocketModelProps {
    rocket: Rocket;
    scale?: number;
    rocketOffset?: [number, number, number];
}

export default function RocketModel({
    rocket,
    scale = 1,
    rocketOffset: _rocketOffset = [0, 0, 0],
}: RocketModelProps) {
    const { name, engines, tanks, fuelOxidizer } = rocket;

    const engineHeight = engines.length ? engines[0].engine.length * 2.5 : 0;
    const rocketOffset = [
        _rocketOffset[0],
        _rocketOffset[1] + engineHeight,
        _rocketOffset[2],
    ];

    const tankOffsets: number[] = [];
    let totalTankHeight = 0;
    for (let i = 0; i < tanks.length; i++) {
        const tank = tanks[i];
        tankOffsets.push(totalTankHeight);
        totalTankHeight += tank.height + (tank.heightOffset || 0);
    }

    return (
        <>
            {engines.map(({ engine, offset }, index) => (
                <EngineModel
                    key={index}
                    engine={engine}
                    offset={[
                        offset[0],
                        offset[1] - tanks[0].height / 2 + rocketOffset[1],
                        offset[2],
                    ]}
                    scale={scale}
                />
            ))}
            {tanks.map((tank, index) => {
                const { radius, height, heightOffset = 0 } = tank;
                return (
                    <>
                        <mesh
                            key={index * 2}
                            position={[
                                0,
                                (tankOffsets[index] * 1.5 +
                                    heightOffset +
                                    rocketOffset[1]) *
                                    scale,
                                0,
                            ]}
                        >
                            <cylinderGeometry
                                args={[
                                    radius * scale,
                                    radius * scale,
                                    height * scale,
                                ]}
                            />
                            <meshStandardMaterial color={TANK_COLORS[index]} />
                        </mesh>
                        {heightOffset && (
                            <mesh
                                position={[
                                    0,
                                    (heightOffset * 1.5 -
                                        tanks[0].height / 2 +
                                        rocketOffset[1]) *
                                        scale,
                                    0,
                                ]}
                                key={index * 2 + 1}
                            >
                                <cylinderGeometry
                                    args={[
                                        radius * scale,
                                        tanks[index - 1].radius * scale,
                                        heightOffset * scale,
                                    ]}
                                />
                                <meshStandardMaterial color="red" />
                            </mesh>
                        )}
                    </>
                );
            })}
        </>
    );
}
