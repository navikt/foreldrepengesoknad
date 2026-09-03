import { Meta, StoryObj } from '@storybook/react-vite';

import { HarIkkeRettTilFpInfobox } from './HarIkkeRettTilFpInfobox';

const meta = {
    title: 'components/HarIkkeRettTilFpInfobox',
    component: HarIkkeRettTilFpInfobox,
} satisfies Meta<typeof HarIkkeRettTilFpInfobox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        minÅrslønn: 100_000,
        antattÅrslønn: 500_000,
    },
};

export const VisKrIkon: Story = {
    args: {
        minÅrslønn: 100_000,
        antattÅrslønn: 500_000,
        showKrIcon: true,
    },
};
