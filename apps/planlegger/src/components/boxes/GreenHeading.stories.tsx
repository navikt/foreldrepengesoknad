import { Meta, StoryObj } from '@storybook/react';

import GreenHeading from './GreenHeading';

const meta: Meta<typeof GreenHeading> = {
    title: 'components/GreenHeading',
    component: GreenHeading,
};
export default meta;

type Story = StoryObj<typeof GreenHeading>;

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
