import { Meta, StoryObj } from '@storybook/react/*';

import HarIkkeSaker from './HarIkkeSaker';

const meta = {
    title: 'HarIkkeSaker',
    component: HarIkkeSaker,
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
