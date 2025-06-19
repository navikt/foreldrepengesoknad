import { Meta, StoryObj } from '@storybook/react-vite';

import { Step } from './Step';

const meta = {
    title: 'step/Step',
    component: Step,
} satisfies Meta<typeof Step>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        steps: [
            { id: 'test', label: 'Om Barnet', isSelected: false },
            { id: 'test2', label: 'Annet', isSelected: true },
            { id: 'test3', label: 'Oppsummering', isSelected: false },
        ],
        children: <>Her er det noe kult innhold</>,
    },
};
