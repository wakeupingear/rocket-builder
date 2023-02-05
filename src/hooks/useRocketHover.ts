import { useApp } from '@/components/AppWrapper';
import { Color } from '@/types/rocketStyles';
import { RocketSection } from '@/types/rocketTypes';
import { useEffect, useState } from 'react';

export default function useRocketHover(
    _color: Color,
    section: RocketSection,
    index: number,
    canClick: boolean
) {
    const { setViewingSection, setViewingIndex, viewingIndex, viewingSection } =
        useApp();

    const [hovered, hover] = useState(false);

    const color: Color =
        hovered || (viewingSection === section && viewingIndex === index)
            ? ['hotpink', 0.3]
            : _color;

    useEffect(() => {
        if (canClick) document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered, canClick]);

    return {
        color,
        hovered,
        hover,
        pointerEvents: canClick
            ? {
                  onPointerOver: (event: any) => hover(true),
                  onPointerOut: (event: any) => hover(false),
                  onClick: (event: any) => {
                      setViewingSection(section);
                      setViewingIndex(index);
                  },
              }
            : {},
    };
}
