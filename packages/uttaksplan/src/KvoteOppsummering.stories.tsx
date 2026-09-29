import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';

import { BarnType } from '@navikt/fp-constants';
import { KontoBeregningDto } from '@navikt/fp-types';

import { KvoteOppsummering } from './KvoteOppsummering';
import { UttaksplanDataProvider } from './context/UttaksplanDataContext';
import { ForeldreInfo } from './types/ForeldreInfo';

const DEFAULT_FORELDRE_INFO = {
    søker: 'MOR',
    navnPåForeldre: {
        mor: 'Helga',
        farMedmor: 'Espen',
    },
    rettighetType: 'BARE_SØKER_RETT',
    erMedmorDelAvSøknaden: false,
} satisfies ForeldreInfo;

const meta = {
    component: KvoteOppsummering,
    args: {
        foreldreInfo: DEFAULT_FORELDRE_INFO,
        barn: {
            type: BarnType.UFØDT,
            termindato: '2025-05-06',
            antallBarn: 1,
        },
        visStatusIkoner: true,
        harAktivitetskravIPeriodeUtenUttak: true,
        erInnsyn: true,
        erPeriodeneTilAnnenPartLåst: false,
    },
    render: (args) => {
        const { visStatusIkoner, erInnsyn, ...rest } = args;
        return (
            <UttaksplanDataProvider {...rest}>
                <KvoteOppsummering erInnsyn={erInnsyn} visStatusIkoner={visStatusIkoner} />
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
        valgtStønadskvote: kontoNårBeggeHarRett,
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
        },
        perioder: [],
        erEndringssøknad: false,
    },
};

export const BeggeRettFarOgFarIngenDagerBrukt: Story = {
    args: {
        ...BeggeRettMorIngenDagerBrukt.args,
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            erFarOgFar: true,
        },
    },
};

