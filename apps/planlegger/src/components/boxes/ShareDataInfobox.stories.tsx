import { Meta, StoryObj } from '@storybook/react-vite';

import { ShareDataInfobox } from './ShareDataInfobox';

const meta = {
    title: 'components/ShareDataInfobox',
    component: ShareDataInfobox,
} satisfies Meta<typeof ShareDataInfobox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        erAlenesøker: true,
    },
};
