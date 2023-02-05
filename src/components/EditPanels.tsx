import { Engine, EngineConfig, Stage } from '@/types/rocketTypes';
import React, { Dispatch, SetStateAction } from 'react';
import ReactSlider from 'react-slider';
import { useApp } from './AppWrapper';
import { RoundedButton } from './Buttons';
import SidePanel from './SidePanel';

interface EditSliderProps {
    title: string;
    value: number;
    setValue: (val: number) => void;
    min?: number;
    max?: number;
    unit?: string;
}

function EditSlider({
    title,
    value,
    setValue,
    max,
    min,
    unit = 'm',
}: EditSliderProps) {
    return (
        <>
            <h4 className="mt-4 text-lg">
                {title}:{' '}
                <span className="text-highlight">
                    {Math.round(value * 100) / 100} {unit}
                </span>
            </h4>
            <ReactSlider
                value={value}
                onChange={(val) => {
                    setValue(val as number);
                }}
                className="mb-4 mt-2 w-full h-4 flex items-center"
                thumbClassName="bg-bright w-4 h-4 rounded-full hover:cursor-pointer"
                trackClassName="bg-slate-300 h-1 rounded-full hover:cursor-pointer"
                min={min !== undefined ? min : 0}
                max={max !== undefined ? max : 100}
                step={0.1}
            />
        </>
    );
}

