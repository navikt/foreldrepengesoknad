import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';

import { BarnType } from '@navikt/fp-constants';
import { KontoBeregningDto } from '@navikt/fp-types';

import { KvoteOppsummering } from './KvoteOppsummering';
import { UttaksplanDataProvider } from './context/UttaksplanDataContext';

const meta = {
    component: KvoteOppsummering,
    args: {
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
        barn: {
            type: BarnType.UFØDT,
            termindato: '2025-05-06',
            antallBarn: 1,
        },
        visStatusIkoner: true,
        modus: 'innsyn',
        aleneOmOmsorg: false,
        erMedmorDelAvSøknaden: true,
        harAktivitetskravIPeriodeUtenUttak: true,
        bareFarMedmorHarRett: false,
        erDeltUttak: false,
        erFlereUttaksplanversjoner: false,
    },
    render: (args) => {
        const { visStatusIkoner, ...rest } = args;
        return (
            <UttaksplanDataProvider {...rest}>
                <KvoteOppsummering visStatusIkoner={visStatusIkoner} />
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<
    Omit<ComponentProps<typeof UttaksplanDataProvider>, 'children'> & ComponentProps<typeof KvoteOppsummering>
>;
export default meta;

type Story = StoryObj<typeof meta>;

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
} satisfies KontoBeregningDto;

export const BeggeRettMorIngenDagerBrukt: Story = {
    args: {
        valgtStønadskonto: kontoNårBeggeHarRett,
        saksperioder: [],
        aleneOmOmsorg: false,
        erDeltUttak: true,
        erFarEllerMedmor: false,
        erMedmorDelAvSøknaden: false,
    },
};

export const BeggeRettMorAlleDagerBrukt: Story = {
    args: {
        valgtStønadskonto: kontoNårBeggeHarRett,
        saksperioder: [
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
                forelder: 'MOR',
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
                forelder: 'MOR',
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
                forelder: 'MOR',
            },
            {
                fom: '2025-12-30',
                tom: '2026-04-13',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: true,
        erFarEllerMedmor: false,
    },
};

export const BeggeRettMorForMangeDagerBrukt: Story = {
    args: {
        valgtStønadskonto: kontoNårBeggeHarRett,
        saksperioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-08',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-09',
                tom: '2025-03-21',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-03-24',
                tom: '2025-05-16',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-29',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-07-28',
                tom: '2025-09-29',
                oppholdÅrsak: 'FELLESPERIODE_ANNEN_FORELDER',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-09-22',
                tom: '2025-09-29',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: true,
        erFarEllerMedmor: false,
        erMedmorDelAvSøknaden: false,
    },
};

export const BeggeRettMorMedGraderingOgFellesUttak: Story = {
    args: {
        valgtStønadskonto: kontoNårBeggeHarRett,
        saksperioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-06',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-09',
                tom: '2025-03-14',
                kontoType: 'MØDREKVOTE',
                samtidigUttak: 60,
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-03-24',
                tom: '2025-05-16',
                kontoType: 'FELLESPERIODE',
                gradering: {
                    arbeidstidprosent: 50,
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                    },
                },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-31',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: true,
        erFarEllerMedmor: false,
    },
};

export const BeggeRettMorLedigeDager: Story = {
    args: {
        valgtStønadskonto: kontoNårBeggeHarRett,
        saksperioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-02',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-09',
                tom: '2025-02-14',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-03-24',
                tom: '2025-04-16',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-17',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-07-28',
                tom: '2025-09-12',
                oppholdÅrsak: 'FELLESPERIODE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-09-22',
                tom: '2025-09-24',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: true,
        erFarEllerMedmor: false,
    },
};

export const BeggeRettMorLedigeDagerMedDagerFørFødselFaltBort: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-05-06'],
            antallBarn: 1,
        },
        valgtStønadskonto: kontoNårBeggeHarRett,
        saksperioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-02',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-09',
                tom: '2025-02-14',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-03-24',
                tom: '2025-04-16',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-17',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-07-28',
                tom: '2025-09-12',
                oppholdÅrsak: 'FELLESPERIODE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-09-22',
                tom: '2025-09-24',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: true,
        erFarEllerMedmor: false,
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
} satisfies KontoBeregningDto;

export const EnRettFarAlleDagerBrukt: Story = {
    args: {
        valgtStønadskonto: kontoNårBareFarHarRett,
        saksperioder: [
            {
                fom: '2024-12-06',
                tom: '2025-02-13',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-02-14',
                tom: '2025-09-11',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: false,
        erFarEllerMedmor: true,
    },
};

export const EnRettFarLedigeDager: Story = {
    args: {
        modus: 'planlegger',
        valgtStønadskonto: kontoNårBareFarHarRett,
        saksperioder: [
            {
                fom: '2024-12-06',
                tom: '2025-02-06',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-02-14',
                tom: '2025-09-04',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: false,
        erFarEllerMedmor: true,
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
} satisfies KontoBeregningDto;

export const EnRettMorAlleDagerBrukt: Story = {
    args: {
        valgtStønadskonto: kontoNårBareMorHarRett,
        saksperioder: [
            {
                fom: '2024-11-19',
                tom: '2024-12-09',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-10',
                tom: '2025-10-27',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: false,
        erFarEllerMedmor: false,
    },
};

export const EnRettMorLedigeDager: Story = {
    args: {
        valgtStønadskonto: kontoNårBareMorHarRett,
        saksperioder: [
            {
                fom: '2024-11-19',
                tom: '2024-12-01',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-10',
                tom: '2025-10-13',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: false,
        erFarEllerMedmor: false,
    },
};

export const AleneomsorgMorLedigeDager: Story = {
    args: {
        valgtStønadskonto: kontoNårBareMorHarRett,
        saksperioder: [
            {
                fom: '2024-11-19',
                tom: '2024-12-01',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-10',
                tom: '2025-10-13',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ],
        aleneOmOmsorg: true,
        erDeltUttak: false,
        erFarEllerMedmor: false,
    },
};

export const AleneomsorgFarLedigeDager: Story = {
    args: {
        valgtStønadskonto: {
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
        saksperioder: [
            {
                fom: '2024-11-01',
                tom: '2025-07-04',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-09-12',
                tom: '2025-09-25',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        aleneOmOmsorg: true,
        erDeltUttak: false,
        erFarEllerMedmor: true,
    },
};

export const AleneomsorgFarForMangeDager: Story = {
    args: {
        valgtStønadskonto: {
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
        saksperioder: [
            {
                fom: '2024-11-01',
                tom: '2025-07-04',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-09-12',
                tom: '2025-12-30',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        aleneOmOmsorg: true,
        erDeltUttak: false,
        erFarEllerMedmor: true,
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
        valgtStønadskonto: {
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
        saksperioder: [
            {
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
                forelder: 'MOR',
            },
            {
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
                forelder: 'MOR',
            },
        ],
        aleneOmOmsorg: false,
        erDeltUttak: true,
        erFarEllerMedmor: false,
    },
};
