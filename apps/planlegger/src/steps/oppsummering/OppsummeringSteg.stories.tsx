import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
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
    arbeidssituasjon: Arbeidssituasjon;
}> = ({
    gåTilNesteSide = action('button-click'),
    hvemPlanlegger,
    fordeling,
    hvorLangPeriode,
    omBarnet,
    arbeidssituasjon,
}) => {
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
                    [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
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
        fordeling: { antallUkerSøker1: 8, antallUkerSøker2: 8, id: 9 },
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
    arbeidssituasjon: {
        arbeidssituasjon: ArbeidssituasjonEnum.INGEN,
        arbeidssituasjonAnnenPart: true,
    },
};
export const OppsummeringAleneforsørgerÅttiProsentFødselToBarn = Template.bind({});
OppsummeringAleneforsørgerÅttiProsentFødselToBarn.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    fordeling: {
        fellesperiodefordeling: 6,
        fordeling: { antallUkerSøker1: 33, id: 0 },
    },
    hvorLangPeriode: {
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    },
    omBarnet: {
        erFødsel: true,
        erBarnetFødt: true,
        termindato: '2022-07-10',
        hvorMange: 'to',
        fødselsdato: '2022-08-10',
    },
    arbeidssituasjon: {
        arbeidssituasjon: ArbeidssituasjonEnum.INGEN,
    },
};
export const OppsummeringFlereForsørgereHundreProsentAdopsjon = Template.bind({});
OppsummeringFlereForsørgereHundreProsentAdopsjon.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        navnPåMedmor: 'Esther Utvikler',
        type: SøkersituasjonEnum.MOR_OG_MEDMOR,
    },
    fordeling: {
        fellesperiodefordeling: 6,
        fordeling: { antallUkerSøker1: 18, antallUkerSøker2: 0, id: 19 },
    },
    hvorLangPeriode: {
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
    omBarnet: {
        erFødsel: false,
        erBarnetFødt: true,
        erAdoptert: true,
        fødselsdato: '2022-07-10',
        hvorMange: 'ett',
        overtakelsesdato: '2022-010-10',
    },
    arbeidssituasjon: {
        arbeidssituasjon: ArbeidssituasjonEnum.JOBBER,
        arbeidssituasjonAnnenPart: true,
    },
};
