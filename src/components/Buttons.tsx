import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    target?: string;
}

function Button({ children, className, href, onClick, target }: ButtonProps) {
    if (href)
        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        );

    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}

export function RoundedButton({ className, ...rest }: ButtonProps) {
    return (
        <Button
            {...rest}
            className={clsx(
                'rounded-3xl px-4 py-2 bg-bright border-highlight border-4 font-bold transition-all text-white',
                'hover:bg-primary hover:border-dark',
                className
            )}
        />
    );
}
