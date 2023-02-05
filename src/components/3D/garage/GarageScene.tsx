import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Ground, Skybox } from '../Objects';
import { useEffect, useMemo, useRef, useState } from 'react';
import RocketModel from '../RocketModel';
import { RocketScrollBar } from './ScrollCam';
import { getMaxRocketRadius, getRocketHeight } from '@/utils/rocketUtils';
import { useApp } from '@/components/AppWrapper';
import EditPanels from '@/components/EditPanels';
import LaunchEffects from './LaunchEffects';
import OptionsMenu from '@/components/OptionsMenu';

interface GarageSceneProps {
    setLoaded?: (loaded: boolean) => void;
}

export default function GarageScene({
    setLoaded = () => {},
}: GarageSceneProps) {
    const { rocket, launching } = useApp();
    const rocketRef = useRef(rocket);

    const [rocketModel, rocketHeight, rocketRadius] = useMemo(() => {
        const engineHeight = rocketRef.current.engines.length
            ? rocketRef.current.engines[0].engine.length
            : 0;

        return [
            <RocketModel offset={[0, engineHeight, 0]} />,
            getRocketHeight(rocketRef.current),
            getMaxRocketRadius(rocketRef.current),
        ];
    }, [rocketRef.current]);

    const [camScroll, setCamScroll] = useState(rocketHeight / 2);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 1000);
        return () => {
            setLoaded(false);
            clearTimeout(timeout);
        };
    }, []);

    const output = useMemo(
        () => (
            <Canvas flat linear>
                <ambientLight />
                <pointLight position={[100, 100, 100]} />
                <OrbitControls
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI - Math.PI / 6}
                    enablePan={false}
                    maxDistance={150}
                    minDistance={rocketRadius * 2}
                    target={[0, camScroll, 0]}
                    position={[0, camScroll, 0]}
                />
                {rocketModel}
                <LaunchEffects />
                <Skybox url="/textures/spaceSkybox.jpg" />
                <Ground
                    url="/textures/8k_earth_daymap.jpg"
                    normalUrl="/textures/2k_earth_normal_map.png"
                />
                <Sky
                    distance={450000}
                    sunPosition={[5, 1, 8]}
                    inclination={0}
                    azimuth={0.25}
                />
            </Canvas>
        ),
        [camScroll, rocketRadius, rocketModel]
    );

    const scrollBar = useMemo(
        () => (
            <RocketScrollBar
                camScroll={camScroll}
                setCamScroll={setCamScroll}
            />
        ),
        [camScroll]
    );

    return (
        <>
            {output}
            <EditPanels />
            {scrollBar}
            <OptionsMenu />
        </>
    );
}
