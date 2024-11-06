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
import { HvorMye } from 'types/HvorMye';

import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';

import OppsummeringSteg from './OppsummeringSteg';

const MINSTERETTER_FAR_RUNDT_FØDSEL_10 = {
    farRundtFødsel: 10,
    toTette: 0,
};

const DEFAULT_SATSER = {
    engangstønad: [
        {
            fom: '01.01.2023',
            verdi: 92648,
        },
        {
            fom: '01.01.2021',
            verdi: 90300,
        },
    ],
    grunnbeløp: [
        {
            fom: '01.05.2024',
            verdi: 124028,
        },
        {
            fom: '01.05.2023',
            verdi: 118620,
        },
    ],
};

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    fordeling?: Fordeling;
    hvorLangPeriode?: HvorLangPeriode;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    hvorMye?: HvorMye;
} & ComponentProps<typeof OppsummeringSteg>;

const meta = {
    title: 'steg/OppsummeringSteg',
    component: OppsummeringSteg,
    render: ({
        hvemPlanlegger,
        fordeling,
        hvorLangPeriode,
        omBarnet,
        arbeidssituasjon,
        stønadskontoer,
        satser,
        locale,
        hvorMye,
    }) => {
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
                        [ContextDataType.HVOR_MYE]: hvorMye,
                    }}
                >
                    <OppsummeringSteg stønadskontoer={stønadskontoer} satser={satser} locale={locale} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FlereForsørgereHundreProsentTermin: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 50000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2025-07-24',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
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
                    { konto: StønadskontoType.Fellesperiode, dager: 101 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: {
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
        },
    },
};

export const MorOgFarKunFarHarRett: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        hvorMye: {
            lønnSøker1: 1000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2024-07-24',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 211 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 50 },
                ],
                minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10,
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 150 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 50 },
                ],
                minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10,
            },
        },
    },
};

export const FarOgFarFødsel: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: Situasjon.FAR_OG_FAR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 1000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2024-11-24',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer,
    },
};

export const FarOgFarAdopsjonKunFar1HarRett: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            type: Situasjon.FAR_OG_FAR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 1000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: false,
            termindato: '2024-07-24',
            antallBarn: '1',
            overtakelsesdato: '2024-10-13',
            fødselsdato: '2024-07-24',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: MorOgFarKunFarHarRett.args?.stønadskontoer,
    },
};
export const FarOgFarAdopsjonBeggeHarRett: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: Situasjon.FAR_OG_FAR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 1000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: false,
            erBarnetFødt: false,
            fødselsdato: '2024-07-24',
            antallBarn: '1',
            overtakelsesdato: '2024-10-13',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer,
    },
};

export const AleneforsørgerÅttiProsentFødselToBarn: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: true,
            termindato: '2024-07-10',
            antallBarn: '2',
            fødselsdato: '2024-08-15',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        stønadskontoer: {
            '80': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 397 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10,
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 315 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10,
            },
        },
    },
};
export const AleneforsørgerFarÅttiProsentFødsel: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.FAR,
        },
        hvorMye: {
            lønnSøker1: 1000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: true,
            termindato: '2024-07-10',
            antallBarn: '1',
            fødselsdato: '2024-08-10',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        stønadskontoer: {
            '80': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 291 }],
                minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10,
            },
            '100': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 230 }],
                minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10,
            },
        },
    },
};

export const FlereForsørgereHundreProsentAdopsjon: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåMedmor: 'Esther Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 1000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: false,
            erBarnetFødt: true,
            fødselsdato: '2024-07-10',
            antallBarn: '1',
            overtakelsesdato: '2024-10-10',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer,
    },
};

export const HarIkkeRett: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: false,
            erBarnetFødt: true,
            fødselsdato: '2024-07-10',
            antallBarn: '1',
            overtakelsesdato: '2024-010-10',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: false,
        },
    },
};

export const KunMorHarRett: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: true,
            termindato: '2024-12-01',
            fødselsdato: '2024-12-01',
            antallBarn: '1',
        },
        hvorMye: {
            lønnSøker1: 1000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: {
            '100': {
                kontoer: [
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 230,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                minsteretter: {
                    farRundtFødsel: 0,
                    toTette: 0,
                },
                tillegg: {
                    flerbarn: 0,
                    prematur: 0,
                },
            },
            '80': {
                kontoer: [
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 291,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                minsteretter: {
                    farRundtFødsel: 0,
                    toTette: 0,
                },
                tillegg: {
                    flerbarn: 0,
                    prematur: 0,
                },
            },
        },
    },
};

export const AleneforsørgerMorErUfør: Story = {
    args: {
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2024-10-24',
            antallBarn: '1',
        },
        hvorMye: {
            lønnSøker1: 1000,
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
        locale: 'nb',
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Hugo Utvikler',
            type: Situasjon.FAR_OG_FAR,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2024-10-24',
            antallBarn: '1',
        },
        hvorMye: {
            lønnSøker1: 1000,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 291 }],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 230 }],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
        },
    },
};
