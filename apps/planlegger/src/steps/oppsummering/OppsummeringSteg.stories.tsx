import { Meta, StoryObj } from '@storybook/react';
import { ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';

import { initAmplitude } from '@navikt/fp-metrics';
import { StønadskontoType, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import OppsummeringSteg from './OppsummeringSteg';

const kontoer = {
    '100': {
        kontoer: [
            { konto: StønadskontoType.Mødrekvote, dager: 75 },
            { konto: StønadskontoType.Fedrekvote, dager: 75 },
            { konto: StønadskontoType.Fellesperiode, dager: 80 },
            { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: [
            { konto: StønadskontoType.Mødrekvote, dager: 95 },
            { konto: StønadskontoType.Fedrekvote, dager: 95 },
            { konto: StønadskontoType.Fellesperiode, dager: 90 },
            { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
        ],
        minsteretter: {
            farRundtFødsel: 0,
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
    stønadskontoer?: TilgjengeligeStønadskontoer;
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
    title: 'steg/OppsummeringSteg',
    component: OppsummeringSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const FlereForsørgereHundreProsentTermin: Story = {
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

export const MorOgFarKunFarHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
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
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 155 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 95 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 125 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 75 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
        },
    },
};

export const FarOgFarFødsel: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: Situasjon.FAR_OG_FAR,
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

export const FarOgFarAdopsjonKunFar1HarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.FAR_OG_FAR,
        },
        fordeling: {
            antallUkerSøker1: 5,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: false,
            termindato: '2022-01-24',
            antallBarn: '1',
            overtakelsesdato: '2022-10-24',
            fødselsdato: '2022-01-24',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
    },
};

export const AleneforsørgerÅttiProsentFødselToBarn: Story = {
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
export const AleneforsørgerFarÅttiProsentFødsel: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.FAR,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: true,
            termindato: '2022-07-10',
            antallBarn: '1',
            fødselsdato: '2022-08-10',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
    },
};

export const FlereForsørgereHundreProsentAdopsjon: Story = {
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
            overtakelsesdato: '2022-10-10',
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

export const KunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: true,
            termindato: '2024-07-10',
            fødselsdato: '2024-07-10',
            antallBarn: '1',
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
    },
};

export const AleneforsørgerMorErUfør: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2022-10-24',
            antallBarn: '1',
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.UFØR,
        },
    },
};
export const OppsummeringFarOgFarKunFar2HarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Hugo Utvikler',
            type: Situasjon.FAR_OG_FAR,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2022-10-24',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
    },
};
