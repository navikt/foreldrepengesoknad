import { Meta, StoryObj } from '@storybook/react';

import ErrorPage from './ErrorPage';

const meta = {
    title: 'components/ErrorPage',
    component: ErrorPage,
} satisfies Meta<typeof ErrorPage>;
export default meta;

type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {};
