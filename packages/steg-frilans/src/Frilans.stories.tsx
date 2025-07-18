import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { FrilansPanel } from './FrilansPanel';

const meta = {
    component: FrilansPanel,
} satisfies Meta<typeof FrilansPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        saveOnNext: action('button-click'),
        saveOnPrevious: action('button-click'),
        onAvsluttOgSlett: action('button-click'),
        goToPreviousStep: action('button-click'),
        onStepChange: action('button-click'),
        stepConfig: [
            {
                id: 'BARNET_PATH',
                label: 'Barnet',
                isSelected: false,
            },
            {
                id: 'FRILANS',
                label: 'Arbeid som frilanser',
                isSelected: true,
            },
        ],
    },
};
