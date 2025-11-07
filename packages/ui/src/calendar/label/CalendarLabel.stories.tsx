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
        color: PeriodeColor.GREEN,
        children: <div>green</div>,
    },
};

export const BlueLabel: Story = {
    args: {
        color: PeriodeColor.BLUE,
        children: <div>blue</div>,
    },
};
export const PinkLabel: Story = {
    args: {
        color: PeriodeColor.PINK,
        children: <div>pink</div>,
    },
};

export const BlueOutlineLabel: Story = {
    args: {
        color: PeriodeColor.BLUEOUTLINE,
        children: <div>blue outline</div>,
    },
};

export const BlueStripedLabel: Story = {
    args: {
        color: PeriodeColor.BLUESTRIPED,
        children: <div>blue striped</div>,
    },
};

export const GreenOutlineLabel: Story = {
    args: {
        color: PeriodeColor.GREENOUTLINE,
        children: <div>green outline</div>,
    },
};

export const GreenStripedLabel: Story = {
    args: {
        color: PeriodeColor.GREENSTRIPED,
        children: <div>green striped</div>,
    },
};

export const LightBlueLabel: Story = {
    args: {
        color: PeriodeColor.LIGHTBLUE,
        children: <div>light blue</div>,
    },
};

export const LightGreenLabel: Story = {
    args: {
        color: PeriodeColor.LIGHTGREEN,
        children: <div>light green</div>,
    },
};

export const LightGreenBlueLabel: Story = {
    args: {
        color: PeriodeColor.LIGHTGREENBLUE,
        children: <div>light green blue</div>,
    },
};

export const LightBlueGreenLabel: Story = {
    args: {
        color: PeriodeColor.LIGHTBLUEGREEN,
        children: <div>light blue green</div>,
    },
};

export const BlackLabel: Story = {
    args: {
        color: PeriodeColor.BLACK,
        children: <div>black</div>,
    },
};
