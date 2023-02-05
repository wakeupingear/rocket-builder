import { Rocket } from '@/types/rocketTypes';

export const getRocketHeight = (rocket: Rocket) => {
    const engineHeight = rocket.engines.length
        ? rocket.engines[0].engine.length
        : 0;
    const stageHeight = rocket.stages.reduce(
        (acc, stage) => acc + stage.height + (stage.heightOffset || 0),
        0
    );

    return engineHeight + stageHeight;
};

export const getMaxRocketRadius = (rocket: Rocket) => {
    const engineRadius = rocket.engines.length
        ? rocket.engines[0].engine.radius
        : 0;
    const stageRadius = rocket.stages.reduce(
        (acc, stage) => Math.max(acc, stage.radius),
        0
    );

    return Math.max(engineRadius, stageRadius);
};
