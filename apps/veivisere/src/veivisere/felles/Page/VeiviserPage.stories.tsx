import { Meta, StoryObj } from '@storybook/react';

import VeiviserPage from './VeiviserPage';

const meta = {
    title: 'VeiviserPage',
    component: VeiviserPage,
} satisfies Meta<typeof VeiviserPage>;
export default meta;

type Story = StoryObj<typeof VeiviserPage>;

export const Default: Story = {
    args: {
        children: <div>Steginnhold</div>,
        label: 'Hvor mye kan jeg få i foreldrepenger?',
    },
};
