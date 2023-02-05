import { Cutscene } from '@/cutscenes/constants';
import { RocketStyle } from '@/types/rocketStyles';
import { SATURN_V } from '@/types/rocketTypes';
import { getRocketHeight } from '@/utils/rocketUtils';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import React, { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import RocketModel from './3D/RocketModel';
import { useApp } from './AppWrapper';

const TEMP_ROCKET = SATURN_V;
const TEMP_ROCKET_HEIGHT = getRocketHeight(TEMP_ROCKET);

interface PostItProps {
    x: string;
    y: string;
    cutscene: Cutscene;
    setPostItOpen?: (open: boolean) => void;
    children?: ReactNode;
}

export default function PostIt({
    cutscene,
    x,
    y,
    setPostItOpen = () => {},
    children,
}: PostItProps) {
    const { setDoneTutorial } = useApp();

    const [open, setOpen] = useState(false);

    const [prog, setProg] = useState(0);
    const [path, setPath] = useState('');

    const funcs = {
        finishTutorial: () => {
            setDoneTutorial(true);
            setOpen(false);
        },
    };

    const [rocketStyle, setRocketStyle] = useState<RocketStyle | null>(null);
    const [content, setContent] = useState<ReactNode>(null);
    useEffect(() => {
        let newContent = cutscene(
            prog,
            setProg,
            path,
            setPath,
            funcs,
            setRocketStyle
        );
        if (newContent) setContent(newContent);
        else {
            if (isNaN(prog)) setProg(0);
            setOpen(false);
        }
    }, [prog, path, cutscene]);

    useEffect(() => {
        setPostItOpen(open);
    }, [open, setPostItOpen]);

    return (
        <>
            <button
                className={clsx(
                    'flex items-center justify-center border-t-8 border-yellow-700 shadow-lg w-16 h-16 rotate-12 bg-yellow-200 hover:scale-125 hover:rotate-[6deg] hover:bg-purple-300 hover:border-purple-800 hover:shadow-2xl transition-all text-black text-2xl font-bold',
                    'absolute',
                    x,
                    y
                )}
                onClick={() => setOpen(true)}
            >
                {children}
            </button>
            <ReactModal
                isOpen={open}
                closeTimeoutMS={250}
                overlayClassName="modal"
                onRequestClose={() => setOpen(false)}
                className={clsx(
                    'modalPage formModalPage',
                    'flex w-full h-full items-center justify-center'
                )}
            >
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={prog + path}
                        classNames="pageLeft"
                        timeout={150}
                    >
                        <div className="p-4 rounded-b-xl shadow-md border-t-[1.5rem] border-yellow-700 bg-gradient-to-br from-yellow-200 to-yellow-300 w-[24rem] flex flex-col justify-center items-center gap-4">
                            {content}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <div
                    className={clsx(
                        'm-4 flex flex-col justify-center items-center gap-2 overflow-hidden h-full transition-all duration-500 ease-in-out w-64',
                        {
                            '!w-0': !rocketStyle,
                        }
                    )}
                >
                    {rocketStyle && (
                        <Canvas>
                            <ambientLight />
                            <pointLight position={[10, 10, 10]} />
                            <RocketModel
                                rocket={SATURN_V}
                                scale={0.05}
                                offset={[0, -TEMP_ROCKET_HEIGHT / 2, 0]}
                                canClick={false}
                                rocketStyle={rocketStyle}
                            />
                            <OrbitControls
                                minPolarAngle={Math.PI / 6}
                                maxPolarAngle={Math.PI - Math.PI / 6}
                                enablePan={false}
                                maxDistance={20}
                            />
                        </Canvas>
                    )}
                </div>
            </ReactModal>
        </>
    );
}
