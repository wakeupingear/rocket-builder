import { Ground, Skybox } from '@/components/3D/Objects';
import RocketModel from '@/components/3D/RocketModel';
import { useApp } from '@/components/AppWrapper';
import { RoundedButton } from '@/components/Buttons';
import { AppPage } from '@/components/PageComponents';
import { Canvas } from '@react-three/fiber';
import React from 'react';

export default function launch() {
    const {
        rocket: { name },
    } = useApp();

    return (
        <AppPage title="Launched!" className="w-screen h-screen">
            <div className="z-10 absolute top-24 left-auto right-auto flex flex-col gap-2 items-center">
                <h1 className="text-7xl font-bold underline">{name}</h1>
                <p className="text-2xl">made it to orbit 🚀</p>
            </div>
            <RoundedButton href="/" className="z-10 absolute bottom-16">
                back to the garage
            </RoundedButton>
            <Canvas>
                <ambientLight />
                <pointLight position={[100, 100, 100]} />
                <Skybox url="/textures/spaceSkybox.jpg" speed={0.03} />
                <Ground
                    url="/textures/8k_earth_daymap.jpg"
                    normalUrl="/textures/2k_earth_normal_map.png"
                    scale={[0.9, 0.9, 0.9]}
                    speed={0.04}
                />
                <RocketModel
                    canClick={false}
                    scale={0.05}
                    offset={[0, -50, 20]}
                    rotation={[Math.PI / 20, Math.PI / 4, -Math.PI / 2]}
                />
            </Canvas>
        </AppPage>
    );
}
