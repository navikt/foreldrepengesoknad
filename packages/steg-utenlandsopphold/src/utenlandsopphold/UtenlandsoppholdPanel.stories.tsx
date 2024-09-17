import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import UtenlandsoppholdPanel from './UtenlandsoppholdPanel';

const meta = {
    component: UtenlandsoppholdPanel,
} satisfies Meta<typeof UtenlandsoppholdPanel>;
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
                id: 'BO_I_UTLANDET_PATH',
                label: 'Bo i utlandet',
                isSelected: true,
            },
        ],
        stønadstype: 'Engangsstønad',
    },
};