export const BeggeRettMorAlleDagerBrukt: Story = {
    args: {
        valgtStønadskvote: kontoNårBeggeHarRett,
        perioder: [
            {
                fom: '2025-05-06',
                tom: '2025-05-26',
                søker: {
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
            },
            {
                fom: '2025-05-27',
                tom: '2025-09-08',
                søker: {
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
            },
            {
                fom: '2025-09-09',
                tom: '2025-12-29',
                søker: {
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
            },
            {
                fom: '2025-12-30',
                tom: '2026-04-13',
                annenPart: { kontoType: 'FEDREKVOTE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
        },
        erEndringssøknad: true,
    },
};

export const BeggeRettMorForMangeDagerBrukt: Story = {
    args: {
        valgtStønadskvote: kontoNårBeggeHarRett,
        perioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-08',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-09',
                tom: '2025-03-21',
                søker: { kontoType: 'MØDREKVOTE', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2025-03-24',
                tom: '2025-05-16',
                søker: { kontoType: 'FELLESPERIODE', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2025-05-19',
                tom: '2025-07-25',
                annenPart: { kontoType: 'FEDREKVOTE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-07-28',
                tom: '2025-09-19',
                annenPart: { kontoType: 'FELLESPERIODE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-09-22',
                tom: '2025-09-29',
                søker: { kontoType: 'MØDREKVOTE', flerbarnsdager: false, forelder: 'MOR' },
                annenPart: { kontoType: 'FELLESPERIODE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
        },
        erEndringssøknad: false,
    },
};

export const BeggeRettMorMedGraderingOgFellesUttak: Story = {
    args: {
        valgtStønadskvote: kontoNårBeggeHarRett,
        perioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-06',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-09',
                tom: '2025-03-14',
                søker: { kontoType: 'MØDREKVOTE', samtidigUttak: 60, flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2025-03-24',
                tom: '2025-05-16',
                søker: {
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
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-31',
                annenPart: { kontoType: 'FEDREKVOTE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
        },
        erEndringssøknad: false,
    },
};

export const BeggeRettMorLedigeDager: Story = {
    args: {
        valgtStønadskvote: kontoNårBeggeHarRett,
        perioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-02',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-09',
                tom: '2025-02-14',
                søker: { kontoType: 'MØDREKVOTE', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2025-03-24',
                tom: '2025-04-16',
                søker: { kontoType: 'FELLESPERIODE', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-17',
                annenPart: { kontoType: 'FEDREKVOTE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-08-28',
                tom: '2025-09-12',
                annenPart: { kontoType: 'FELLESPERIODE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-09-22',
                tom: '2025-09-24',
                søker: { kontoType: 'MØDREKVOTE', flerbarnsdager: false, forelder: 'MOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
        },
        erEndringssøknad: false,
    },
};

export const BeggeRettMorLedigeDagerMedDagerFørFødselFaltBort: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-05-06'],
            antallBarn: 1,
        },
        valgtStønadskvote: kontoNårBeggeHarRett,
        perioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-02',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-09',
                tom: '2025-02-14',
                søker: { kontoType: 'MØDREKVOTE', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2025-03-24',
                tom: '2025-04-16',
                søker: { kontoType: 'FELLESPERIODE', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2025-05-19',
                tom: '2025-08-17',
                annenPart: { kontoType: 'FEDREKVOTE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-08-18',
                tom: '2025-09-12',
                annenPart: { kontoType: 'FELLESPERIODE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-09-22',
                tom: '2025-09-24',
                søker: { kontoType: 'MØDREKVOTE', flerbarnsdager: false, forelder: 'MOR' },
            },
        ],
        erEndringssøknad: false,
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
        },
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
        valgtStønadskvote: kontoNårBareFarHarRett,
        perioder: [
            {
                fom: '2024-12-06',
                tom: '2025-02-13',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    morsAktivitet: 'IKKE_OPPGITT',
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
            {
                fom: '2025-02-14',
                tom: '2025-09-11',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    morsAktivitet: 'ARBEID',
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
        },
        erEndringssøknad: false,
    },
};

export const EnRettFarLedigeDager: Story = {
    args: {
        valgtStønadskvote: kontoNårBareFarHarRett,
        perioder: [
            {
                fom: '2024-12-06',
                tom: '2025-02-06',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    morsAktivitet: 'IKKE_OPPGITT',
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
            {
                fom: '2025-02-14',
                tom: '2025-09-04',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    morsAktivitet: 'ARBEID',
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
        },
        erInnsyn: false,
        erEndringssøknad: false,
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
        valgtStønadskvote: kontoNårBareMorHarRett,
        perioder: [
            {
                fom: '2024-11-19',
                tom: '2024-12-09',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-10',
                tom: '2025-10-27',
                søker: { kontoType: 'FORELDREPENGER', flerbarnsdager: false, forelder: 'MOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'MOR',
        },
        erEndringssøknad: false,
    },
};

export const EnRettMorLedigeDager: Story = {
    args: {
        valgtStønadskvote: kontoNårBareMorHarRett,
        perioder: [
            {
                fom: '2024-11-19',
                tom: '2024-12-01',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-10',
                tom: '2025-10-13',
                søker: { kontoType: 'FORELDREPENGER', flerbarnsdager: false, forelder: 'MOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'MOR',
        },
        erEndringssøknad: false,
    },
};

export const AleneomsorgMorLedigeDager: Story = {
    args: {
        valgtStønadskvote: kontoNårBareMorHarRett,
        perioder: [
            {
                fom: '2024-11-19',
                tom: '2024-12-01',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-10',
                tom: '2025-10-13',
                søker: { kontoType: 'FORELDREPENGER', flerbarnsdager: false, forelder: 'MOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'ALENEOMSORG',
            søker: 'MOR',
        },
        erEndringssøknad: false,
    },
};

export const AleneomsorgFarLedigeDager: Story = {
    args: {
        valgtStønadskvote: {
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
                fom: '2024-11-01',
                tom: '2025-07-04',
                søker: { kontoType: 'FORELDREPENGER', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-09-12',
                tom: '2025-09-25',
                søker: { kontoType: 'FORELDREPENGER', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'ALENEOMSORG',
            søker: 'FAR_MEDMOR',
        },
        erEndringssøknad: false,
    },
};

export const AleneomsorgFarForMangeDager: Story = {
    args: {
        valgtStønadskvote: {
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
                fom: '2024-11-01',
                tom: '2025-07-04',
                søker: { kontoType: 'FORELDREPENGER', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-09-12',
                tom: '2025-12-30',
                søker: { kontoType: 'FORELDREPENGER', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'ALENEOMSORG',
            søker: 'FAR_MEDMOR',
        },
        erEndringssøknad: false,
    },
};

export const BeggeRettMorOgMedmorMorIngenDagerBrukt: Story = {
    args: {
        ...BeggeRettMorIngenDagerBrukt.args,
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            navnPåForeldre: {
                mor: 'Helga',
                farMedmor: 'Maria',
            },
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            erMedmorDelAvSøknaden: true,
        },
    },
};

export const MorHarPrematuruker: Story = {
    name: 'Mor har prematuruker',
    args: {
        valgtStønadskvote: {
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
                fom: '2025-08-13',
                tom: '2025-10-10',
                søker: {
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
            },
            {
                fom: '2025-10-11',
                tom: '2025-11-25',
                søker: {
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
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
        },
        erEndringssøknad: true,
    },
};

export const BeggeRettMangeOvertrukneDagerMedOverføringsÅrsak: Story = {
    args: {
        valgtStønadskvote: kontoNårBeggeHarRett,
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
        },
        perioder: [
            {
                fom: '2026-02-11',
                tom: '2026-03-03',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2026-03-04',
                tom: '2026-06-16',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2026-08-03',
                tom: '2026-11-18',
                søker: {
                    kontoType: 'FEDREKVOTE',
                    forelder: 'MOR',
                    overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2027-01-11',
                tom: '2027-07-28',
                søker: { kontoType: 'FELLESPERIODE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2027-08-03',
                tom: '2027-08-27',
                annenPart: {
                    kontoType: 'MØDREKVOTE',
                    forelder: 'FAR_MEDMOR',
                    overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
                    flerbarnsdager: false,
                },
            },
        ],
        erEndringssøknad: false,
    },
};

// TFP-6964: Fri utsettelse med pleiepenger etter termin skal ikkje teljast som brukte dagar
export const BeggeRettMedFriUtsettelseAnnenPart: Story = {
    name: 'Fri utsettelse frå annen part skal ikkje teljast',
    args: {
        valgtStønadskvote: kontoNårBeggeHarRett,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-05-06'],
            antallBarn: 1,
        },
        perioder: [
            {
                fom: '2025-04-15',
                tom: '2025-05-05',
                annenPart: {
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
            },
            {
                fom: '2025-05-06',
                tom: '2025-08-18',
                annenPart: {
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
            },
            {
                fom: '2025-08-19',
                tom: '2025-11-28',
                annenPart: {
                    kontoType: 'MØDREKVOTE',
                    utsettelseÅrsak: 'FRI',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: false,
                        trekkerDager: false,
                        årsak: 'ANNET',
                    },
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
            },
            {
                fom: '2025-12-01',
                tom: '2026-03-13',
                søker: { kontoType: 'FEDREKVOTE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
        },
        erEndringssøknad: false,
    },
};

// TFP-6964: Variant der trekkerDager er undefined (kan skje med eldre vedtak)
export const BeggeRettMedFriUtsettelseUtenTrekkerDager: Story = {
    name: 'Fri utsettelse utan trekkerDager-flagg skal ikkje teljast',
    args: {
        valgtStønadskvote: kontoNårBeggeHarRett,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-05-06'],
            antallBarn: 1,
        },
        perioder: [
            {
                fom: '2025-04-15',
                tom: '2025-05-05',
                annenPart: {
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
            },
            {
                fom: '2025-05-06',
                tom: '2025-08-18',
                annenPart: {
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
            },
            {
                fom: '2025-08-19',
                tom: '2025-11-28',
                annenPart: { kontoType: 'MØDREKVOTE', utsettelseÅrsak: 'FRI', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2025-12-01',
                tom: '2026-03-13',
                søker: { kontoType: 'FEDREKVOTE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
        },
        erEndringssøknad: false,
    },
};

export const BHFRMedAvslåttePerioder: Story = {
    args: {
        valgtStønadskvote: kontoNårBareFarHarRett,
        perioder: [
            {
                fom: '2026-03-23',
                tom: '2026-05-29',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    morsAktivitet: 'IKKE_OPPGITT',
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
            {
                fom: '2026-06-01',
                tom: '2026-06-30',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: false,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    morsAktivitet: 'ARBEID',
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
            {
                fom: '2026-07-01',
                tom: '2026-07-17',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    resultat: {
                        innvilget: false,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    morsAktivitet: 'UTDANNING',
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
            {
                fom: '2026-07-20',
                tom: '2026-07-27',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: false,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    morsAktivitet: 'ARBEID',
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
        ],
        foreldreInfo: {
            ...DEFAULT_FORELDRE_INFO,
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
        },
        erInnsyn: false,
        erEndringssøknad: true,
    },
};
