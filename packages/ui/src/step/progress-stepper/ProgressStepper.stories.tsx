import { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressStepper } from './ProgressStepper';

const meta = {
    title: 'step/ProgressStepper',
    component: ProgressStepper,
} satisfies Meta<typeof ProgressStepper>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        steps: [
            { id: '0', label: 'Steg 1', isSelected: false },
            { id: '1', label: 'Steg 2', isSelected: false },
            { id: '2', label: 'Steg 3', isSelected: true },
            { id: '3', label: 'Steg 4', isSelected: false },
            { id: '4', label: 'Steg 5', isSelected: false },
        ],
        onStepChange: undefined,
    },
};

export const WithInteractiveSteps: Story = {
    args: {
        ...Default.args,
        onStepChange: () => undefined,
    },
};
