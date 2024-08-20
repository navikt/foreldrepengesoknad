import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { Situasjon } from '@navikt/fp-types';

import UtenlandsoppholdPanel from './UtenlandsoppholdPanel';

export default {
    title: 'UtenlandsoppholdPanel',
    component: UtenlandsoppholdPanel,
};

const Template: StoryFn<{
    søkersituasjon: Situasjon;
    saveOnNext: () => void;
    saveOnPrevious: () => void;
    cancelApplication: () => void;
    goToPreviousStep: () => void;
    onStepChange: () => void;
}> = ({ saveOnNext, saveOnPrevious, cancelApplication, goToPreviousStep, onStepChange }) => {
    return (
        <UtenlandsoppholdPanel
            saveOnNext={saveOnNext}
            saveOnPrevious={saveOnPrevious}
            onStepChange={onStepChange}
            cancelApplication={cancelApplication}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
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
            ]}
            stønadstype="Engangsstønad"
        />
    );
};

export const ForFødsel = Template.bind({});
ForFødsel.args = {
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    cancelApplication: action('button-click'),
    goToPreviousStep: action('button-click'),
    onStepChange: action('button-click'),
};

export const ForAdopsjon = Template.bind({});
ForAdopsjon.args = {
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    cancelApplication: action('button-click'),
    goToPreviousStep: action('button-click'),
    onStepChange: action('button-click'),
};
