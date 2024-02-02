import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import PlanInfoSteg from './PlanInfoSteg';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

export default {
    title: 'PlanInfoSteg',
    component: PlanInfoSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click'), hvemPlanlegger }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.PLAN_INFO]}>
            <PlanleggerDataContext
                onDispatch={gåTilNesteSide}
                initialState={{ [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger }}
            >
                <PlanInfoSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const FlereForsørgere = Template.bind({});
FlereForsørgere.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        navnPåFar: 'Espen Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
};
export const Aleneforsørger = Template.bind({});
Aleneforsørger.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
};
