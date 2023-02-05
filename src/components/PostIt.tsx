import { Cutscene } from '@/cutscenes/constants';
import clsx from 'clsx';
import React, { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useApp } from './AppWrapper';

interface PostItProps {
    x: string;
    y: string;
    cutscene: Cutscene;
    setPostItOpen?: (open: boolean) => void;
}

export default function PostIt({
    cutscene,
    x,
    y,
    setPostItOpen = () => {},
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

    const [sideContent, setSideContent] = useState<ReactNode>(null);

    const [content, setContent] = useState<ReactNode>(null);
    useEffect(() => {
        let newContent = cutscene(
            prog,
            setProg,
            path,
            setPath,
            funcs,
            setSideContent
        );
        if (newContent) setContent(newContent);
        else setOpen(false);
    }, [prog, path, cutscene]);

    useEffect(() => {
        setPostItOpen(open);
    }, [open, setPostItOpen]);

    return (
        <>
            <button
                className={clsx(
                    'flex border-t-8 border-yellow-700 shadow-lg w-16 h-16 rotate-12 bg-yellow-200 hover:scale-125 hover:rotate-[6deg] hover:bg-purple-300 hover:border-purple-800 hover:shadow-2xl transition-all',
                    'absolute',
                    x,
                    y
                )}
                onClick={() => setOpen(true)}
            ></button>
            <ReactModal
                isOpen={open}
                closeTimeoutMS={250}
                overlayClassName="modal"
                shouldCloseOnOverlayClick
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
                        <div className="p-4 rounded-b-xl shadow-md border-t-[1.5rem] border-yellow-700 bg-yellow-200 w-[24rem] flex flex-col justify-center items-center gap-4">
                            {content}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <div
                    className={clsx(
                        'm-4 flex flex-col justify-center items-center gap-2 overflow-hidden h-full transition-all duration-500 ease-in-out w-64',
                        {
                            '!w-0': !sideContent,
                        }
                    )}
                >
                    {sideContent}
                </div>
            </ReactModal>
        </>
    );
}
