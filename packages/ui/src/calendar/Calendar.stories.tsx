import { Meta, StoryObj } from '@storybook/react';

import { PeriodeColor } from '@navikt/fp-constants';

import Calendar from './Calendar';

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

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
    args: {
        periods: [
            {
                fom: '2024-01-31',
                tom: '2024-02-20',
                color: PeriodeColor.BLUE,
            },
            {
                fom: '2024-02-21',
                tom: '2024-02-21',
                color: PeriodeColor.PINK,
            },
            {
                fom: '2024-02-22',
                tom: '2024-05-05',
                color: PeriodeColor.BLUE,
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: PeriodeColor.LIGHTGREEN,
            },
        ],
    },
};

export const PeriodsWithGap: Story = {
    args: {
        periods: [
            {
                fom: '2024-01-31',
                tom: '2024-02-20',
                color: PeriodeColor.BLUE,
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: PeriodeColor.LIGHTGREEN,
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
                color: PeriodeColor.BLUE,
            },
            {
                fom: '2025-05-06',
                tom: '2025-07-30',
                color: PeriodeColor.LIGHTGREEN,
            },
        ],
    },
};
