import { Meta, StoryObj } from '@storybook/react-vite';

import InfoBlock from './InfoBlock';

const meta = {
    title: 'components/InfoBlock',
    component: InfoBlock,
} satisfies Meta<typeof InfoBlock>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Tekst i en infoboks',
    },
};
