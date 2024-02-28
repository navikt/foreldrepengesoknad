import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import OmBarnetSteg from './OmBarnetSteg';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

export default {
    title: 'OmBarnetSteg',
    component: OmBarnetSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide: (action: Action) => void;
}> = ({ hvemPlanlegger, gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OM_BARNET]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                }}
                onDispatch={gåTilNesteSide}
            >
                <OmBarnetSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const FlereForsørgere = Template.bind({});
FlereForsørgere.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
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