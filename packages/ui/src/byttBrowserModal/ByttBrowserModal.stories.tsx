import { Meta, StoryObj } from '@storybook/react';

import ByttBrowserModal from './ByttBrowserModal';

const meta = {
    title: 'pages/ByttBrowserModal',
    component: ByttBrowserModal,
} satisfies Meta<typeof ByttBrowserModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
