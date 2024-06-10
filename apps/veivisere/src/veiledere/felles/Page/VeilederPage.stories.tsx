import { Meta, StoryObj } from '@storybook/react';

import VeilederPage from './VeilederPage';

const meta = {
    title: 'VeilederPage',
    component: VeilederPage,
} satisfies Meta<typeof VeilederPage>;
export default meta;

type Story = StoryObj<typeof VeilederPage>;

export const Default: Story = {
    args: {
        children: <div>Steginnhold</div>,
        label: 'Hvor mye kan jeg få i foreldrepenger?',
    },
};
