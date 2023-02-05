import { useRouter } from 'next/router';
import React, {
    createContext,
    createRef,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

import { NAVBAR_VISIBLE_PATHS } from './NavBar';

interface AppContextProps {
    doneTutorial: boolean;
    setDoneTutorial: (doneTutorial: boolean) => void;
    navBarOpen: boolean;
    setNavBarOpen: (navBarOpen: boolean) => void;
}
export const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface AppWrapperProps {
    children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
    const [doneTutorial, setDoneTutorial] = useState(false);
    useEffect(() => {
        const doneTutorial = localStorage.getItem('doneTutorial');
        if (doneTutorial) {
            setDoneTutorial(true);
        }
    }, []);

    const { pathname } = useRouter();
    const [navBarOpen, setNavBarOpen] = useState(false);
    useEffect(() => {
        setNavBarOpen(NAVBAR_VISIBLE_PATHS.some((path) => pathname === path));
    }, [pathname]);

    return (
        <AppContext.Provider
            value={{
                doneTutorial,
                setDoneTutorial,
                navBarOpen,
                setNavBarOpen,
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
