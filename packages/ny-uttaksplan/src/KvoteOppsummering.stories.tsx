import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { Forelder, RettighetType } from '@navikt/fp-common';
import { KontoBeregningDto_fpoversikt, NavnPåForeldre, UttakArbeidType } from '@navikt/fp-types';

import { KvoteOppsummering } from '.';

const meta = {
    component: KvoteOppsummering,
} satisfies Meta<typeof KvoteOppsummering>;
export default meta;

type Story = StoryObj<typeof meta>;

const navnPåForeldre = {
    mor: 'Helga',
    farMedmor: 'Espen',
} satisfies NavnPåForeldre;

const kontoNårBeggeHarRett = {
    kontoer: [
        {
            konto: 'FELLESPERIODE',
            dager: 80,
        },
        {
            konto: 'MØDREKVOTE',
            dager: 75,
        },
        {
            konto: 'FEDREKVOTE',
            dager: 75,
        },
        {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
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
} satisfies KontoBeregningDto_fpoversikt;

export const BeggeRettMorIngenDagerBrukt: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBeggeHarRett,
        perioder: [],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};

export const BeggeRettMorAlleDagerBrukt: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBeggeHarRett,
        perioder: [
            {
                fom: '2025-05-06',
                tom: '2025-05-26',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
                id: '2025-05-06 - 2025-05-26 - FORELDREPENGER_FØR_FØDSEL',
                readOnly: true,
            },
            {
                fom: '2025-05-27',
                tom: '2025-09-08',
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
                id: '2025-05-27 - 2025-09-08 - MØDREKVOTE',
                readOnly: true,
            },
            {
                fom: '2025-09-09',
                tom: '2025-12-29',
                kontoType: 'FELLESPERIODE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
                id: '2025-09-09 - 2025-12-29 - FELLESPERIODE',
                readOnly: true,
            },
            {
                fom: '2025-12-30',
                tom: '2026-04-13',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
                id: '2025-12-30 - 2026-04-13 - FEDREKVOTE',
                readOnly: true,
            },
        ],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};

export const BeggeRettMorForMangeDagerBrukt: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBeggeHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-10',
                tom: '2024-12-08',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-09',
                tom: '2025-03-18',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-03-24',
                tom: '2025-05-16',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-05-19',
                tom: '2025-08-31',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-07-28',
                tom: '2025-09-29',
                oppholdÅrsak: 'FELLESPERIODE_ANNEN_FORELDER',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-09-22',
                tom: '2025-09-26',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};

export const BeggeRettMorMedGraderingOgFellesUttak: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBeggeHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-18',
                tom: '2024-12-06',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-09',
                tom: '2025-03-14',
                kontoType: 'MØDREKVOTE',
                samtidigUttak: 60,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-03-24',
                tom: '2025-05-16',
                kontoType: 'FELLESPERIODE',
                gradering: {
                    arbeidstidprosent: 50,
                    aktivitet: {
                        type: UttakArbeidType.ORDINÆRT_ARBEID,
                    },
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-05-19',
                tom: '2025-08-31',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
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
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBeggeHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-18',
                tom: '2024-12-02',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-09',
                tom: '2025-02-14',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-03-24',
                tom: '2025-04-16',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-05-19',
                tom: '2025-08-17',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-07-28',
                tom: '2025-09-12',
                oppholdÅrsak: 'FELLESPERIODE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-09-22',
                tom: '2025-09-24',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};

export const BeggeRettMorLedigeDagerMedDagerFørFødselFaltBort: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        familiehendelse: { antallBarn: 1, fødselsdato: dayjs(new Date()).format('DD.MM.YYYY') },
        konto: kontoNårBeggeHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-18',
                tom: '2024-12-02',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-09',
                tom: '2025-02-14',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-03-24',
                tom: '2025-04-16',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-05-19',
                tom: '2025-08-17',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-07-28',
                tom: '2025-09-12',
                oppholdÅrsak: 'FELLESPERIODE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-09-22',
                tom: '2025-09-24',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};

