import { Meta, StoryObj } from '@storybook/react';

import { NoeGikkGalt } from './NoeGikkGalt';

const meta = {
    title: 'NoeGikkGalt',
    component: NoeGikkGalt,
} satisfies Meta<typeof NoeGikkGalt>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <div>Noe gikk galt</div>,
    },
};
