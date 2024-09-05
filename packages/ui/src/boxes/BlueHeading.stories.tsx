import { Meta, StoryObj } from '@storybook/react';

import BlueHeading from './BlueHeading';

const meta = {
    title: 'components/BlueHeading',
    component: BlueHeading,
} satisfies Meta<typeof BlueHeading>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <div>blue</div>,
    },
};

export const DarkGreenHeader: Story = {
    args: {
        children: <div>dark blue</div>,
    },
};
