import { Meta, StoryObj } from '@storybook/react';

import HarIkkeRettTilFpInfobox from './HarIkkeRettTilFpInfobox';

const meta = {
    title: 'components/HarIkkeRettTilFpInfobox',
    component: HarIkkeRettTilFpInfobox,
} satisfies Meta<typeof HarIkkeRettTilFpInfobox>;
export default meta;

type Story = StoryObj<typeof HarIkkeRettTilFpInfobox>;

export const Default: Story = {
    args: {
        minÅrslønn: 100000,
        antattÅrslønn: 500000,
    },
};

export const VisKrIkon: Story = {
    args: {
        minÅrslønn: 100000,
        antattÅrslønn: 500000,
        showKrIcon: true,
    },
};
