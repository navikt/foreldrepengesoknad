import { Meta, StoryObj } from '@storybook/react';

import { PeriodeColor } from '@navikt/fp-constants';

import CalendarLabel from './CalendarLabel';

const meta = {
    title: 'CalendarLabel',
    component: CalendarLabel,
} satisfies Meta<typeof CalendarLabel>;
export default meta;

type Story = StoryObj<typeof CalendarLabel>;

export const GreenLabel: Story = {
    args: {
        iconType: PeriodeColor.GREEN,
        children: <div>green</div>,
    },
};

export const BlueLabel: Story = {
    args: {
        iconType: PeriodeColor.BLUE,
        children: <div>blue</div>,
    },
};
export const PinkLabel: Story = {
    args: {
        iconType: PeriodeColor.PINK,
        children: <div>pink</div>,
    },
};

export const BlueOutlineLabel: Story = {
    args: {
        iconType: PeriodeColor.BLUEOUTLINE,
        children: <div>blue outline</div>,
    },
};

export const BlueStripedLabel: Story = {
    args: {
        iconType: PeriodeColor.BLUESTRIPED,
        children: <div>blue striped</div>,
    },
};

export const GreenOutlineLabel: Story = {
    args: {
        iconType: PeriodeColor.GREENOUTLINE,
        children: <div>green outline</div>,
    },
};

export const GreenStripedLabel: Story = {
    args: {
        iconType: PeriodeColor.GREENSTRIPED,
        children: <div>green striped</div>,
    },
};

export const LightBlueLabel: Story = {
    args: {
        iconType: PeriodeColor.LIGHTBLUE,
        children: <div>light blue</div>,
    },
};

export const LightGreenLabel: Story = {
    args: {
        iconType: PeriodeColor.LIGHTGREEN,
        children: <div>light green</div>,
    },
};

export const LightGreenBlueLabel: Story = {
    args: {
        iconType: PeriodeColor.LIGHTGREENBLUE,
        children: <div>light green blue</div>,
    },
};

export const LightBlueGreenLabel: Story = {
    args: {
        iconType: PeriodeColor.LIGHTBLUEGREEN,
        children: <div>light blue green</div>,
    },
};

export const BlackLabel: Story = {
    args: {
        iconType: PeriodeColor.BLACK,
        children: <div>black</div>,
    },
};
