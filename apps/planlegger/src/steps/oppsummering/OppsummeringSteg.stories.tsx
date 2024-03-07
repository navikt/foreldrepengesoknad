import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import OppsummeringSteg from './OppsummeringSteg';

export default {
    title: 'OppsummeringSteg',
    component: OppsummeringSteg,
};

const Template: StoryFn<{
    gåTilNesteSide: (action: Action) => void;
    hvemPlanlegger: HvemPlanlegger;
    fordeling: Fordeling;
    hvorLangPeriode: HvorLangPeriode;
    omBarnet: OmBarnet;
}> = ({ gåTilNesteSide = action('button-click'), hvemPlanlegger, fordeling, hvorLangPeriode, omBarnet }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OPPSUMMERING]}>
            <PlanleggerDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.FORDELING]: fordeling,
                    [ContextDataType.HVOR_LANG_PERIODE]: hvorLangPeriode,
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
    fordeling: {
        fellesperiodefordeling: 6,
    },
    hvorLangPeriode: {
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
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
    fordeling: {
        fellesperiodefordeling: 6,
    },
    hvorLangPeriode: {
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    },
    omBarnet: {
        erFødsel: true,
        erBarnetFødt: false,
        termindato: '2022-10-24',
        hvorMange: 'ett',
    },
};
