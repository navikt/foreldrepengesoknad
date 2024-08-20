import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import SenereUtenlandsoppholdPanel from './SenereUtenlandsoppholdPanel';

export default {
    title: 'SenereUtenlandsoppholdPanel',
    component: SenereUtenlandsoppholdPanel,
};

const Template: StoryFn<{
    saveOnNext: () => void;
    saveOnPrevious: () => void;
    cancelApplication: () => void;
    goToPreviousStep: () => void;
    onStepChange: () => void;
}> = ({ saveOnNext, saveOnPrevious, cancelApplication, goToPreviousStep, onStepChange }) => {
    return (
        <SenereUtenlandsoppholdPanel
            saveOnNext={saveOnNext}
            saveOnPrevious={saveOnPrevious}
            cancelApplication={cancelApplication}
            onStepChange={onStepChange}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
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
