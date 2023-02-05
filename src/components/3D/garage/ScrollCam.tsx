import { useApp } from '@/components/AppWrapper';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction } from 'react';
import ReactSlider from 'react-slider';
import { Clock, Vector3 } from 'three';

interface Props {
    camScroll: number;
    setCamScroll: Dispatch<SetStateAction<number>>;
}

export function RocketScrollBar({ camScroll, setCamScroll }: Props) {
    const { launching } = useApp();

    return (
        <div
            className={clsx(
                'py-4 flex absolute right-10 h-screen items-stretch bg-black w-fit transition-all',
                {
                    'opacity-0 pointer-events-none': launching,
                }
            )}
        >
            <ReactSlider
                value={camScroll}
                onChange={(val) => setCamScroll(val)}
                orientation="vertical"
                disabled={launching}
                invert
                renderThumb={(props, state) => (
                    <div
                        {...props}
                        className={clsx(
                            'h-12 w-4 rounded-full cursor-pointer transition-all',
                            'bg-bright'
                        )}
                    />
                )}
                renderTrack={(props, state) => (
                    <div
                        {...props}
                        className={clsx(
                            'ml-1 w-2 rounded-full cursor-pointer transition-all',
                            'bg-gray-400 hover:bg-gray-500'
                        )}
                    />
                )}
            />
        </div>
    );
}
