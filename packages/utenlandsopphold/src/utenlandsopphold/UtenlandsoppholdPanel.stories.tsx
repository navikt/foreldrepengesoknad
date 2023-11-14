import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UtenlandsoppholdPanel from './UtenlandsoppholdPanel';
import { SøkersituasjonEnum } from '@navikt/fp-types';

export default {
    title: 'UtenlandsoppholdPanel',
    component: UtenlandsoppholdPanel,
};

const Template: StoryFn<{
    søkersituasjon: SøkersituasjonEnum;
    saveOnNext: () => void;
    saveOnPrevious: () => void;
    cancelApplication: () => void;
    goToPreviousStep: () => void;
}> = ({ søkersituasjon, saveOnNext, saveOnPrevious, cancelApplication, goToPreviousStep }) => {
    return (
        <UtenlandsoppholdPanel
            saveOnNext={saveOnNext}
            saveOnPrevious={saveOnPrevious}
            cancelApplication={cancelApplication}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
                {
                    id: '1',
                    index: 1,
                    label: 'Bo i utlandet',
                    isSelected: true,
                },
            ]}
            søkersituasjon={søkersituasjon}
            stønadstype="Engangsstønad"
        />
    );
};

export const ForFødsel = Template.bind({});
ForFødsel.args = {
    søkersituasjon: SøkersituasjonEnum.FØDSEL,
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    cancelApplication: action('button-click'),
    goToPreviousStep: action('button-click'),
};

export const ForAdopsjon = Template.bind({});
ForAdopsjon.args = {
    søkersituasjon: SøkersituasjonEnum.ADOPSJON,
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    cancelApplication: action('button-click'),
    goToPreviousStep: action('button-click'),
};
