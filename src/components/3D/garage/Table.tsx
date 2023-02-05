import { useApp } from '@/components/AppWrapper';
import PostIt from '@/components/PostIt';
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

    const tableRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(tableRef, () => {
        if (doneTutorial && !postItOpen) setTableOpen(false);
    });

    const [postItOpen, setPostItOpen] = useState(false);

    return (
        <>
            <div
                className={clsx(
                    'z-10 flex flex-col absolute w-[calc(100vw-3rem)] h-80 max-w-[80rem] bg-red-700 bottom-[8rem] left-auto right-auto shadow-2xl rounded-t-2xl transition-all duration-500 ease-in-out',
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
                    />
                </div>
                <div className="mt-auto flex w-full h-16 bg-red-800"></div>
            </div>
            <div
                className={clsx(
                    'absolute bottom-0 flex items-center justify-center w-full transition-all',
                    {
                        '!bottom-[-4rem] scale-0': tableOpen,
                    }
                )}
            >
                <button
                    className="rounded-t-3xl p-4 bg-red-700 font-bold"
                    onClick={() => setTableOpen(true)}
                >
                    Check Desk
                </button>
            </div>
        </>
    );
}
