import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { HarIkkeSaker } from './HarIkkeSaker';

const meta = {
    title: 'HarIkkeSaker',
    component: HarIkkeSaker,
    render: (props) => {
        return (
            <MemoryRouter>
                <HarIkkeSaker {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof HarIkkeSaker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        harOppdatertSak: false,
    },
};

export const HarOppdatertSak: Story = {
    args: {
        harOppdatertSak: true,
    },
};
