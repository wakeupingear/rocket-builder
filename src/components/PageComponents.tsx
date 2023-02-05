import clsx from 'clsx';
import Head from 'next/head';
import { ReactNode } from 'react';

interface AppPageProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export function AppPage({
    children,
    className = '',
    title = '',
}: AppPageProps) {
    return (
        <>
            {title && (
                <Head>
                    <title>{title}</title>
                </Head>
            )}
            <div
                className={clsx(
                    'flex flex-col w-full min-h-screen items-center text-white',
                    className
                )}
            >
                {children}
            </div>
        </>
    );
}