const kontoNårBareFarHarRett = {
    kontoer: [
        {
            konto: 'AKTIVITETSFRI_KVOTE',
            dager: 50,
        },
        {
            konto: 'FORELDREPENGER',
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
} satisfies KontoBeregningDto_fpoversikt;

export const EnRettFarAlleDagerBrukt: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBareFarHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-06',
                tom: '2025-02-13',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-02-14',
                tom: '2025-09-11',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        rettighetType: RettighetType.BARE_SØKER_RETT,
        forelder: 'FAR_MEDMOR',
    },
};

export const EnRettFarLedigeDager: Story = {
    args: {
        navnPåForeldre,
        modus: 'planlegger',
        visStatusIkoner: true,
        konto: kontoNårBareFarHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-06',
                tom: '2025-02-06',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-02-14',
                tom: '2025-09-04',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        rettighetType: RettighetType.BARE_SØKER_RETT,
        forelder: 'FAR_MEDMOR',
    },
};

const kontoNårBareMorHarRett = {
    kontoer: [
        {
            konto: 'FORELDREPENGER',
            dager: 230,
        },
        {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
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
} satisfies KontoBeregningDto_fpoversikt;

export const EnRettMorAlleDagerBrukt: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBareMorHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-19',
                tom: '2024-12-09',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-10',
                tom: '2025-10-27',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.BARE_SØKER_RETT,
        forelder: Forelder.mor,
    },
};

export const EnRettMorLedigeDager: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBareMorHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-19',
                tom: '2024-12-01',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-10',
                tom: '2025-10-13',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.BARE_SØKER_RETT,
        forelder: Forelder.mor,
    },
};

export const AleneomsorgMorLedigeDager: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: kontoNårBareMorHarRett,
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-19',
                tom: '2024-12-01',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-12-10',
                tom: '2025-10-13',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.ALENEOMSORG,
        forelder: Forelder.mor,
    },
};

export const AleneomsorgFarLedigeDager: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: {
            kontoer: [
                {
                    konto: 'FORELDREPENGER',
                    dager: 230,
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
        },
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-01',
                tom: '2025-07-04',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-09-12',
                tom: '2025-09-25',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        rettighetType: RettighetType.ALENEOMSORG,
        forelder: 'FAR_MEDMOR',
    },
};

export const AleneomsorgFarForMangeDager: Story = {
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: {
            kontoer: [
                {
                    konto: 'FORELDREPENGER',
                    dager: 230,
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
        },
        perioder: [
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2024-11-01',
                tom: '2025-07-04',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                id: 'does-not-matter',
                readOnly: true,
                fom: '2025-09-12',
                tom: '2025-12-30',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        rettighetType: RettighetType.ALENEOMSORG,
        forelder: 'FAR_MEDMOR',
    },
};

export const BeggeRettMorOgMedmorMorIngenDagerBrukt: Story = {
    args: {
        ...BeggeRettMorIngenDagerBrukt.args,
        erMedmorDelAvSøknaden: true,
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Maria',
        },
    },
};

export const MorHarPrematuruker: Story = {
    name: 'Mor har prematuruker',
    args: {
        navnPåForeldre,
        modus: 'innsyn',
        visStatusIkoner: true,
        konto: {
            kontoer: [
                {
                    konto: 'FELLESPERIODE',
                    dager: 128,
                },
                {
                    konto: 'MØDREKVOTE',
                    dager: 75,
                },
                {
                    konto: 'FEDREKVOTE',
                    dager: 75,
                },
                {
                    konto: 'FORELDREPENGER_FØR_FØDSEL',
                    dager: 15,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
            tillegg: {
                flerbarn: 0,
                prematur: 48,
            },
        },
        perioder: [
            {
                id: 'whatever',
                readOnly: true,
                fom: '2025-08-13',
                tom: '2025-10-10',
                kontoType: 'FELLESPERIODE',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'AVSLAG_FRATREKK_PLEIEPENGER',
                },
                utsettelseÅrsak: 'BARN_INNLAGT',
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                id: 'whatever',
                readOnly: true,
                fom: '2025-10-11',
                tom: '2025-11-25',
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};
