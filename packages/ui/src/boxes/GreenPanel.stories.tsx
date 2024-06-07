import { Meta, StoryObj } from '@storybook/react';

import GreenPanel from './GreenPanel';

const meta = {
    title: 'components/GreenPanel',
    component: GreenPanel,
} satisfies Meta<typeof GreenPanel>;
export default meta;

type Story = StoryObj<typeof GreenPanel>;

export const Default: Story = {
    args: {
        isDarkGreen: false,
        children: <div>green</div>,
    },
};

export const DarkGreenHeader: Story = {
    args: {
        isDarkGreen: true,
        children: <div>dark green</div>,
    },
};
