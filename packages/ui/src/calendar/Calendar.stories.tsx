import { ExclamationmarkTriangleFillIcon, HeartFillIcon } from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { BodyShort, Detail, VStack } from '@navikt/ds-react';

import { Calendar } from './Calendar';
import { CalendarPeriod } from './types/CalendarPeriod';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

const getSrTextForSelectedPeriod = () => '';

const meta = {
    title: 'Calendar',
    component: Calendar,
    args: {
        firstDateInCalendar: '2024-01-31',
        lastDateInCalendar: '2024-08-30',
        getSrTextForSelectedPeriod,
        periods: [
            {
                fom: '2024-01-31',
                tom: '2024-02-20',
                color: 'BLUE',
                srText: 'Mors periode',
            },
            {
                fom: '2024-02-21',
                tom: '2024-02-21',
                color: 'BLUE',
                srText: 'Termindato',
                icon: <HeartFillIcon aria-hidden color="var(--ax-bg-brand-magenta-strong)" width={25} height={25} />,
                iconFull: true,
            },
            {
                fom: '2024-02-22',
                tom: '2024-05-05',
                color: 'BLUE',
                srText: 'Mors periode',
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: 'LIGHTGREEN',
                srText: 'Fars periode',
            },
        ],
    },
} satisfies Meta<typeof Calendar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IkkeVisUkenr: Story = {
    args: {
        showWeekNumbers: false,
    },
};

export const MedTooltip: Story = {
    args: {
        dateTooltipCallback: (date: string) => (
            <VStack gap="space-4">
                <BodyShort>Dette er en tooltip</BodyShort>
                <Detail>{date}</Detail>
            </VStack>
        ),
    },
};

export const VisKalenderMedValgAvEnkeltdager: Story = {
    render: (args) => {
        const [perioder, setPerioder] = useState<CalendarPeriod[]>(args.periods);
        return (
            <Calendar
                {...args}
                periods={perioder}
                setSelectedPeriods={(value) => {
                    setPerioder(value);
                    action('Valgte perioder')(value);
                }}
            />
        );
    },
};

export const VisKalenderMedValgAvPerioder: Story = {
    render: (args) => {
        const [perioder, setPerioder] = useState<CalendarPeriod[]>(args.periods);
        return (
            <Calendar
                {...args}
                periods={perioder}
                isRangeSelection
                setSelectedPeriods={(value) => {
                    setPerioder(value);
                    action('Valgte perioder')(value);
                }}
            />
        );
    },
};

export const PeriodsWithGap: Story = {
    args: {
        periods: [
            {
                fom: '2024-01-31',
                tom: '2024-02-20',
                color: 'BLUE',
                srText: 'Mors periode',
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: 'LIGHTGREEN',
                srText: 'Fars periode',
            },
        ],
        firstDateInCalendar: '2024-01-31',
        lastDateInCalendar: '2024-08-30',
    },
};

export const PeriodsThatSpanOverAYear: Story = {
    args: {
        periods: [
            {
                fom: '2024-02-01',
                tom: '2024-02-20',
                color: 'BLUE',
                srText: 'Mors periode',
            },
            {
                fom: '2025-05-06',
                tom: '2025-07-30',
                color: 'LIGHTGREEN',
                srText: 'Fars periode',
            },
        ],
        firstDateInCalendar: '2024-02-01',
        lastDateInCalendar: '2025-07-30',
    },
};

export const MedEnKolonne: Story = {
    args: {
        nrOfColumns: 1,
    },
};

export const MedToKolonner: Story = {
    args: {
        nrOfColumns: 2,
    },
};

export const MedTreKolonner: Story = {
    args: {
        nrOfColumns: 3,
    },
};

export const MarkertMedStjerne: Story = {
    args: {
        firstDateInCalendar: '2024-01-31',
        lastDateInCalendar: '2024-08-30',
        periods: [
            {
                fom: '2024-01-31',
                tom: '2024-02-20',
                color: 'BLUE',
                srText: 'Mors periode',
            },
            {
                fom: '2024-02-21',
                tom: '2024-02-21',
                color: 'BLUE',
                srText: 'Termindato',
                icon: <HeartFillIcon aria-hidden color="var(--ax-bg-brand-magenta-strong)" width={25} height={25} />,
                iconFull: true,
            },
            {
                fom: '2024-02-22',
                tom: '2024-05-05',
                color: 'BLUE',
                srText: 'Mors periode',
                icon: <ExclamationmarkTriangleFillIcon aria-hidden color="var(--ax-warning-600)" />,
                iconFull: false,
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: 'LIGHTGREEN',
                srText: 'Fars periode',
                icon: <ExclamationmarkTriangleFillIcon aria-hidden color="var(--ax-warning-600)" />,
                iconFull: false,
            },
        ],
    },
};

const allePeriodefarger: Array<[string, CalendarPeriodColor]> = [
    ['2024-01-01', 'NONE'],
    ['2024-01-02', 'LIGHTBLUE'],
    ['2024-01-03', 'BLUE'],
    ['2024-01-04', 'DARKBLUE'],
    ['2024-01-05', 'GREEN'],
    ['2024-01-08', 'LIGHTGREEN'],
    ['2024-01-09', 'GRAY'],
    ['2024-01-10', 'DARKGRAY'],
    ['2024-01-11', 'BLACK'],
    ['2024-01-12', 'BLACKOUTLINE'],
    ['2024-01-15', 'LIGHTBLUEGREEN'],
    ['2024-01-16', 'LIGHTGREENBLUE'],
    ['2024-01-17', 'GREENSTRIPED'],
    ['2024-01-18', 'BLUESTRIPED'],
    ['2024-01-19', 'GREENOUTLINE'],
    ['2024-01-22', 'BLUEOUTLINE'],
    ['2024-01-23', 'GREEN_WITH_BLACK_OUTLINE'],
    ['2024-01-24', 'BLUE_WITH_BLACK_OUTLINE'],
    ['2024-01-25', 'BEIGEOUTLINE'],
];

export const AllePeriodefarger: Story = {
    args: {
        firstDateInCalendar: '2024-01-01',
        lastDateInCalendar: '2024-01-31',
        periods: allePeriodefarger.map(([dato, color]) => ({
            fom: dato,
            tom: dato,
            color,
            srText: color,
        })),
        dateTooltipCallback: (date: string) => (
            <BodyShort>{allePeriodefarger.find(([dato]) => dato === date)?.[1]}</BodyShort>
        ),
    },
};
