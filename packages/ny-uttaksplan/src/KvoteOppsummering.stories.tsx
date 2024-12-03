import { Meta, StoryObj } from '@storybook/react';

import { Forelder, RettighetType } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { MorsAktivitet, OppholdÅrsakType, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import { KvoteOppsummering } from '.';

const meta = {
    component: KvoteOppsummering,
} satisfies Meta<typeof KvoteOppsummering>;
export default meta;

type Story = StoryObj<typeof meta>;

const kontoNårBeggeHarRett = {
    kontoer: [
        {
            konto: StønadskontoType.Fellesperiode,
            dager: 80,
        },
        {
            konto: StønadskontoType.Mødrekvote,
            dager: 75,
        },
        {
            konto: StønadskontoType.Fedrekvote,
            dager: 75,
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
} satisfies TilgjengeligeStønadskontoerForDekningsgrad;

export const BeggeRettMorIngenDagerBrukt: Story = {
    args: {
        konto: kontoNårBeggeHarRett,
        perioder: [],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};

export const BeggeRettMorAlleDagerBrukt: Story = {
    args: {
        konto: kontoNårBeggeHarRett,
        perioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-06',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-12-09',
                tom: '2025-03-14',
                kontoType: StønadskontoType.Mødrekvote,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-03-24',
                tom: '2025-05-16',
                kontoType: StønadskontoType.Fellesperiode,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-31',
                oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-07-28',
                tom: '2025-09-19',
                oppholdÅrsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-09-22',
                tom: '2025-09-26',
                kontoType: StønadskontoType.Mødrekvote,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};

export const BeggeRettMorLedigeDager: Story = {
    args: {
        konto: kontoNårBeggeHarRett,
        perioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-02',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-12-09',
                tom: '2025-02-14',
                kontoType: StønadskontoType.Mødrekvote,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-03-24',
                tom: '2025-04-16',
                kontoType: StønadskontoType.Fellesperiode,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-17',
                oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-07-28',
                tom: '2025-09-12',
                oppholdÅrsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-09-22',
                tom: '2025-09-24',
                kontoType: StønadskontoType.Mødrekvote,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};

const kontoNårEnHarRett = {
    kontoer: [
        {
            konto: StønadskontoType.AktivitetsfriKvote,
            dager: 50,
        },
        {
            konto: StønadskontoType.Foreldrepenger,
            dager: 150,
        },
    ],
    minsteretter: {
        farRundtFødsel: 10,
        toTette: 0,
    },
    tillegg: {
        flerbarn: 0,
        prematur: 0,
    },
} satisfies TilgjengeligeStønadskontoerForDekningsgrad;

export const EnRettFarAlleDagerBrukt: Story = {
    args: {
        konto: kontoNårEnHarRett,
        perioder: [
            {
                fom: '2024-12-06',
                tom: '2025-02-13',
                kontoType: StønadskontoType.Foreldrepenger,
                morsAktivitet: MorsAktivitet.IkkeOppgitt,
                flerbarnsdager: false,
                forelder: Forelder.farMedmor,
            },
            {
                fom: '2025-02-14',
                tom: '2025-09-11',
                kontoType: StønadskontoType.Foreldrepenger,
                morsAktivitet: MorsAktivitet.Arbeid,
                flerbarnsdager: false,
                forelder: Forelder.farMedmor,
            },
        ],
        rettighetType: RettighetType.BARE_SØKER_RETT,
        forelder: Forelder.farMedmor,
    },
};

export const EnRettFarLedigeDager: Story = {
    args: {
        konto: kontoNårEnHarRett,
        perioder: [
            {
                fom: '2024-12-06',
                tom: '2025-02-06',
                kontoType: StønadskontoType.Foreldrepenger,
                morsAktivitet: MorsAktivitet.IkkeOppgitt,
                flerbarnsdager: false,
                forelder: Forelder.farMedmor,
            },
            {
                fom: '2025-02-14',
                tom: '2025-09-04',
                kontoType: StønadskontoType.Foreldrepenger,
                morsAktivitet: MorsAktivitet.Arbeid,
                flerbarnsdager: false,
                forelder: Forelder.farMedmor,
            },
        ],
        rettighetType: RettighetType.BARE_SØKER_RETT,
        forelder: Forelder.farMedmor,
    },
};
