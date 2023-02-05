import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useApp } from './AppWrapper';

const HEIGHT = 'h-16';
export const NAVBAR_MARGIN = 'mt-16';

export const NAVBAR_VISIBLE_PATHS = ['/'];

export default function NavBar() {
    const { navBarOpen } = useApp();

    return (
        <div
            className={clsx(
                'z-20 px-8 flex items-center fixed top-0 text-white !bg-transparent',
                HEIGHT,
                {
                    'scale-0': !navBarOpen,
                }
            )}
        >
            NavBar
        </div>
    );
}
