import { Meta, StoryObj } from '@storybook/react-vite';

import { IkkeKvinne } from './IkkeKvinne';

const meta = {
    title: 'pages/IkkeKvinne',
    component: IkkeKvinne,
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
