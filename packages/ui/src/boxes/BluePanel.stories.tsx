import { Meta, StoryObj } from '@storybook/react';

import BluePanel from './BluePanel';

const meta = {
    title: 'components/BluePanel',
    component: BluePanel,
} satisfies Meta<typeof BluePanel>;
export default meta;

type Story = StoryObj<typeof BluePanel>;

export const Default: Story = {
    args: {
        isDarkBlue: false,
        children: <div>blue</div>,
    },
};

export const DarkBlueHeader: Story = {
    args: {
        isDarkBlue: true,
        children: <div>dark blue</div>,
    },
};
