import { useApp } from '@/components/AppWrapper';
import PostIt from '@/components/PostIt';
import SidePanel from '@/components/SidePanel';
import { credits } from '@/cutscenes/credits';
import { garage } from '@/cutscenes/intro';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

interface TableProps {
    tableOpen: boolean;
    setTableOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Table({ tableOpen, setTableOpen }: TableProps) {
    const { doneTutorial } = useApp();

    const [postItOpen, setPostItOpen] = useState(false);
    const tableRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(tableRef, () => {
        if (doneTutorial) setTableOpen(false);
    });

    return (
        <>
            <div
                className={clsx(
                    'absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-all duration-500 ease-in-out',
                    {
                        'opacity-0 pointer-events-none': !tableOpen,
                    }
                )}
            />
            <div
                className={clsx(
                    'z-10 flex flex-col absolute w-[calc(100vw-3rem)] h-80 max-w-[80rem] bg-red-700 bottom-[3rem] left-auto right-auto shadow-2xl rounded-t-2xl transition-all duration-500 ease-in-out',
                    {
                        '-bottom-[20rem] scale-0': !tableOpen,
                    }
                )}
                ref={tableRef}
            >
                <div className="flex w-full h-full relative">
                    <PostIt
                        {...(doneTutorial
                            ? { x: 'left-3/4', y: 'top-1/4' }
                            : { x: 'left-1/2', y: 'top-1/2' })}
                        cutscene={garage}
                        setPostItOpen={setPostItOpen}
                    >
                        intro
                    </PostIt>
                    <PostIt
                        {...(doneTutorial
                            ? { x: 'left-1/4', y: 'top-[60%]' }
                            : { x: '-left-full', y: 'top-[60%]' })}
                        cutscene={credits}
                        setPostItOpen={setPostItOpen}
                    >
                        links
                    </PostIt>
                </div>
                <div className="mt-auto flex w-full h-16 bg-red-800"></div>
            </div>
            <SidePanel
                buttonChildren="🔧 Workbench"
                externalOpen={tableOpen}
                onClick={() => setTableOpen(true)}
                side="bottom"
            />
        </>
    );
}
