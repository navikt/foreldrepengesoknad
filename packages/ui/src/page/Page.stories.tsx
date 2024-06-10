import { Meta, StoryObj } from '@storybook/react';

import Page from './Page';

const meta = {
    title: 'components/Page',
    component: Page,
} satisfies Meta<typeof Page>;
export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
    args: {
        header: <div>Dette er header</div>,
        children: <div>Dette er children</div>,
    },
};

export const HarAvrundedeNedreHjørner: Story = {
    args: {
        header: <div>Dette er header</div>,
        children: <div>Dette er children</div>,
        useLargerBorderRadius: true,
    },
};
