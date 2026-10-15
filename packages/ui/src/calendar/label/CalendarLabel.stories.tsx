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
        children: 'green',
    },
};

export const BlueLabel: Story = {
    args: {
        color: 'BLUE',
        children: 'blue',
    },
};

export const BlueOutlineLabel: Story = {
    args: {
        color: 'BLUEOUTLINE',
        children: 'blue outline',
    },
};

export const BlueStripedLabel: Story = {
    args: {
        color: 'BLUESTRIPED',
        children: 'blue striped',
    },
};

export const GreenOutlineLabel: Story = {
    args: {
        color: 'GREENOUTLINE',
        children: 'green outline',
    },
};

export const GreenStripedLabel: Story = {
    args: {
        color: 'GREENSTRIPED',
        children: 'green striped',
    },
};

export const LightBlueLabel: Story = {
    args: {
        color: 'LIGHTBLUE',
        children: 'light blue',
    },
};

export const LightGreenLabel: Story = {
    args: {
        color: 'LIGHTGREEN',
        children: 'light green',
    },
};

export const LightGreenBlueLabel: Story = {
    args: {
        color: 'LIGHTGREENBLUE',
        children: 'light green blue',
    },
};

export const LightBlueGreenLabel: Story = {
    args: {
        color: 'LIGHTBLUEGREEN',
        children: 'light blue green',
    },
};

export const BlackLabel: Story = {
    args: {
        color: 'BLACK',
        children: 'black',
    },
};
export const DarkBlueLabelVisesIkke: Story = {
    args: {
        color: 'DARKBLUE',
        children: 'mørkeblå',
    },
};
