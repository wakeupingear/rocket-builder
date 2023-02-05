import { RocketStyle } from '@/types/rocketStyles';
import {
    Rocket,
    RocketSection,
    SATURN_V,
    SATURN_V_STYLE,
} from '@/types/rocketTypes';
import { useRouter } from 'next/router';
import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

interface AppContextProps {
    doneTutorial: boolean;
    setDoneTutorial: (doneTutorial: boolean) => void;
    rocket: Rocket;
    setRocket: Dispatch<SetStateAction<Rocket>>;
    viewingSection: RocketSection | null;
    setViewingSection: Dispatch<SetStateAction<RocketSection | null>>;
    viewingIndex: number;
    setViewingIndex: Dispatch<SetStateAction<number>>;
    launching: boolean;
    startLaunch: () => void;
    launchTime: number;
    rocketStyle: RocketStyle;
    setRocketStyle: Dispatch<SetStateAction<RocketStyle>>;
}
export const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface AppWrapperProps {
    children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
    const [rocket, setRocket] = useState<Rocket>(SATURN_V);
    const [rocketStyle, setRocketStyle] = useState<RocketStyle>(SATURN_V_STYLE);
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem('rocket', JSON.stringify(rocket));
        }, 1000);
        return () => clearTimeout(timeout);
    }, [rocket]);

    const { push } = useRouter();

    const [doneTutorial, setDoneTutorial] = useState(false);
    useEffect(() => {
        const doneTutorial = localStorage.getItem('doneTutorial');
        if (doneTutorial) {
            setDoneTutorial(true);

            const localRocket = localStorage.getItem('rocket');
            if (localRocket) {
                setRocket(JSON.parse(localRocket));
            }
        }
    }, []);
    const saveTutorial = () => {
        setDoneTutorial(true);
        localStorage.setItem('doneTutorial', 'true');
    };

    const [viewingSection, setViewingSection] = useState<RocketSection | null>(
        null
    );
    const [viewingIndex, setViewingIndex] = useState(0);

    const [launching, setLaunching] = useState(false);
    const [launchTime, setLaunchTime] = useState(NaN);
    const startLaunch = async () => {
        if (launching) return;
        setLaunching(true);
        setViewingSection(null);

        for (let i = 10; i >= 0; i--) {
            setLaunchTime(i);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));

        push('/launch');

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLaunchTime(NaN);
        setLaunching(false);
    };

    return (
        <AppContext.Provider
            value={{
                doneTutorial,
                setDoneTutorial: saveTutorial,
                rocket,
                setRocket,
                viewingSection,
                setViewingSection,
                viewingIndex,
                setViewingIndex,
                launching,
                launchTime,
                startLaunch,
                rocketStyle,
                setRocketStyle,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within a AppProvider');
    }
    return context;
};
