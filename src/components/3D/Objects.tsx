import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { BackSide, TextureLoader } from 'three';

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
}

export function Skybox({ url, ...props }: SkyboxProps & ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => (ref.current.rotation.z += delta * 0.01));
    return (
        <mesh {...props} ref={ref}>
            <sphereGeometry args={[300, 300, 300]} />
            <meshBasicMaterial
                map={new TextureLoader().load(url)}
                side={BackSide}
            />
        </mesh>
    );
}

interface GroundProps {
    url: string;
}

export function Ground({ url, ...props }: GroundProps) {
    return (
        <mesh {...props} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100, 100]} />
            <meshBasicMaterial
                map={new TextureLoader().load(url)}
                side={BackSide}
            />
        </mesh>
    );
}
