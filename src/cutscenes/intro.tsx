import RocketModel from '@/components/3D/RocketModel';
import { DEFAULT_ROCKET_STYLE } from '@/types/rocketStyles';
import { SATURN_V_STYLE } from '@/types/rocketTypes';
import {
    Cutscene,
    cutsceneClickButton,
    cutsceneFuncButton,
    cutsceneNextButton,
    cutscenePathButton,
} from './constants';

export const garage: Cutscene = (
    prog,
    setProg,
    path,
    setPath,
    funcs,
    setRocketStyle
) => {
    switch (path) {
        case 'introDone':
            return (
                <>
                    <h2 className="text-3xl">
                        Replay the <b>Intro</b>?
                    </h2>
                    <p>How sweet, it was hard to make :')</p>
                    <div className="flex gap-4">
                        {cutsceneClickButton(() => {
                            setPath('');
                            setProg(0);
                        }, 'yeah!')}
                        {cutsceneClickButton(() => {
                            setPath('');
                            setProg(0);
                        }, 'nah the intro sucked lmao!')}
                    </div>
                </>
            );
        case 'skip':
            return [
                <>
                    <h2 className="text-3xl">Fair enough...</h2>
                    <p>You can come back to this intro any time!</p>
                    <div className="flex gap-4">
                        {cutsceneFuncButton(
                            'finishTutorial',
                            funcs,
                            'let me build rocket!!111!!'
                        )}
                        {cutsceneClickButton(() => {
                            setPath('');
                            setProg(0);
                        }, 'wait go back!')}
                    </div>
                </>,
            ][prog];
        default:
            return [
                <>
                    <h2 className="text-3xl">
                        Welcome to the <b>Rocket Garage!</b>
                    </h2>
                    <p>Ever wondered how rockets work?</p>
                    <p></p>
                    <div className="flex gap-4">
                        {cutsceneClickButton(() => {
                            setProg((prog) => prog + 1);
                            setRocketStyle(SATURN_V_STYLE);
                        }, 'of course!')}
                        {cutscenePathButton(
                            'skip',
                            setPath,
                            setProg,
                            'nope nope nope nope'
                        )}
                    </div>
                </>,
                <>
                    <h2 className="text-3xl">
                        This is a <b>Rocket</b>
                    </h2>
                    <p>(Well, a very simple model of one)</p>
                    <p>Give it a spin - it's 3D!</p>
                    <p>
                        (<b>Drag</b> to spin, <b>Scroll</b> to zoom)
                    </p>
                    {cutsceneNextButton(setProg, 'wow, pointy!')}
                </>,
                <>
                    <h2 className="text-3xl">
                        Yep, Pointy End <b>Up,</b>
                    </h2>
                    <h2 className="text-3xl">
                        Flamey End <b>Down</b>
                    </h2>
                    <p>
                        This tapering shape minimizes <b>atmospheric drag</b> to
                        keep it from slowing down!
                    </p>
                    <p>
                        It also reduces shockwaves when going <b>supersonic</b>
                    </p>
                    <p>(That's faster than the speed of sound!)</p>
                    {cutsceneClickButton(() => {
                        setProg((prog) => prog + 1);
                        setRocketStyle({
                            ...SATURN_V_STYLE,
                            engines: [...DEFAULT_ROCKET_STYLE.engines],
                        });
                    }, 'how does it go so fast??')}
                </>,
                <>
                    <h2 className="text-3xl">
                        <b>Rocket Engines!</b>
                    </h2>
                    <p>
                        These are the what shoot out the <b>hot gas</b> that
                        propels the rocket upwards
                    </p>
                    <p>Check them out at the bottom of the model</p>
                    {cutsceneClickButton(() => {
                        setProg((prog) => prog + 1);
                        setRocketStyle({
                            ...SATURN_V_STYLE,
                            stages: [
                                {
                                    ...DEFAULT_ROCKET_STYLE.stages[0],
                                },
                                ...SATURN_V_STYLE.stages.slice(1),
                            ],
                        });
                    }, 'but how do they work?')}
                </>,
                <>
                    <h2 className="text-3xl">
                        <b>Fuel</b> and <b>Oxidizer</b>
                    </h2>
                    <p>
                        Rocket engines are built to burn two substances - a fuel
                        and an oxidizer - as fast as possible at high pressures
                    </p>
                    <p>
                        The higher the pressure, the faster the exhaust gas
                        leaves the engine
                    </p>
                    <p>
                        And the faster the exhaust, the more <b>thrust</b> is
                        produced, pushing the rocket up!
                    </p>
                    {cutsceneClickButton(() => {
                        setProg((prog) => prog + 1);
                        setRocketStyle({
                            ...SATURN_V_STYLE,
                            stages: [
                                {
                                    ...DEFAULT_ROCKET_STYLE.stages[0],
                                    oxidizer: ['white', 0],
                                },
                                ...SATURN_V_STYLE.stages.slice(1),
                            ],
                        });
                    }, 'what kind of gas, 87 or 89?')}
                </>,
                <>
                    <h2 className="text-3xl">...Not just any fuel</h2>
                    <p>
                        Most large rockets use specialty <b>liquid fuels</b>{' '}
                        that are optimized for high density and low boiling
                        point
                    </p>
                    <p>
                        For example, <b>Space X's Falcon 9</b> uses <b>RP-1</b>{' '}
                        (a highly refined form of Kerosene)
                    </p>
                    {cutsceneClickButton(() => {
                        setProg((prog) => prog + 1);
                        setRocketStyle({
                            ...SATURN_V_STYLE,
                            stages: [
                                {
                                    ...DEFAULT_ROCKET_STYLE.stages[0],
                                },
                                ...SATURN_V_STYLE.stages.slice(1),
                            ],
                        });
                    }, "what about that 'oxidizer'?")}
                </>,
                <>
                    <h2 className="text-3xl">Fuel + Oxidizer = Thrust!</h2>
                    <p>On its own, fuel won't combust and produce thrust</p>
                    <p>
                        But, when liquid fuel is mixed and ignited with an{' '}
                        <b>oxidizer</b>, the energy in both substances is
                        released as high pressure exhaust
                    </p>
                    <p>
                        Most rockets use the same oxidizer: <b>LOX</b> (Liquid
                        Oxygen)
                    </p>
                    {cutsceneClickButton(() => {
                        setProg((prog) => prog + 1);
                        setRocketStyle({
                            ...SATURN_V_STYLE,
                            engines: [...DEFAULT_ROCKET_STYLE.engines],
                            stages: [
                                {
                                    ...DEFAULT_ROCKET_STYLE.stages[0],
                                },
                                ...SATURN_V_STYLE.stages.slice(1),
                            ],
                        });
                    }, 'ah like bagels')}
                </>,
                <>
                    <h2 className="text-3xl">From Tank to Engine</h2>
                    <p>
                        So to fly, a rocket just has to move fuel and oxidizer
                        from its tanks to its engines
                    </p>
                    <p>And do it fast. Really fast.</p>
                    <p>
                        For context, the <b>Falcon 9</b> rocket uses{' '}
                        <b>3,200 lbs</b> of fuel every second!
                    </p>
                    <p>Or, the weight of a Toyota Prius.</p>
                    <p>Every second.</p>
                    {cutsceneNextButton(setProg, 'how tf does that work')}
                </>,
                <>
                    <h2 className="text-3xl">Bonus Fact: Turbopumps!</h2>
                    <p>
                        To move fuel/oxidizer at high speeds and high pressure,
                        rocket engines have a second engine inside them!
                    </p>
                    <p>
                        This mini-engine's only job is to spin a pump at immense
                        speeds to keep things flowing
                    </p>
                    {cutsceneClickButton(() => {
                        setProg((prog) => prog + 1);
                        setRocketStyle(SATURN_V_STYLE);
                    }, 'aghhh my brain')}
                </>,
                <>
                    <h2 className="text-3xl">Yeah, it's a lot</h2>
                    <p>That's why they call it rocket science</p>
                    <p>
                        We could keep going down these engineering rabbit
                        holes...
                    </p>
                    <p>...or we could build a rocket</p>
                    {cutsceneClickButton(() => {
                        setProg(0);
                        setPath('introDone');
                        funcs['finishTutorial']();
                    }, 'BUILD ROCKET BUILD ROCKET')}
                </>,
            ][prog];
    }
};
