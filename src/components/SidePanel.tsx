import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { useApp } from './AppWrapper';
import { RoundedButton } from './Buttons';

interface SidePanelProps {
    buttonChildren?: ReactNode;
    side: 'left' | 'right' | 'top' | 'bottom';
    className?: string;
    contentClassName?: string;
    children?: ReactNode;
    externalOpen?: boolean;
    onClick?: () => void;
    closeClick?: () => void;
    hideCloseButton?: boolean;
}

export default function SidePanel({
    buttonChildren,
    side,
    className = '',
    contentClassName = '',
    children,
    externalOpen,
    onClick,
    closeClick,
    hideCloseButton = false,
}: SidePanelProps) {
    const { launching } = useApp();

    const [open, setOpen] = useState(false);

    return (
        <>
            {buttonChildren && (
                <RoundedButton
                    className={clsx(
                        'absolute',
                        {
                            'bottom-4': side === 'bottom',
                            '!-bottom-16 scale-0':
                                side === 'bottom' &&
                                (open || externalOpen || launching),

                            'top-4': side === 'top',
                            '!-top-16 scale-0':
                                side === 'top' &&
                                (open || externalOpen || launching),

                            'left-4': side === 'left',
                            '!-left-64 scale-0':
                                side === 'left' &&
                                (open || externalOpen || launching),

                            'right-4': side === 'right',
                            '!-right-64 scale-0':
                                side === 'right' &&
                                (open || externalOpen || launching),
                        },
                        className
                    )}
                    onClick={onClick ? onClick : () => setOpen(!open)}
                >
                    {buttonChildren}
                </RoundedButton>
            )}
            {children && (
                <div
                    className={clsx(
                        'absolute rounded-b-3xl rounded-tl-3xl rounded-tr-md p-4 bg-primary font-bold transition-all shadow-lg',
                        {
                            '-bottom-16': side === 'bottom',
                            '!bottom-4':
                                side === 'bottom' &&
                                !launching &&
                                (open || externalOpen),

                            '-top-32': side === 'top',
                            '!top-4':
                                side === 'top' &&
                                !launching &&
                                (open || externalOpen),

                            '-left-64': side === 'left',
                            '!left-4':
                                side === 'left' &&
                                !launching &&
                                (open || externalOpen),

                            '-right-64': side === 'right',
                            '!right-4':
                                side === 'right' &&
                                !launching &&
                                (open || externalOpen),
                        },
                        className,
                        contentClassName
                    )}
                >
                    <div className="flex flex-col">
                        {children}
                        {!hideCloseButton && (
                            <button
                                className="absolute top-2 right-3"
                                onClick={() => {
                                    setOpen(false);
                                    if (closeClick) {
                                        closeClick();
                                    }
                                }}
                            >
                                X
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
