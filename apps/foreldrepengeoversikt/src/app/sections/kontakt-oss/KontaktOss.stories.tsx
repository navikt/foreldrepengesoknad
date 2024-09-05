import { Meta, StoryObj } from '@storybook/react/*';

import KontaktOss from './KontaktOss';

const meta = {
    title: 'KontaktOss',
    component: KontaktOss,
} satisfies Meta<typeof KontaktOss>;
export default meta;

type Story = StoryObj<typeof KontaktOss>;

export const Default: Story = {};
