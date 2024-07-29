import { Meta, StoryObj } from '@storybook/react';

import BlueHeading from './BlueHeading';

const meta = {
    title: 'components/BlueHeading',
    component: BlueHeading,
} satisfies Meta<typeof BlueHeading>;
export default meta;

type Story = StoryObj<typeof BlueHeading>;

export const Default: Story = {
    args: {
        isDarkBlue: false,
        children: <div>blue</div>,
    },
};

export const DarkGreenHeader: Story = {
    args: {
        isDarkBlue: true,
        children: <div>dark blue</div>,
    },
};
