import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { BodyShort, Detail, VStack } from '@navikt/ds-react';

import { Calendar } from './Calendar';
import { CalendarPeriod } from './types/CalendarPeriod';

const meta = {
    title: 'Calendar',
    component: Calendar,
    render: (args) => (
        <div>
            <Calendar {...args} />
        </div>
    ),
} satisfies Meta<typeof Calendar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
                color: 'PINK',
                srText: 'Termindato',
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
};

export const IkkeVisUkenr: Story = {
    args: {
        ...Default.args,
        showWeekNumbers: false,
    },
};

export const MedTooltip: Story = {
    args: {
        ...Default.args,
        dateTooltipCallback: (date: string) => (
            <VStack gap="space-4">
                <BodyShort>Dette er en tooltip</BodyShort>
                <Detail>{date}</Detail>
            </VStack>
        ),
    },
};

export const VisKalenderMedValgAvEnkeltdager: Story = {
    args: Default.args,
    render: () => {
        const allePerioder = [
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
        ] satisfies CalendarPeriod[];

        const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

        const [perioder, setPerioder] = useState<CalendarPeriod[]>(allePerioder);
        const setSelectedPeriods = (value: React.SetStateAction<CalendarPeriod[]>) => {
            setPerioder((old) => {
                const newValue = typeof value === 'function' ? value(old) : value;
                return newValue.sort(sortPeriods);
            });
        };

        return (
            <Calendar
                periods={perioder}
                isRangeSelection={false}
                setSelectedPeriods={setSelectedPeriods}
                firstDateInCalendar={allePerioder[0]!.fom}
                lastDateInCalendar={allePerioder[1]!.tom}
            />
        );
    },
};

export const VisKalenderMedValgAvPerioder: Story = {
    args: Default.args,
    render: () => {
        const allePerioder = [
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
        ] satisfies CalendarPeriod[];

        const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

        const [perioder, setPerioder] = useState<CalendarPeriod[]>(allePerioder);
        const setSelectedPeriods = (value: React.SetStateAction<CalendarPeriod[]>) => {
            setPerioder((old) => {
                const newValue = typeof value === 'function' ? value(old) : value;
                return newValue.sort(sortPeriods);
            });
        };

        return (
            <Calendar
                periods={perioder}
                isRangeSelection
                setSelectedPeriods={setSelectedPeriods}
                firstDateInCalendar={allePerioder[0]!.fom}
                lastDateInCalendar={allePerioder[1]!.tom}
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
        ...Default.args,
        nrOfColumns: 1,
    },
};

export const MedToKolonner: Story = {
    args: {
        ...Default.args,
        nrOfColumns: 2,
    },
};

export const MedTreKolonner: Story = {
    args: {
        ...Default.args,
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
                color: 'PINK',
                srText: 'Termindato',
            },
            {
                fom: '2024-02-22',
                tom: '2024-05-05',
                color: 'BLUE',
                srText: 'Mors periode',
                isMarked: true,
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: 'LIGHTGREEN',
                srText: 'Fars periode',
                isMarked: true,
            },
        ],
    },
};
