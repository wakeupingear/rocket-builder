import useRocketHover from '@/hooks/useRocketHover';
import {
    Color,
    colorProps,
    DEFAULT_ROCKET_STYLE,
    RocketStyle,
} from '@/types/rocketStyles';
import { Engine, Rocket, Stage } from '@/types/rocketTypes';
import { useApp } from '../AppWrapper';

interface EngineModelProps {
    engine: Engine;
    index: number;
    color?: Color;
    offset?: [number, number, number];
    scale?: number;
    canClick?: boolean;
}

export function EngineModel({
    engine,
    index,
    color: _color = DEFAULT_ROCKET_STYLE['engines'][0],
    offset = [0, 0, 0],
    scale = 1,
    canClick = true,
}: EngineModelProps) {
    const { color, pointerEvents } = useRocketHover(
        _color,
        'engine',
        index,
        canClick
    );

    const { radius, length } = engine;
    return (
        <mesh
            position={[
                offset[0] * scale,
                (offset[1] - length / 2) * scale,
                offset[2] * scale,
            ]}
            {...pointerEvents}
        >
            <cylinderGeometry
                args={[radius * scale, radius * scale, length * scale]}
            />
            <meshStandardMaterial
                color={color[0]}
                transparent={color[1] < 1}
                opacity={color[1]}
            />
        </mesh>
    );
}

interface StageModelProps {
    index: number;
    stage: Stage;
    stages: Stage[];
    offset: [number, number, number];
    scale: number;
    stageOffsets: number[];
    colors: RocketStyle['stages'];
    canClick?: boolean;
}

export function StageModel({
    index,
    stage,
    offset,
    scale,
    stages,
    stageOffsets,
    colors,
    canClick = true,
}: StageModelProps) {
    const {
        height,
        radius,
        hasPropellant = false,
        fuelFirst = false,
        fuelHeight = 0,
        oxidizerHeight = 0,
        heightOffset,
    } = stage;

    const stageOffset = stageOffsets[index];
    const bulkheadColors = colorProps(colors[index % colors.length].bulkhead);

    const { pointerEvents, color: _color } = useRocketHover(
        [bulkheadColors.color, bulkheadColors.opacity],
        'stage',
        index,
        canClick
    );
    bulkheadColors.color = _color[0];
    bulkheadColors.opacity = _color[1];
    bulkheadColors.transparent = _color[1] < 1;

    const bulkhead = (
        <mesh
            key={index * 3}
            position={[
                offset[0] * scale,
                (offset[1] + stageOffset + height / 2) * scale,
                offset[2] * scale,
            ]}
            {...pointerEvents}
        >
            <cylinderGeometry
                args={[radius * scale, radius * scale, height * scale]}
            />
            <meshStandardMaterial {...bulkheadColors} transparent />
        </mesh>
    );

    const interstage = heightOffset && (
        <mesh
            key={index * 3 + 1}
            position={[
                offset[0] * scale,
                (offset[1] + stageOffset - heightOffset / 2) * scale,
                offset[2] * scale,
            ]}
        >
            <cylinderGeometry
                args={[
                    radius * scale,
                    stages[index - 1].radius * scale,
                    heightOffset * scale,
                ]}
            />
            <meshStandardMaterial
                {...colorProps(
                    colors[index % colors.length]?.interstage || ['black', 1]
                )}
            />
        </mesh>
    );

    if (!hasPropellant)
        return (
            <>
                {bulkhead}
                {interstage}
            </>
        );

    let fuelPos = fuelFirst
        ? (offset[1] + stageOffset + height - fuelHeight / 2 - oxidizerHeight) *
          scale
        : (offset[1] + stageOffset + height - fuelHeight / 2) * scale;
    const fuel = (
        <mesh
            key={index * 3 + 1}
            position={[offset[0] * scale, fuelPos, offset[2] * scale]}
        >
            <capsuleGeometry
                args={[radius * scale, (fuelHeight - radius * 2) * scale]}
            />
            <meshStandardMaterial
                {...colorProps(colors[index % colors.length].fuel)}
            />
        </mesh>
    );

    let oxidizerPos = fuelFirst
        ? (offset[1] + stageOffset + height - oxidizerHeight / 2) * scale
        : (offset[1] + stageOffset + height - fuelHeight - oxidizerHeight / 2) *
          scale;
    const oxidizer = (
        <mesh position={[offset[0] * scale, oxidizerPos, offset[2] * scale]}>
            <capsuleGeometry
                args={[radius * scale, (oxidizerHeight - radius * 2) * scale]}
            />
            <meshStandardMaterial
                {...colorProps(colors[index % colors.length].oxidizer)}
            />
        </mesh>
    );

    return (
        <>
            {bulkhead}
            {interstage}
            {fuel}
            {oxidizer}
        </>
    );
}

interface StagesModelProps {
    stages: Stage[];
    colors?: RocketStyle['stages'];
    offset?: [number, number, number];
    scale?: number;
    canClick?: boolean;
}

export function StagesModel({
    stages,
    colors = DEFAULT_ROCKET_STYLE['stages'],
    offset = [0, 0, 0],
    scale = 1,
    canClick = true,
}: StagesModelProps) {
    const stageOffsets: number[] = [];
    let totalTankHeight = 0;
    for (let i = 0; i < stages.length; i++) {
        const tank = stages[i];
        totalTankHeight += tank.heightOffset || 0;
        stageOffsets.push(totalTankHeight);
        totalTankHeight += tank.height;
    }

    return (
        <>
            {stages.map((stage, index) => (
                <StageModel
                    key={index}
                    stage={stage}
                    stages={stages}
                    offset={offset}
                    scale={scale}
                    stageOffsets={stageOffsets}
                    index={index}
                    colors={colors}
                    canClick={canClick}
                />
            ))}
        </>
    );
}

interface RocketModelProps {
    rocket?: Rocket;
    rocketStyle?: RocketStyle;
    scale?: number;
    offset?: [number, number, number];
    canClick?: boolean;
    rotation?: [number, number, number];
}

export default function RocketModel({
    rocket: _propRocket,
    rocketStyle: _rocketStyle,
    scale = 1,
    offset: _rocketOffset = [0, 0, 0],
    canClick = true,
    rotation = [0, 0, 0],
}: RocketModelProps) {
    const { rocket: _rocket } = useApp();
    const rocket = _propRocket || _rocket;
    const { engines, stages } = rocket;

    const { rocketStyle: _globalStyle } = useApp();
    const rocketStyle = _rocketStyle || _globalStyle;

    return (
        <mesh rotation={rotation}>
            {engines.map(({ engine, offset }, index) => (
                <EngineModel
                    key={index}
                    engine={engine}
                    index={index}
                    offset={[
                        offset[0] + _rocketOffset[0],
                        offset[1] + _rocketOffset[1],
                        offset[2] + _rocketOffset[2],
                    ]}
                    scale={scale}
                    color={rocketStyle['engines'][index]}
                    canClick={canClick}
                />
            ))}
            <StagesModel
                stages={stages}
                scale={scale}
                offset={_rocketOffset}
                canClick={canClick}
                colors={rocketStyle['stages']}
            />
        </mesh>
    );
}
