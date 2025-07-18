import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { TidligereUtenlandsoppholdPanel } from './TidligereUtenlandsoppholdPanel';

const meta = {
    component: TidligereUtenlandsoppholdPanel,
} satisfies Meta<typeof TidligereUtenlandsoppholdPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        saveOnNext: action('button-click'),
        onAvsluttOgSlett: action('button-click'),
        goToPreviousStep: action('button-click'),
        onStepChange: action('button-click'),
        saveOnPrevious: action('button-click'),
        tidligereUtenlandsopphold: [],
        stepConfig: [
            {
                id: 'UTENLANDSOPPHOLD_PATH',
                label: 'Utenlandsopphold',
                isSelected: false,
            },
            {
                id: 'HAR_BODD_I_UTLANDET_PATH',
                label: 'Har bodd i utlandet',
                isSelected: true,
            },
        ],
    },
};
