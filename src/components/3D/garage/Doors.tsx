import clsx from 'clsx';
import React from 'react';
import { RingLoader } from 'react-spinners';

interface SingleDoorProps {
    open: boolean;
    left?: boolean;
    className?: string;
}

function SingleDoor({ left = false, open, className = '' }: SingleDoorProps) {
    return (
        <div
            className={clsx(
                'flex items-center w-1/2 h-full bg-gradient-to-r from-slate-300 to-slate-400 transition-all duration-700 overflow-hidden',
                className,
                {
                    '-translate-x-full': open && left,
                    'translate-x-full': open && !left,
                    'rotate-180': left,
                    'shadow-xl': open,
                }
            )}
        >
            <div className="flex items-center justify-center w-32 h-32 -ml-[4rem] bg-slate-500 rounded-full">
                {!open && <RingLoader />}
            </div>
        </div>
    );
}

interface DoorsProps {
    open: boolean;
}

export default function Doors({ open }: DoorsProps) {
    return (
        <div className="z-10 absolute top-0 left-0 flex w-full h-full pointer-events-none">
            <SingleDoor open={open} left />
            <SingleDoor open={open} />
        </div>
    );
}
