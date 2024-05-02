import { Meta, StoryObj } from '@storybook/react';

import CalendarLabel from './CalendarLabel';

const meta = {
    title: 'CalendarLabel',
    component: CalendarLabel,
} satisfies Meta<typeof CalendarLabel>;
export default meta;

type Story = StoryObj<typeof CalendarLabel>;

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
