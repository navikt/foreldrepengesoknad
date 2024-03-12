import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import HvorLangPeriodeSteg from './HvorLangPeriodeSteg';

const kontoer = {
    '100': {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 80,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 90,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    },
};

export default {
    title: 'HvorLangPeriodeSteg',
    component: HvorLangPeriodeSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    gåTilNesteSide: (action: Action) => void;
}> = ({ hvemPlanlegger, omBarnet, arbeidssituasjon, gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.HVOR_LANG_PERIODE]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                    [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                }}
                onDispatch={gåTilNesteSide}
            >
                <HvorLangPeriodeSteg stønadskontoer={kontoer} />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const FlereForsørgereEttBarnKunMorHarRett = Template.bind({});
FlereForsørgereEttBarnKunMorHarRett.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
        antallBarn: '1',
    },
    arbeidssituasjon: {
        arbeidssituasjon: ArbeidssituasjonEnum.JOBBER,
        arbeidssituasjonAnnenPart: false,
    },
};

export const FlereForsørgereToBarn = Template.bind({});
FlereForsørgereToBarn.args = {
    hvemPlanlegger: {
        navnPåMedmor: 'Esther Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_MEDMOR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
        antallBarn: '2',
    },
    arbeidssituasjon: {
        arbeidssituasjon: ArbeidssituasjonEnum.JOBBER,
        arbeidssituasjonAnnenPart: true,
    },
};

export const AleneforsørgerMorEttBarn = Template.bind({});
AleneforsørgerMorEttBarn.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
        antallBarn: '1',
    },
    arbeidssituasjon: {
        arbeidssituasjon: ArbeidssituasjonEnum.JOBBER,
    },
};
export const FlereForsørgereKunFarHarRett = Template.bind({});
FlereForsørgereKunFarHarRett.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
        antallBarn: '1',
    },
    arbeidssituasjon: {
        arbeidssituasjon: ArbeidssituasjonEnum.INGEN,
        arbeidssituasjonAnnenPart: true,
    },
};
export const AleneforsørgerFarToBarn = Template.bind({});
AleneforsørgerFarToBarn.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        type: SøkersituasjonEnum.FAR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
        antallBarn: '2',
    },
    arbeidssituasjon: {
        arbeidssituasjon: ArbeidssituasjonEnum.JOBBER,
    },
};
