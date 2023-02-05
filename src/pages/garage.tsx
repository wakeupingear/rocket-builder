import Doors from '@/components/3D/garage/Doors';
import Table from '@/components/3D/garage/Table';
import { useApp } from '@/components/AppWrapper';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import GarageScene from '../components/3D/garage/GarageScene';
import { AppPage } from '../components/PageComponents';

export default function Garage() {
    const { doneTutorial } = useApp();

    const [garageOpen, setGarageOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [tableOpen, setTableOpen] = useState(false);
    useEffect(() => {
        setTableOpen(!doneTutorial);
        setGarageOpen(doneTutorial);
    }, [doneTutorial]);

    return (
        <AppPage title="Garage">
            <div className="relative flex w-screen h-screen items-center justify-center">
                {garageOpen && <GarageScene setLoaded={setLoaded} />}
                <div
                    className={clsx(
                        'absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-all duration-500 ease-in-out',
                        {
                            'opacity-0 pointer-events-none': !tableOpen,
                        }
                    )}
                />
                <Doors open={garageOpen && loaded} />
                <Table tableOpen={tableOpen} setTableOpen={setTableOpen} />
            </div>
        </AppPage>
    );
}
