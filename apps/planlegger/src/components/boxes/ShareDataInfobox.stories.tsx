import { Meta, StoryObj } from '@storybook/react';

import ShareDataInfobox from './ShareDataInfobox';

const meta = {
    title: 'components/ShareDataInfobox',
    component: ShareDataInfobox,
} satisfies Meta<typeof ShareDataInfobox>;
export default meta;

type Story = StoryObj<typeof ShareDataInfobox>;

export const Default: Story = {};
