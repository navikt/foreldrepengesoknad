import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { Dekningsgrad } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';

import OversiktSteg from './OversiktSteg';

export default {
    title: 'OversiktSteg',
    component: OversiktSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    hvorLangPeriode: HvorLangPeriode;
    fordeling: Fordeling;
    omBarnet: OmBarnet;
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click'), hvemPlanlegger, fordeling, hvorLangPeriode, omBarnet }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OVERSIKT]}>
            <PlanleggerDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.FORDELING]: fordeling,
                    [ContextDataType.HVOR_LANG_PERIODE]: hvorLangPeriode,
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                }}
            >
                <OversiktSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const PeriodeFlereForsørgereHundreProsentTermin = Template.bind({});
PeriodeFlereForsørgereHundreProsentTermin.args = {
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

export const PeriodeAleneforsørgerÅttiProsentFødt = Template.bind({});
PeriodeAleneforsørgerÅttiProsentFødt.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    fordeling: {
        fellesperiodefordeling: 7,
    },
    hvorLangPeriode: {
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
    omBarnet: {
        erBarnetFødt: true,
        erFødsel: true,
        fødselsdato: '2024-09-01',
        termindato: '2024-09-01',
        hvorMange: 'ett',
    },
};

export const PeriodeFlereForsørgereÅttiProsentToBarnFødt = Template.bind({});
PeriodeFlereForsørgereÅttiProsentToBarnFødt.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        navnPåMedmor: 'Kari Utvikler',
        type: SøkersituasjonEnum.MOR_OG_MEDMOR,
    },
    fordeling: {
        fellesperiodefordeling: 9,
    },
    hvorLangPeriode: {
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    },
    omBarnet: {
        erBarnetFødt: true,
        erFødsel: true,
        fødselsdato: '2024-10-01',
        termindato: '2024-10-03',
        hvorMange: 'to',
    },
};

export const PeriodeFlereForsørgereÅttiProsentAdoptert = Template.bind({});
PeriodeFlereForsørgereÅttiProsentAdoptert.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        navnPåFar: 'Espen Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    fordeling: {
        fellesperiodefordeling: 9,
    },
    hvorLangPeriode: {
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    },
    omBarnet: {
        erBarnetFødt: true,
        erFødsel: false,
        erAdoptert: true,
        fødselsdato: '2024-09-01',
        termindato: '2024-09-01',
        overtakelsesdato: '2024-09-01',
        adopsjonsdato: '2024-09-01',
        hvorMange: 'ett',
    },
};
