import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Periode } from 'types/Periode';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { Dekningsgrad } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';

import OppsummeringSteg from './OppsummeringSteg';

export default {
    title: 'OppsummeringSteg',
    component: OppsummeringSteg,
};

const Template: StoryFn<{
    gåTilNesteSide: (action: Action) => void;
    hvemPlanlegger: HvemPlanlegger;
    periode: Periode;
    omBarnet: OmBarnet;
}> = ({ gåTilNesteSide = action('button-click'), hvemPlanlegger, periode, omBarnet }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OPPSUMMERING]}>
            <PlanleggerDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.PERIODE]: periode,
                    [ContextDataType.OM_BARNET]: omBarnet,
                }}
            >
                <OppsummeringSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const OppsummeringFlereForsørgereHundreProsentTermin = Template.bind({});
OppsummeringFlereForsørgereHundreProsentTermin.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    periode: {
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        fellesperiodefordeling: 6,
    },
    omBarnet: {
        erFødsel: true,
        erBarnetFødt: false,
        termindato: '2022-10-24',
        hvorMange: 'ett',
    },
};
export const OppsummeringAleneforsørgerÅttiProsentTermin = Template.bind({});
OppsummeringAleneforsørgerÅttiProsentTermin.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    periode: {
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        fellesperiodefordeling: 6,
    },
    omBarnet: {
        erFødsel: true,
        erBarnetFødt: false,
        termindato: '2022-10-24',
        hvorMange: 'ett',
    },
};
