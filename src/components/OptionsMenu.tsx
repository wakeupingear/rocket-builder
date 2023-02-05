import React from 'react';
import { RoundedButton } from './Buttons';
import SidePanel from './SidePanel';
import { useApp } from './AppWrapper';
import { SATURN_V } from '@/types/rocketTypes';

export default function OptionsMenu() {
    const { setRocket } = useApp();

    return (
        <>
            <SidePanel
                side="top"
                className="right-12"
                buttonChildren={'⚙ Options'}
            >
                <h1 className="text-xl">⚙ Options</h1>
                <RoundedButton
                    className="mt-3"
                    onClick={() => {
                        setRocket(SATURN_V);
                    }}
                >
                    Reset Saturn V
                </RoundedButton>
            </SidePanel>
        </>
    );
}
