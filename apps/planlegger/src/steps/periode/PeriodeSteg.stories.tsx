import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import PeriodeSteg from './PeriodeSteg';

export default {
    title: 'PeriodeSteg',
    component: PeriodeSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    gåTilNesteSide: (action: Action) => void;
}> = ({ hvemPlanlegger, omBarnet, gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.PERIODE]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                }}
                onDispatch={gåTilNesteSide}
            >
                <PeriodeSteg />
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
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
    },
};

export const Aleneforsørger = Template.bind({});
Aleneforsørger.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
    },
};
