import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, PlanleggerDataContext, ContextDataType } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { initAmplitude } from '@navikt/fp-metrics';
import BarnehageplassSteg from './BarnehageplassSteg';

export default {
    title: 'BarnehageplassSteg',
    component: BarnehageplassSteg,
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
                <BarnehageplassSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const BarnehageplassFlere = Template.bind({});
BarnehageplassFlere.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
        hvem: SøkersituasjonEnum.FLERE,
    },
};

export const BarnehageplassAlene = Template.bind({});
BarnehageplassAlene.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
        hvem: SøkersituasjonEnum.ALENE,
    },
};
