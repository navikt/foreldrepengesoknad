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
}> = ({ saveOnNext, saveOnPrevious, cancelApplication, goToPreviousStep }) => {
    return (
        <UtenlandsoppholdPanel
            saveOnNext={saveOnNext}
            saveOnPrevious={saveOnPrevious}
            cancelApplication={cancelApplication}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
                {
                    id: '1',
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
};

export const ForAdopsjon = Template.bind({});
ForAdopsjon.args = {
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    cancelApplication: action('button-click'),
    goToPreviousStep: action('button-click'),
};
