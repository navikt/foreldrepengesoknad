import { Meta, StoryObj } from '@storybook/react';

import SimpleErrorPage from './SimpleErrorPage';

const meta = {
    title: 'SimpleErrorPage',
    component: SimpleErrorPage,
} satisfies Meta<typeof SimpleErrorPage>;
export default meta;

type Story = StoryObj<typeof SimpleErrorPage>;

export const Default: Story = {};
