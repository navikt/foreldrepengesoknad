import { HeartFillIcon } from '@navikt/aksel-icons';

import { HStack } from '@navikt/ds-react';

import { BlåSirkel } from './icons/BlåSirkel';
import { GrønnSirkel } from './icons/GrønnSirkel';
import { LillaSirkel } from './icons/LillaSirkel';

type IconType = 'blue' | 'green' | 'pink' | 'purple';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    iconType: IconType;
}

export const CalendarIconLabel = ({ children, iconType }: Props) => {
    const baseClasses = 'flex w-fit rounded-[20px] px-[10px] py-[4px]';

    const bgClass = getBackground(iconType);

    return (
        <div className={`${baseClasses} ${bgClass}`}>
            <HStack gap="space-8" align="center" wrap={false}>
                {children}
                {iconType === 'pink' && <HeartFillIcon color="var(--ax-bg-warning-strong)" aria-hidden />}
                {iconType === 'purple' && <LillaSirkel />}
                {iconType === 'blue' && <BlåSirkel />}
                {iconType === 'green' && <GrønnSirkel />}
            </HStack>
        </div>
    );
};

const getBackground = (iconType: IconType) => {
    switch (iconType) {
        case 'blue':
            return 'bg-ax-accent-100';
        case 'green':
            return 'bg-ax-success-200';
        case 'pink':
            return 'bg-ax-danger-100';
        case 'purple':
            return 'bg-ax-meta-purple-200';
    }
    return '';
};
