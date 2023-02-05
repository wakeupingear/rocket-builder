import { RoundedButton } from '@/components/Buttons';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type Cutscene = (
    prog: number,
    setProg: Dispatch<SetStateAction<number>>,
    path: string,
    setPath: Dispatch<SetStateAction<string>>,
    funcs: { [key: string]: () => void },
    setSideContent: Dispatch<SetStateAction<ReactNode>>
) => ReactNode;

export const cutsceneNextButton = (
    setProg: Dispatch<SetStateAction<number>>,
    text = 'Ok!'
) => (
    <RoundedButton onClick={() => setProg((prog) => prog + 1)}>
        {text}
    </RoundedButton>
);

export const cutscenePathButton = (
    path: string,
    setPath: Dispatch<SetStateAction<string>>,
    setProg: Dispatch<SetStateAction<number>>,
    text = 'Ok!'
) => (
    <RoundedButton
        onClick={() => {
            setPath(path);
            setProg(0);
        }}
    >
        {text}
    </RoundedButton>
);

export const cutsceneFuncButton = (
    func: string,
    funcs: { [key: string]: () => void },
    text = 'Ok!'
) => (
    <RoundedButton
        onClick={() => {
            funcs[func]();
        }}
    >
        {text}
    </RoundedButton>
);

export const cutsceneClickButton = (onClick = () => {}, text = 'Ok!') => (
    <RoundedButton onClick={onClick}>{text}</RoundedButton>
);
