import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Ground, Skybox } from '../Objects';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RAPTOR_ENGINE, Rocket } from '@/types/rocketTypes';
import RocketModel from '../RocketModel';
import { RocketScrollBar } from './ScrollCam';
import ScrollCam from './ScrollCam';
import { ROCKET_EXAMPLE } from '@/cutscenes/intro';

interface GarageSceneProps {
    setLoaded?: (loaded: boolean) => void;
}

export default function GarageScene({
    setLoaded = () => {},
}: GarageSceneProps) {
    const [rocket, setRocket] = useState<Rocket>(ROCKET_EXAMPLE);
    const maxRadius = rocket.tanks.reduce(
        (max, tank) => Math.max(max, tank.radius),
        0
    );
    const minCameraDistance = maxRadius * 2;

    const rocketModel = useMemo(
        () => <RocketModel rocket={rocket} />,
        [rocket]
    );

    const camScroll = useRef(0);

    useEffect(() => {
        setLoaded(true);
        return () => {
            setLoaded(false);
        };
    }, []);

    return (
        <>
            <Canvas flat linear>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <ScrollCam camScroll={camScroll} />
                {rocketModel}
                <Skybox url="/textures/skybox.png" />
                <Ground url="/textures/skybox.png" />
                <Sky
                    distance={450000}
                    sunPosition={[5, 1, 8]}
                    inclination={0}
                    azimuth={0.25}
                />
            </Canvas>
            <RocketScrollBar camScroll={camScroll} />
        </>
    );
}
