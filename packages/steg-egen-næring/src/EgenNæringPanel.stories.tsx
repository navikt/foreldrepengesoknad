import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { EgenNæringPanel } from './EgenNæringPanel';

const meta = {
    component: EgenNæringPanel,
} satisfies Meta<typeof EgenNæringPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        saveOnNext: action('button-click'),
        saveOnPrevious: action('button-click'),
        cancelApplication: action('button-click'),
        goToPreviousStep: action('button-click'),
        onStepChange: action('button-click'),
        stepConfig: [
            {
                id: 'BARNET_PATH',
                label: 'Barnet',
                isSelected: false,
            },
            {
                id: 'EGEN_NÆRING',
                label: 'Arbeid som selvstendig næringsdrivende',
                isSelected: true,
            },
        ],
        appOrigin: 'svangerskapspengesoknad',
    },
};
