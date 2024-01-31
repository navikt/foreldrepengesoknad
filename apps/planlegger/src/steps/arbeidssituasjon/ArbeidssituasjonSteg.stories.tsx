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

export const ArbeidssituasjonMorOgFar = Template.bind({});
ArbeidssituasjonMorOgFar.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
};

export const ArbeidssituasjonAleneforsørger = Template.bind({});
ArbeidssituasjonAleneforsørger.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
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
