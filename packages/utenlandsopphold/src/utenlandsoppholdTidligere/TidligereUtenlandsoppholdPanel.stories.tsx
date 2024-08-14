import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import TidligereUtenlandsoppholdPanel from './TidligereUtenlandsoppholdPanel';

export default {
    title: 'TidligereUtenlandsoppholdPanel',
    component: TidligereUtenlandsoppholdPanel,
};

const Template: StoryFn<{
    saveOnNext: () => void;
    saveOnPrevious: () => void;
    cancelApplication: () => void;
    goToPreviousStep: () => void;
    onStepChange: () => void;
}> = ({ saveOnNext, saveOnPrevious, cancelApplication, goToPreviousStep, onStepChange }) => {
    return (
        <TidligereUtenlandsoppholdPanel
            saveOnNext={saveOnNext}
            saveOnPrevious={saveOnPrevious}
            cancelApplication={cancelApplication}
            goToPreviousStep={goToPreviousStep}
            onStepChange={onStepChange}
            stepConfig={[
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
            ]}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    cancelApplication: action('button-click'),
    goToPreviousStep: action('button-click'),
    onStepChange: action('button-click'),
};
