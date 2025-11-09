import { Meta, StoryObj } from '@storybook/react-vite';

import { CalendarLabel } from './CalendarLabel';

const meta = {
    title: 'CalendarLabel',
    component: CalendarLabel,
} satisfies Meta<typeof CalendarLabel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const GreenLabel: Story = {
    args: {
        color: 'GREEN',
        children: <div>green</div>,
    },
};

export const BlueLabel: Story = {
    args: {
        color: 'BLUE',
        children: <div>blue</div>,
    },
};
export const PinkLabel: Story = {
    args: {
        color: 'PINK',
        children: <div>pink</div>,
    },
};

export const BlueOutlineLabel: Story = {
    args: {
        color: 'BLUEOUTLINE',
        children: <div>blue outline</div>,
    },
};

export const BlueStripedLabel: Story = {
    args: {
        color: 'BLUESTRIPED',
        children: <div>blue striped</div>,
    },
};

export const GreenOutlineLabel: Story = {
    args: {
        color: 'GREENOUTLINE',
        children: <div>green outline</div>,
    },
};

export const GreenStripedLabel: Story = {
    args: {
        color: 'GREENSTRIPED',
        children: <div>green striped</div>,
    },
};

export const LightBlueLabel: Story = {
    args: {
        color: 'LIGHTBLUE',
        children: <div>light blue</div>,
    },
};

export const LightGreenLabel: Story = {
    args: {
        color: 'LIGHTGREEN',
        children: <div>light green</div>,
    },
};

export const LightGreenBlueLabel: Story = {
    args: {
        color: 'LIGHTGREENBLUE',
        children: <div>light green blue</div>,
    },
};

export const LightBlueGreenLabel: Story = {
    args: {
        color: 'LIGHTBLUEGREEN',
        children: <div>light blue green</div>,
    },
};

export const BlackLabel: Story = {
    args: {
        color: 'BLACK',
        children: <div>black</div>,
    },
};
