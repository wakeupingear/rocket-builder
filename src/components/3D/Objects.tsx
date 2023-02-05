import { ThreeElements, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { BackSide, TextureLoader } from 'three';
import { useApp } from '../AppWrapper';

export function Box(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!);
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    useFrame((state, delta) => (ref.current.rotation.x += delta));
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

interface SkyboxProps {
    url: string;
    speed?: number;
}

export function Skybox({
    url,
    speed = 0.01,
    ...props
}: SkyboxProps & ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => (ref.current.rotation.z += delta * speed));
    return (
        <mesh {...props} ref={ref}>
            <sphereGeometry args={[800, 800, 800]} />
            <meshBasicMaterial
                map={new TextureLoader().load(url)}
                side={BackSide}
            />
        </mesh>
    );
}

type GroundProps = ThreeElements['mesh'] & {
    url: string;
    normalUrl?: string;
    speed?: number;
};

export function Ground({ url, normalUrl, speed = 0, ...props }: GroundProps) {
    const { launchTime, launching } = useApp();

    const radius = 700;

    const timerRef = useRef<number>(0);
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => {
        ref.current.rotation.z += delta * speed;

        if (launching) {
            if (launchTime === 1) {
                timerRef.current = state.clock.getElapsedTime();
            } else if (launchTime === 0) {
                const time = state.clock.getElapsedTime() - timerRef.current;
                ref.current.position.y -= 50 * Math.sqrt(time) * delta;
                if (time > 3) {
                    ref.current.position.z += 50 * Math.sqrt(time - 3) * delta;
                }
            }
        }
    });

    const content = useMemo(
        () => (
            <mesh
                {...props}
                ref={ref}
                position={[0, -radius, 0]}
                rotation={[Math.PI / 1.43, Math.PI * 0.835, Math.PI]}
            >
                <sphereGeometry args={[radius, radius, radius]} />
                <meshStandardMaterial
                    map={new TextureLoader().load(url)}
                    normalMap={
                        normalUrl
                            ? new TextureLoader().load(normalUrl)
                            : undefined
                    }
                />
            </mesh>
        ),
        [ref]
    );

    return content;
}
