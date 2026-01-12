import { Meta, StoryObj } from '@storybook/react-vite';
import { ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { HvorMye } from 'types/HvorMye';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { HvemPlanleggerType, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import {
    ALENE_OM_OMSORG_80_FARMEDMOR,
    ALENE_OM_OMSORG_100_FARMEDMOR,
    DELT_UTTAK_80,
    DELT_UTTAK_100,
    IKKE_DELT_UTTAK_80_FARMEDMOR,
    IKKE_DELT_UTTAK_80_FAR_OG_FAR_ADOPSJON,
    IKKE_DELT_UTTAK_80_FAR_OG_FAR_FØDSEL,
    IKKE_DELT_UTTAK_80_MOR,
    IKKE_DELT_UTTAK_100_FARMEDMOR,
    IKKE_DELT_UTTAK_100_FAR_OG_FAR_ADOPSJON,
    IKKE_DELT_UTTAK_100_FAR_OG_FAR_FØDSEL,
    IKKE_DELT_UTTAK_100_MOR,
    IKKE_DELT_UTTAK_TO_BARN_80,
    IKKE_DELT_UTTAK_TO_BARN_100,
    MINSTERETTER,
} from '@navikt/fp-utils-test';

import { OppsummeringSteg } from './OppsummeringSteg';

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    fordeling?: Fordeling;
    hvorLangPeriode?: HvorLangPeriode;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    hvorMye?: HvorMye;
    uttaksplan?: UttakPeriode_fpoversikt[];
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
        hvorMye,
        uttaksplan,
    }) => {
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
                        [ContextDataType.UTTAKSPLAN]: uttaksplan,
                    }}
                >
                    <OppsummeringSteg stønadskontoer={stønadskontoer} satser={satser} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FlereForsørgereHundreProsentTermin: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 50000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: '100',
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
                kontoer: DELT_UTTAK_100,
                minsteretter: MINSTERETTER,
            },
            '80': {
                kontoer: DELT_UTTAK_80,
                minsteretter: MINSTERETTER,
            },
        },
        uttaksplan: [
            {
                fom: '2025-07-03',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2025-07-23',
            },
            {
                fom: '2025-07-24',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-11-05',
            },
            {
                fom: '2025-11-06',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-12-10',
            },
            {
                fom: '2025-12-11',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                tom: '2026-02-25',
            },
            {
                fom: '2026-02-26',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2026-06-10',
            },
        ],
    },
};

export const MorOgFarKunFarHarRett: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        hvorMye: {
            lønnSøker2: 1000,
        },
        hvorLangPeriode: {
            dekningsgrad: '100',
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
                kontoer: IKKE_DELT_UTTAK_80_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FarOgFarFødsel: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
        fordeling: undefined,
        hvorMye: {
            lønnSøker1: 1000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: '100',
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
        stønadskontoer: {
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FarOgFarAdopsjonKunFar1HarRett: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
        fordeling: undefined,
        hvorMye: {
            lønnSøker1: 1000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: '100',
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
        stønadskontoer: {
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_FAR_OG_FAR_ADOPSJON,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FAR_OG_FAR_ADOPSJON,
                minsteretter: MINSTERETTER,
            },
        },
    },
};
export const FarOgFarAdopsjonBeggeHarRett: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 1000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: '100',
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
        uttaksplan: [
            {
                fom: '2024-09-23',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2024-10-11',
            },
            {
                fom: '2024-10-14',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-01-24',
            },
            {
                fom: '2025-01-27',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-02-28',
            },
            {
                fom: '2025-03-03',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-05-16',
            },
            {
                fom: '2025-05-19',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2025-08-29',
            },
        ],
    },
};

export const AleneforsørgerÅttiProsentFødselToBarn: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR,
        },
        hvorMye: {
            lønnSøker1: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: '80',
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
                kontoer: IKKE_DELT_UTTAK_TO_BARN_80,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: IKKE_DELT_UTTAK_TO_BARN_100,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const AleneforsørgerFarÅttiProsentFødsel: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.FAR,
        },
        hvorMye: {
            lønnSøker1: 1000,
        },
        hvorLangPeriode: {
            dekningsgrad: '80',
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
                kontoer: ALENE_OM_OMSORG_80_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: ALENE_OM_OMSORG_100_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FlereForsørgereHundreProsentAdopsjon: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåMedmor: 'Esther Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
        fordeling: {
            antallDagerSøker1: 25,
        },
        hvorMye: {
            lønnSøker1: 1000,
            lønnSøker2: 70000,
        },
        hvorLangPeriode: {
            dekningsgrad: '100',
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
        uttaksplan: [
            {
                fom: '2024-09-19',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2024-10-09',
            },
            {
                fom: '2024-10-10',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-01-22',
            },
            {
                fom: '2025-01-23',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-02-26',
            },
            {
                fom: '2025-02-27',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-05-14',
            },
            {
                fom: '2025-05-15',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2025-08-27',
            },
        ],
    },
};

export const HarIkkeRett: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
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
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
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
            dekningsgrad: '100',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: {
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_MOR,
                minsteretter: MINSTERETTER,
                tillegg: {
                    flerbarn: 0,
                    prematur: 0,
                },
            },
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_MOR,
                minsteretter: MINSTERETTER,
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
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR,
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
            dekningsgrad: '100',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.UFØR,
        },
    },
};
export const OppsummeringFarOgFarKunFar2HarRett: Story = {
    args: {
        satser: DEFAULT_SATSER,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Hugo Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
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
            dekningsgrad: '100',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_FAR_OG_FAR_FØDSEL,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FAR_OG_FAR_FØDSEL,
                minsteretter: MINSTERETTER,
            },
        },
    },
};
