import { Meta, StoryObj } from '@storybook/react';
import { ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { Situasjon } from 'types/Søkersituasjon';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';

import { initAmplitude } from '@navikt/fp-metrics';

import OppsummeringSteg from './OppsummeringSteg';

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

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    fordeling: Fordeling;
    hvorLangPeriode: HvorLangPeriode;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
} & ComponentProps<typeof OppsummeringSteg>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({
    hvemPlanlegger,
    fordeling,
    hvorLangPeriode,
    omBarnet,
    arbeidssituasjon,
    stønadskontoer = kontoer,
}: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OPPSUMMERING]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.FORDELING]: fordeling,
                    [ContextDataType.HVOR_LANG_PERIODE]: hvorLangPeriode,
                    [ContextDataType.OM_BARNET]: omBarnet,
                    [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                }}
            >
                <OppsummeringSteg stønadskontoer={stønadskontoer} />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'OppsummeringSteg',
    component: OppsummeringSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const OppsummeringFlereForsørgereHundreProsentTermin: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        fordeling: {
            antallUkerSøker1: 5,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2022-10-24',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
    },
};

export const OppsummeringAleneforsørgerÅttiProsentFødselToBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
        fordeling: {
            antallUkerSøker1: 5,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: true,
            termindato: '2022-07-10',
            antallBarn: '2',
            fødselsdato: '2022-08-10',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
    },
};

export const OppsummeringFlereForsørgereHundreProsentAdopsjon: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåMedmor: 'Esther Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
        fordeling: {
            antallUkerSøker1: 5,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: false,
            erBarnetFødt: true,
            fødselsdato: '2022-07-10',
            antallBarn: '1',
            overtakelsesdato: '2022-010-10',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
    },
};

export const HarIkkeRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: false,
            erBarnetFødt: true,
            fødselsdato: '2022-07-10',
            antallBarn: '1',
            overtakelsesdato: '2022-010-10',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: false,
        },
    },
};
