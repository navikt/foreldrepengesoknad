import { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { UtenlandsoppholdPanel } from './UtenlandsoppholdPanel';

const meta = {
    component: UtenlandsoppholdPanel,
    args: {
        saveOnNext: action('saveOnNext'),
        saveOnPrevious: action('saveOnPrevious'),
        cancelApplication: action('cancelApplication'),
        goToPreviousStep: action('goToPreviousStep'),
        onStepChange: action('onStepChange'),
    },
    argTypes: {
        stønadstype: {
            options: ['Foreldrepenger', 'Engangsstønad', 'Svangerskapspenger'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof UtenlandsoppholdPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
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
