import { Meta, StoryObj } from '@storybook/react';

import Calendar from './Calendar';

const meta: Meta<typeof Calendar> = {
    title: 'components/Calendar',
    component: Calendar,
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
    render: (args) => (
        <div style={{ maxWidth: '800px' }}>
            <Calendar {...args} />
        </div>
    ),
    args: {
        periods: [
            {
                fom: '2024-02-01',
                tom: '2024-02-20',
                type: 'førTermin',
            },
            {
                fom: '2024-02-21',
                tom: '2024-02-21',
                type: 'familiehendelse',
            },
            {
                fom: '2024-02-22',
                tom: '2024-05-05',
                type: 'søker',
            },
            {
                fom: '2024-05-06',
                tom: '2024-08-30',
                type: 'medsøker',
            },
        ],
    },
};
