import { useApp } from '@/components/AppWrapper';
import React, { useEffect, useRef } from 'react';

import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Material, Vector3 } from 'three';

export default function LaunchEffects() {
    const { launchTime } = useApp();

    const camera = useThree((state) => state.camera);
    const ref = useRef<THREE.Mesh>(null!);
    const textRef = useRef<any>(null!);
    useFrame((state, delta) => {
        let targetPosition = new Vector3();

        const forward = new Vector3();
        camera.getWorldDirection(forward);
        if (!isNaN(launchTime) && launchTime > 0) {
            targetPosition.copy(camera.position);
            forward.applyAxisAngle(new Vector3(1, 0, 0), Math.PI / 10);
            targetPosition.addScaledVector(forward, 400);

            textRef.current.fillOpacity = Math.min(
                1,
                textRef.current.fillOpacity + 0.75 * delta
            );
        } else {
            targetPosition.copy(camera.position);
            targetPosition.addScaledVector(forward, 800);

            textRef.current.fillOpacity = Math.max(
                0,
                textRef.current.fillOpacity - 0.5 * delta
            );
        }

        ref.current.position.lerp(targetPosition, 1 * delta);
        ref.current.lookAt(camera.position);

        if (isNaN(launchTime)) return;

        // shake the camera
        if (launchTime < 2) {
            const shake = new Vector3(
                Math.random() * 0.7 - 0.05,
                Math.random() * 0.7 - 0.05,
                Math.random() * 0.7 - 0.05
            );
            camera.position.add(shake);
        } else if (launchTime < 1) {
            const shake = new Vector3(
                Math.random() * 0.5 - 0.05,
                Math.random() * 0.5 - 0.05,
                Math.random() * 0.5 - 0.05
            );
            camera.position.add(shake);
        }
    });

    return (
        <>
            <mesh ref={ref}>
                <Text fontSize={164} color="red" ref={textRef} fillOpacity={0}>
                    {isNaN(launchTime) ? '0' : launchTime}
                </Text>
            </mesh>
        </>
    );
}
