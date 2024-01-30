import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, PlanleggerDataContext, ContextDataType } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import ArbeidssituasjonSteg from './ArbeidssituasjonSteg';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { initAmplitude } from '@navikt/fp-metrics';

export default {
    title: 'ArbeidssituasjonSteg',
    component: ArbeidssituasjonSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide: (action: Action) => void;
}> = ({ hvemPlanlegger, gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.ARBEIDSSITUASJON]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                }}
                onDispatch={gåTilNesteSide}
            >
                <ArbeidssituasjonSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const ArbeidssituasjonFarOgMor = Template.bind({});
ArbeidssituasjonFarOgMor.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
};

export const ArbeidssituasjonKunMor = Template.bind({});
ArbeidssituasjonKunMor.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
};

export const ArbeidssituasjonKunFar = Template.bind({});
ArbeidssituasjonKunFar.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        type: SøkersituasjonEnum.FAR,
    },
};

export const ArbeidssituasjonMorOgMedmor = Template.bind({});
ArbeidssituasjonMorOgMedmor.args = {
    hvemPlanlegger: {
        navnPåMor: 'Esther Utvikler',
        navnPåMedmor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_MEDMOR,
    },
};

export const ArbeidssituasjonFarOgFar = Template.bind({});
ArbeidssituasjonFarOgFar.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMedfar: 'Klaus Utvikler',
        type: SøkersituasjonEnum.FAR_OG_FAR,
    },
};
