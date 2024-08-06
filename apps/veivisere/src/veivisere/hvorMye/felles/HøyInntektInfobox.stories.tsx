import { Meta, StoryObj } from '@storybook/react';

import HøyInntektInfobox from './HøyInntektInfobox';

const meta = {
    title: 'components/HøyInntektInfobox',
    component: HøyInntektInfobox,
} satisfies Meta<typeof HøyInntektInfobox>;
export default meta;

type Story = StoryObj<typeof HøyInntektInfobox>;

export const Default: Story = {
    args: {
        maxÅrslønnDekket: 700000,
    },
};

export const HarGråBakgrunn: Story = {
    args: {
        maxÅrslønnDekket: 700000,
        isGray: true,
    },
};

export const VisKrIkon: Story = {
    args: {
        maxÅrslønnDekket: 700000,
        showKrIcon: true,
    },
};
