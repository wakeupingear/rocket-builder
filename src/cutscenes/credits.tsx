import {
    Cutscene,
    cutsceneClickButton,
    cutsceneFuncButton,
    cutsceneNextButton,
} from './constants';

export const credits: Cutscene = (
    prog,
    setProg,
    path,
    setPath,
    funcs,
    setRocketStyle
) => {
    switch (path) {
        default:
            return [
                <>
                    <h2 className="text-3xl">
                        <b>Rocket Garage</b>
                    </h2>
                    <p>
                        Developed by{' '}
                        <a
                            href="https://willfarhat.com"
                            target="_blank"
                            className="text-bright"
                        >
                            Will Farhat
                        </a>
                    </p>
                    <p>
                        In 36 hours at{' '}
                        <a href="https://www.hacksc.com/" target="_blank">
                            HackSC 2023
                        </a>
                    </p>
                    {cutsceneNextButton(setProg, 'but where can I learn more?')}
                </>,
                <>
                    <h2 className="text-3xl">
                        <b>Everyday Astronaut</b>
                    </h2>
                    <p>
                        His{' '}
                        <a
                            href="https://www.youtube.com/c/EverydayAstronaut"
                            target="_blank"
                            className="text-bright"
                        >
                            YouTube Channel
                        </a>{' '}
                        is probably the best introduction to spaceflight
                        concepts and engineering. Check it out.
                    </p>
                    {cutsceneNextButton(setProg, 'wait, but what about...')}
                </>,
                <>
                    <h2 className="text-3xl">
                        <b>Scott Manley</b>
                    </h2>
                    <p>
                        If you want to go further, his{' '}
                        <a
                            href="https://www.youtube.com/@scottmanley"
                            target="_blank"
                            className="text-bright"
                        >
                            YouTube Channel
                        </a>{' '}
                        is a gold mine of information.
                    </p>
                    <p>
                        Deep dives on rockets and the organizations and science
                        behind them.
                    </p>
                    {cutsceneNextButton(
                        setProg,
                        'oh! this site is just a ripoff of...'
                    )}
                </>,
                <>
                    <h2 className="text-3xl">
                        <b>Kerbal Space Program</b>
                    </h2>
                    <p>
                        This{' '}
                        <a
                            href="https://store.steampowered.com/app/220200/Kerbal_Space_Program/"
                            target="_blank"
                            className="text-bright"
                        >
                            rocketry sandbox
                        </a>{' '}
                        is generally touted as the gold standard for rocketry
                        games.
                    </p>
                    <p>
                        Unfortunately, it's quite complex and isn't designed to
                        teach the physical concepts that it employs. That makes
                        it a great game, but not a great teaching tool.
                    </p>
                    <p>
                        That issue was ultimately what inspired me to make this.
                        It's inaccurate and imprecise, but it gets the basics
                        across.
                    </p>
                    {cutsceneClickButton(() => {
                        setProg(NaN);
                    }, 'cool! back to building')}
                </>,
            ][prog];
    }
};
