import { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { SenereUtenlandsoppholdPanel } from './SenereUtenlandsoppholdPanel';

const meta = {
    component: SenereUtenlandsoppholdPanel,
} satisfies Meta<typeof SenereUtenlandsoppholdPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        saveOnNext: action('button-click'),
        cancelApplication: action('button-click'),
        goToPreviousStep: action('button-click'),
        onStepChange: action('button-click'),
        saveOnPrevious: action('button-click'),
        senereUtenlandsopphold: [],
        stepConfig: [
            {
                id: 'UTENLANDSOPPHOLD_PATH',
                label: 'Utenlandsopphold',
                isSelected: false,
            },
            {
                id: 'SKAL_BO_I_UTLANDET_PATH',
                label: 'Skal bo i utlandet',
                isSelected: true,
            },
        ],
    },
};
