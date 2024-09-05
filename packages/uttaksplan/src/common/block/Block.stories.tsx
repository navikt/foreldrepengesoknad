import { Meta, StoryObj } from '@storybook/react';

import Block from './Block';

const meta = {
    component: Block,
} satisfies Meta<typeof Block>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Innehold i en block',
    },
};
