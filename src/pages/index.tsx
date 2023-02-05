import Head from 'next/head';
import { RoundedButton } from '../components/Buttons';
import { AppPage } from '../components/PageComponents';

export default function Home() {
    return (
        <AppPage title="Rocket Garage">
            <h1 className="mt-32 text-white text-7xl text-center font-bold">
                Rocket Garage
            </h1>
            <RoundedButton className="mt-8" href="/garage">
                Start Building
            </RoundedButton>
        </AppPage>
    );
}
