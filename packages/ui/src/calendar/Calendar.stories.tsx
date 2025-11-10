import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { BodyShort, Checkbox, CheckboxGroup, Detail, VStack } from '@navikt/ds-react';

import { Calendar } from './Calendar';
import { CalendarPeriod } from './types/CalendarPeriod';

const meta = {
    title: 'Calendar',
    component: Calendar,
    render: (args) => (
        <div style={{ maxWidth: '704px' }}>
            <Calendar {...args} />
        </div>
    ),
} satisfies Meta<typeof Calendar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        periods: [
            {
                fom: '2024-01-31',
                tom: '2024-02-20',
                color: 'BLUE',
            },
            {
                fom: '2024-02-21',
                tom: '2024-02-21',
                color: 'PINK',
            },
            {
                fom: '2024-02-22',
                tom: '2024-05-05',
                color: 'BLUE',
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: 'LIGHTGREEN',
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
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: 'LIGHTGREEN',
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

        return <Calendar periods={perioder} isRangeSelection={false} setSelectedPeriods={setSelectedPeriods} />;
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
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: 'LIGHTGREEN',
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

        return <Calendar periods={perioder} isRangeSelection setSelectedPeriods={setSelectedPeriods} />;
    },
};

export const PeriodsWithGap: Story = {
    args: {
        periods: [
            {
                fom: '2024-01-31',
                tom: '2024-02-20',
                color: 'BLUE',
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: 'LIGHTGREEN',
            },
        ],
    },
};

export const PeriodsThatSpanOverAYear: Story = {
    args: {
        periods: [
            {
                fom: '2024-02-01',
                tom: '2024-02-20',
                color: 'BLUE',
            },
            {
                fom: '2025-05-06',
                tom: '2025-07-30',
                color: 'LIGHTGREEN',
            },
        ],
    },
};
