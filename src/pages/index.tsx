import Doors from '@/components/3D/garage/Doors';
import Table from '@/components/3D/garage/Table';
import { useApp } from '@/components/AppWrapper';
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
        <AppPage title="Rocket Garage">
            <div className="relative flex w-screen h-screen items-center justify-center">
                {garageOpen && <GarageScene setLoaded={setLoaded} />}
                <Doors open={garageOpen && loaded} />
                <Table tableOpen={tableOpen} setTableOpen={setTableOpen} />
            </div>
        </AppPage>
    );
}
