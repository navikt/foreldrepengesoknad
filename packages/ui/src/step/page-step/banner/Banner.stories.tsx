import { Meta, StoryObj } from '@storybook/react';

import { Banner } from './Banner';

const meta = {
    title: 'step/Banner',
    component: Banner,
} satisfies Meta<typeof Banner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Dette er innhold for et banner',
    },
};
