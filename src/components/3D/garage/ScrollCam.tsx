import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import clsx from 'clsx';
import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import ReactSlider from 'react-slider';
import { Clock, Vector3 } from 'three';

const clock = new Clock();

interface Props {
    camScroll: MutableRefObject<number>;
}

export function RocketScrollBar({ camScroll }: Props) {
    return (
        <div className="py-4 flex absolute right-10 h-screen items-stretch">
            <ReactSlider
                value={camScroll.current}
                onChange={(val) => (camScroll.current = val)}
                orientation="vertical"
                invert
                renderThumb={(props, state) => (
                    <div
                        {...props}
                        className={clsx(
                            'flex w-8 h-8 items-center justify-center',
                            'hover:cursor-pointer'
                        )}
                    >
                        {state.valueNow}
                    </div>
                )}
            />
        </div>
    );
}

export default function ScrollCam({ camScroll }: Props) {
    const { camera } = useThree();
    useFrame((state, delta) => {
        camera.lookAt(new Vector3(0, camScroll.current, 0));
    });

    return (
        <>
            <OrbitControls
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
                enablePan={false}
                maxDistance={100}
            />
        </>
    );
}
