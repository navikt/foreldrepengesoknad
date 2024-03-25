import { Meta, StoryObj } from '@storybook/react';

import PlanleggerPage from './PlanleggerPage';

const meta = {
    title: 'components/PlanleggerPage',
    component: PlanleggerPage,
} satisfies Meta<typeof PlanleggerPage>;
export default meta;

type Story = StoryObj<typeof PlanleggerPage>;

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