export default function EditPanels() {
    const {
        viewingIndex,
        viewingSection,
        setViewingIndex,
        setViewingSection,
        rocket,
        setRocket,
        startLaunch,
    } = useApp();
    const open = viewingSection !== null;
    const { name, fuelOxidizer, engines } = rocket;
    const { fuel, oxidizer } = fuelOxidizer;
    const {
        engine: { mixtureRatio },
    } = engines[0];

    let content = null;
    if (viewingSection === 'stage') {
        const stage: Stage = rocket.stages[viewingIndex];
        const {
            height,
            density,
            radius,
            hasPropellant,
            fuelHeight = 0,
            oxidizerHeight = 0,
            heightOffset = 0,
        } = stage;

        content = (
            <>
                <h3 className="text-2xl">
                    ⛽{'  '}Stage {viewingIndex + 1}{' '}
                    <span className="ml-2 mr-4 text-sm text-highlight">
                        ~ {Math.round(height * density).toLocaleString()} kg
                    </span>
                </h3>
                <EditSlider
                    title="Height"
                    value={height}
                    setValue={(val) => {
                        const newStages = [...rocket.stages];
                        newStages[viewingIndex].height = val;
                        setRocket({ ...rocket, stages: newStages });
                    }}
                    min={
                        hasPropellant ? fuelHeight + oxidizerHeight : undefined
                    }
                />
                <EditSlider
                    title="Radius"
                    value={radius}
                    setValue={(val) => {
                        const newStages = [...rocket.stages];
                        newStages[viewingIndex].radius = val;
                        setRocket({ ...rocket, stages: newStages });
                    }}
                    min={rocket.stages
                        .slice(viewingIndex + 1)
                        .reduce((acc, stage) => Math.max(acc, stage.radius), 1)}
                    max={rocket.stages
                        .slice(0, viewingIndex)
                        .reduce(
                            (acc, stage) => Math.min(acc, stage.radius),
                            10
                        )}
                />
                {hasPropellant && (
                    <div className="px-4 flex flex-col bg-dark rounded-lg">
                        <EditSlider
                            title="Fuel Tank Height"
                            value={fuelHeight}
                            setValue={(val) => {
                                const newStages = [...rocket.stages];
                                newStages[viewingIndex].fuelHeight = val;
                                newStages[viewingIndex].height = Math.max(
                                    val + oxidizerHeight,
                                    newStages[viewingIndex].height
                                );
                                setRocket({ ...rocket, stages: newStages });
                            }}
                            min={radius * 2}
                        />
                        <EditSlider
                            title="Oxidizer Tank Height"
                            value={oxidizerHeight}
                            setValue={(val) => {
                                const newStages = [...rocket.stages];
                                newStages[viewingIndex].oxidizerHeight = val;
                                newStages[viewingIndex].height = Math.max(
                                    val + fuelHeight,
                                    newStages[viewingIndex].height
                                );
                                setRocket({ ...rocket, stages: newStages });
                            }}
                            min={radius * 2}
                        />
                    </div>
                )}

                {viewingIndex > 0 && (
                    <>
                        <EditSlider
                            title="Interstage Height"
                            value={heightOffset}
                            setValue={(val) => {
                                const newStages = [...rocket.stages];
                                newStages[viewingIndex].heightOffset = val;
                                setRocket({ ...rocket, stages: newStages });
                            }}
                            max={5}
                        />
                    </>
                )}

                <div className="flex items-center justify-center gap-4">
                    {viewingIndex === rocket.stages.length - 1 && (
                        <RoundedButton
                            onClick={() => {
                                const newStages = [...rocket.stages];
                                newStages.push({
                                    ...stage,
                                });
                                setRocket({ ...rocket, stages: newStages });
                                setViewingIndex(viewingIndex + 1);
                            }}
                        >
                            Add
                        </RoundedButton>
                    )}
                    {viewingIndex > 0 && (
                        <RoundedButton
                            onClick={() => {
                                const newStages = [...rocket.stages];
                                newStages.splice(viewingIndex, 1);
                                setRocket({ ...rocket, stages: newStages });
                                setViewingSection(null);
                            }}
                        >
                            Remove
                        </RoundedButton>
                    )}
                </div>
            </>
        );
    } else if (viewingSection === 'engine') {
        const engineConfig: EngineConfig = rocket.engines[viewingIndex];
        const { engine, offset } = engineConfig;
        const { mass, radius, length } = engine;

        content = (
            <>
                <h3 className="text-2xl">
                    🔥{'  '}Engine{rocket.engines.length > 1 ? 's' : ''}
                    <span className="ml-2 mr-4 text-sm text-highlight">
                        ~ {mass.toLocaleString()} kg
                    </span>
                </h3>

                <EditSlider
                    title="Radius"
                    value={radius}
                    setValue={(val) => {
                        const newEngines = [...rocket.engines];
                        newEngines[viewingIndex].engine.radius = val;
                        setRocket({ ...rocket, engines: newEngines });
                    }}
                    min={0.5}
                    max={rocket.stages[0].radius}
                />
                <EditSlider
                    title="Length"
                    value={length}
                    setValue={(val) => {
                        const newEngines = [...rocket.engines];
                        newEngines[viewingIndex].engine.length = val;
                        setRocket({ ...rocket, engines: newEngines });
                    }}
                />

                <div className="px-4 flex flex-col bg-dark rounded-lg">
                    <EditSlider
                        title="X Offset"
                        value={offset[0]}
                        setValue={(val) => {
                            const newEngines = [...rocket.engines];
                            newEngines[viewingIndex].offset[0] = val;
                            setRocket({ ...rocket, engines: newEngines });
                        }}
                        min={-rocket.stages[0].radius}
                        max={rocket.stages[0].radius}
                    />
                    <EditSlider
                        title="Z Offset"
                        value={offset[2]}
                        setValue={(val) => {
                            const newEngines = [...rocket.engines];
                            newEngines[viewingIndex].offset[2] = val;
                            setRocket({ ...rocket, engines: newEngines });
                        }}
                        min={-rocket.stages[0].radius}
                        max={rocket.stages[0].radius}
                    />
                </div>

                <div className="mt-4 flex items-center justify-center gap-4">
                    {(viewingIndex === rocket.engines.length - 1 || true) && (
                        <RoundedButton
                            onClick={() => {
                                const newEngines = [...rocket.engines];
                                newEngines.push({
                                    engine: { ...engine },
                                    offset: [0, 0, 0],
                                });
                                setRocket({ ...rocket, engines: newEngines });
                                setViewingIndex(viewingIndex + 1);
                            }}
                        >
                            Add
                        </RoundedButton>
                    )}
                    {rocket.engines.length > 1 && (
                        <RoundedButton
                            onClick={() => {
                                const newEngines = [...rocket.engines];
                                newEngines.splice(viewingIndex, 1);
                                setRocket({ ...rocket, engines: newEngines });
                                setViewingSection(null);
                            }}
                        >
                            Remove
                        </RoundedButton>
                    )}
                </div>
            </>
        );
    }

    const totalMass =
        rocket.stages.reduce(
            (acc, stage) => acc + stage.height * stage.density,
            0
        ) + rocket.engines.reduce((acc, engine) => acc + engine.engine.mass, 0);
    const actualMixRatio =
        (((rocket.stages[0].fuelHeight || 1) * fuel.density) /
            ((rocket.stages[0].oxidizerHeight || 1) * oxidizer.density)) *
        5;

    return (
        <>
            <SidePanel
                side="left"
                className="top-4"
                externalOpen={true}
                hideCloseButton
            >
                <div className="flex items-center w-48 text-xl">
                    🚀
                    <input
                        className="p-1 px-2 ml-2 bg-transparent border-2 border-transparent transition-all hover:border-white rounded-xl flex max-w-[calc(100%-2rem)] text-ellipsis"
                        value={name}
                        onChange={(e) => {
                            setRocket({
                                ...rocket,
                                name: e.target.value,
                            });
                        }}
                    />
                </div>
                <p>
                    Mass:{' '}
                    <span className="text-highlight">
                        ~ {Math.round(totalMass).toLocaleString()} kg
                    </span>
                </p>
                <p>
                    Fuel:{' '}
                    <span className="text-highlight">
                        {fuelOxidizer.fuel.name}
                    </span>
                </p>
                <p>
                    Oxidizer:{' '}
                    <span className="text-highlight">
                        {fuelOxidizer.oxidizer.name}
                    </span>
                </p>
                <p>
                    Target Mix:{' '}
                    <span className="text-highlight">{mixtureRatio}</span>
                </p>
                <p>
                    Actual Mix:{' '}
                    <span className="text-highlight">
                        {Math.round(actualMixRatio * 100) / 100}
                    </span>
                </p>

                <RoundedButton className="mt-4" onClick={startLaunch}>
                    Launch!
                </RoundedButton>
            </SidePanel>

            <SidePanel
                side="left"
                className="bottom-4"
                externalOpen={open}
                closeClick={() => {
                    setViewingSection(null);
                }}
                contentClassName="min-w-[20rem]"
            >
                {content}
            </SidePanel>
        </>
    );
}
