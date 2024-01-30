import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import PeriodeSteg from './PeriodeSteg';

export default {
    title: 'PeriodeSteg',
    component: PeriodeSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide: (action: Action) => void;
}> = ({ hvemPlanlegger, gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.PERIODE]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                }}
                onDispatch={gåTilNesteSide}
            >
                <PeriodeSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const PeriodeStegFlere = Template.bind({});
PeriodeStegFlere.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
};

export const PeriodeStegAlene = Template.bind({});
PeriodeStegAlene.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
};
