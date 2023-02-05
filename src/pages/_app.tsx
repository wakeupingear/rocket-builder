import AppWrapper from '@/components/AppWrapper';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export default function App({ Component, pageProps }: AppProps) {
    const { pathname } = useRouter();

    return (
        <SwitchTransition mode="out-in">
            <CSSTransition key={pathname} classNames="page" timeout={300}>
                <AppWrapper>
                    <Component {...pageProps} />
                </AppWrapper>
            </CSSTransition>
        </SwitchTransition>
    );
}
