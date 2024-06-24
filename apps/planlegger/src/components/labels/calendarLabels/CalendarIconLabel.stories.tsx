import { Meta, StoryObj } from '@storybook/react';

import CalendarIconLabel from './CalendarIconLabel';

const meta = {
    title: 'components/CalendarIconLabel',
    component: CalendarIconLabel,
} satisfies Meta<typeof CalendarIconLabel>;
export default meta;

type Story = StoryObj<typeof CalendarIconLabel>;

export const GreenLabel: Story = {
    args: {
        iconType: 'green',
        children: <div>green</div>,
    },
};

export const BlueLabel: Story = {
    args: {
        iconType: 'blue',
        children: <div>blue</div>,
    },
};
export const PinkLabel: Story = {
    args: {
        iconType: 'pink',
        children: <div>pink</div>,
    },
};
