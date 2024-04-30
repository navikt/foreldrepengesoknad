import { Meta, StoryObj } from '@storybook/react';

import Calendar from './Calendar';
import { DayColor } from './Day';

const meta = {
    title: 'components/Calendar',
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
                color: DayColor.BLUE,
            },
            {
                fom: '2024-02-21',
                tom: '2024-02-21',
                color: DayColor.PINK,
            },
            {
                fom: '2024-02-22',
                tom: '2024-05-05',
                color: DayColor.BLUE,
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: DayColor.GREEN,
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
                color: DayColor.BLUE,
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                color: DayColor.GREEN,
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
                color: DayColor.BLUE,
            },
            {
                fom: '2025-05-06',
                tom: '2025-07-30',
                color: DayColor.GREEN,
            },
        ],
    },
};
