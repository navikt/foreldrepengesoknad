import { Meta, StoryObj } from '@storybook/react-vite';

import { Arbeidsform, BarnType, Forelder, PeriodeInfoType, Periodetype } from '@navikt/fp-constants';
import { Periode } from '@navikt/fp-types';

import { UttaksplanKalender } from './UttaksplanKalender';

const meta = {
    title: 'UttaksplanKalender',
    component: UttaksplanKalender,
} satisfies Meta<typeof UttaksplanKalender>;
export default meta;

type Story = StoryObj<typeof meta>;

const uttaksplanMor = [
    {
        type: Periodetype.Uttak,
        id: '1',
        konto: 'FORELDREPENGER_FØR_FØDSEL',
        tidsperiode: {
            fom: new Date('2024-03-15'),
            tom: new Date('2024-04-03'),
        },
        forelder: Forelder.mor,
    },
    {
        type: Periodetype.Uttak,
        id: '2',
        konto: 'MØDREKVOTE',
        tidsperiode: {
            fom: new Date('2024-04-04'),
            tom: new Date('2024-04-18'),
        },
        forelder: Forelder.mor,
    },
    {
        type: Periodetype.Hull,
        id: '3',
        tidsperiode: {
            fom: new Date('2024-04-19'),
            tom: new Date('2024-05-16'),
        },
    },
    {
        type: Periodetype.Info,
        infotype: PeriodeInfoType.avslåttPeriode,
        kontoType: 'MØDREKVOTE',
        kanSlettes: false,
        id: '4',
        tidsperiode: {
            fom: new Date('2024-05-17'),
            tom: new Date('2024-05-23'),
        },
        forelder: Forelder.mor,
        overskrives: true,
        visPeriodeIPlan: true,
    },
    {
        type: Periodetype.PeriodeUtenUttak,
        id: '5',
        tidsperiode: {
            fom: new Date('2024-05-24'),
            tom: new Date('2024-05-30'),
        },
    },
    {
        id: '6',
        forelder: Forelder.mor,
        konto: 'FELLESPERIODE',
        tidsperiode: {
            fom: new Date('2024-05-31'),
            tom: new Date('2024-06-13'),
        },
        type: Periodetype.Uttak,
        erArbeidstaker: false,
        gradert: false,
        orgnumre: [],
        ønskerSamtidigUttak: false,
    },
    {
        id: '7',
        forelder: Forelder.mor,
        konto: 'FELLESPERIODE',
        tidsperiode: {
            fom: new Date('2024-06-14'),
            tom: new Date('2024-06-27'),
        },
        type: Periodetype.Uttak,
        arbeidsformer: [Arbeidsform.arbeidstaker],
        erArbeidstaker: false,
        gradert: true,
        orgnumre: ['896929119'],
        stillingsprosent: '56',
        ønskerSamtidigUttak: false,
    },
    {
        id: '8',
        forelder: Forelder.mor,
        konto: 'FELLESPERIODE',
        tidsperiode: {
            fom: new Date('2024-06-28'),
            tom: new Date('2024-07-02'),
        },
        type: Periodetype.Uttak,
        arbeidsformer: [Arbeidsform.arbeidstaker],
        erArbeidstaker: false,
        ønskerSamtidigUttak: true,
    },
    {
        type: Periodetype.Info,
        infotype: PeriodeInfoType.uttakAnnenPart,
        id: '9',
        årsak: 'UTTAK_FEDREKVOTE_ANNEN_FORELDER',
        tidsperiode: {
            fom: new Date('2024-06-28'),
            tom: new Date('2024-07-02'),
        },
        forelder: 'FAR_MEDMOR',
        overskrives: true,
        gradert: false,
        ønskerSamtidigUttak: true,
        visPeriodeIPlan: false,
    },
    {
        type: Periodetype.Info,
        infotype: PeriodeInfoType.uttakAnnenPart,
        id: '10',
        årsak: 'UTTAK_FEDREKVOTE_ANNEN_FORELDER',
        tidsperiode: {
            fom: new Date('2024-07-03'),
            tom: new Date('2024-07-15'),
        },
        forelder: 'FAR_MEDMOR',
        overskrives: true,
        gradert: false,
        ønskerSamtidigUttak: false,
        visPeriodeIPlan: true,
    },
] satisfies Periode[];

export const MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering: Story = {
    args: {
        uttaksplan: uttaksplanMor,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const MorVelgerIngenUttakFørTerminIUttaksplan: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Uttak,
                id: '1',
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                tidsperiode: {
                    fom: new Date('2024-03-15'),
                    tom: new Date('2024-04-03'),
                },
                forelder: Forelder.mor,
                skalIkkeHaUttakFørTermin: true,
            },
            uttaksplanMor[1],
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const MorVelgerIngenUttakFørTerminIStegetFør: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Uttak,
                id: '1',
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                tidsperiode: {},
                forelder: Forelder.mor,
                skalIkkeHaUttakFørTermin: true,
            },
            uttaksplanMor[1],
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const FarSøkerMedTapteDagerOgUtsettelse: Story = {
    args: {
        uttaksplan: [
            {
                id: '1',
                forelder: 'FAR_MEDMOR',
                konto: 'FORELDREPENGER',
                tidsperiode: {
                    fom: new Date('2021-05-31'),
                    tom: new Date('2021-06-14'),
                },
                type: Periodetype.Uttak,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: false,
            },
            {
                type: Periodetype.Hull,
                id: '2',
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
            },
            {
                type: Periodetype.Utsettelse,
                id: '3',
                forelder: 'FAR_MEDMOR',
                tidsperiode: {
                    fom: new Date('2021-06-29'),
                    tom: new Date('2021-07-16'),
                },
                årsak: 'ARBEID',
                bekrefterArbeidIPerioden: true,
                erArbeidstaker: true,
            },
        ],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-05-31'],
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        navnAnnenPart: 'Hanne',
    },
};

export const MorSøkerMedFlereUtsettelser: Story = {
    args: {
        uttaksplan: [
            {
                id: '1',
                forelder: Forelder.mor,
                konto: 'FORELDREPENGER',
                tidsperiode: {
                    fom: new Date('2021-05-31'),
                    tom: new Date('2021-06-14'),
                },
                type: Periodetype.Uttak,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: false,
            },
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.mor,
                årsak: 'INSTITUSJONSOPPHOLD_BARNET',
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
                erArbeidstaker: true,
            },
            {
                type: Periodetype.Utsettelse,
                id: '3',
                forelder: Forelder.mor,
                tidsperiode: {
                    fom: new Date('2021-06-29'),
                    tom: new Date('2021-07-16'),
                },
                årsak: 'INSTITUSJONSOPPHOLD_SØKER',
                bekrefterArbeidIPerioden: true,
                erArbeidstaker: true,
            },
        ],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-05-31'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};
export const FarSøkerMedSamtidigUttakMorUtsettelseMorOgGradering: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Info,
                infotype: PeriodeInfoType.uttakAnnenPart,
                id: '1',
                årsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
                tidsperiode: {
                    fom: new Date('2024-03-15'),
                    tom: new Date('2024-04-03'),
                },
                forelder: Forelder.mor,
                overskrives: true,
                gradert: false,
                ønskerSamtidigUttak: false,
                visPeriodeIPlan: true,
            },
            {
                type: Periodetype.Info,
                infotype: PeriodeInfoType.uttakAnnenPart,
                id: '2',
                årsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
                tidsperiode: {
                    fom: new Date('2024-04-04'),
                    tom: new Date('2024-04-18'),
                },
                forelder: Forelder.mor,
                overskrives: true,
                gradert: false,
                ønskerSamtidigUttak: true,
                visPeriodeIPlan: false,
            },
            {
                id: '3',
                forelder: 'FAR_MEDMOR',
                konto: 'FEDREKVOTE',
                tidsperiode: {
                    fom: new Date('2024-04-04'),
                    tom: new Date('2024-04-18'),
                },
                type: Periodetype.Uttak,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
            },
            {
                type: Periodetype.Info,
                infotype: PeriodeInfoType.uttakAnnenPart,
                id: '4',
                årsak: 'UTTAK_FELLESP_ANNEN_FORELDER',
                tidsperiode: {
                    fom: new Date('2024-04-19'),
                    tom: new Date('2024-05-16'),
                },
                forelder: Forelder.mor,
                overskrives: true,
                gradert: false,
                ønskerSamtidigUttak: false,
                visPeriodeIPlan: true,
            },
            {
                type: Periodetype.Info,
                infotype: PeriodeInfoType.utsettelseAnnenPart,
                id: '5',
                årsak: 'HV_OVELSE',
                tidsperiode: {
                    fom: new Date('2024-05-17'),
                    tom: new Date('2024-05-23'),
                },
                forelder: Forelder.mor,
                overskrives: true,
                visPeriodeIPlan: true,
            },
            {
                type: Periodetype.Info,
                infotype: PeriodeInfoType.uttakAnnenPart,
                id: '6',
                årsak: 'UTTAK_FELLESP_ANNEN_FORELDER',
                tidsperiode: {
                    fom: new Date('2024-05-24'),
                    tom: new Date('2024-05-30'),
                },
                forelder: Forelder.mor,
                overskrives: true,
                gradert: false,
                ønskerSamtidigUttak: false,
                visPeriodeIPlan: true,
            },
            {
                id: '8',
                forelder: 'FAR_MEDMOR',
                konto: 'FELLESPERIODE',
                tidsperiode: {
                    fom: new Date('2024-05-31'),
                    tom: new Date('2024-06-13'),
                },
                type: Periodetype.Uttak,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: false,
            },
            {
                id: '9',
                forelder: 'FAR_MEDMOR',
                konto: 'FEDREKVOTE',
                tidsperiode: {
                    fom: new Date('2024-06-14'),
                    tom: new Date('2024-07-02'),
                },
                type: Periodetype.Uttak,
                arbeidsformer: [Arbeidsform.arbeidstaker],
                erArbeidstaker: false,
                gradert: true,
                orgnumre: ['896929119'],
                stillingsprosent: '56',
                ønskerSamtidigUttak: false,
            },
        ],
        barn: {
            type: BarnType.UFØDT,
            termindato: '2024-04-04',
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        navnAnnenPart: 'Hanne',
    },
};

export const UtsettelseMorArbeid: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.mor,
                årsak: 'ARBEID',
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseMorFerieMedFarsUtsettelse: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.mor,
                årsak: 'LOVBESTEMT_FERIE',
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
            },
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: 'FAR_MEDMOR',
                årsak: 'LOVBESTEMT_FERIE',
                tidsperiode: {
                    fom: new Date('2021-06-29'),
                    tom: new Date('2021-07-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseMorFri: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.mor,
                årsak: 'FRI',
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseMorInstitusjonBarnet: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.mor,
                årsak: 'INSTITUSJONSOPPHOLD_BARNET',
                tidsperiode: {
                    fom: new Date('2021-04-05'),
                    tom: new Date('2021-05-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hanne',
    },
};

export const UtsettelseMorInstitusjonSøker: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.mor,
                årsak: 'INSTITUSJONSOPPHOLD_SØKER',
                tidsperiode: {
                    fom: new Date('2021-04-05'),
                    tom: new Date('2021-05-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseMorNavTiltak: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.mor,
                årsak: 'NAV_TILTAK',
                tidsperiode: {
                    fom: new Date('2021-04-05'),
                    tom: new Date('2021-05-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseFarSykdom: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: 'FAR_MEDMOR',
                årsak: 'SYKDOM',
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        navnAnnenPart: 'Hanne',
    },
};

export const UtsettelseFarHvØvelse: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: 'FAR_MEDMOR',
                årsak: 'HV_OVELSE',
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        navnAnnenPart: 'Hanne',
    },
};

export const UtsettelseFarFlereÅrsaker: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: 'FAR_MEDMOR',
                årsak: 'ARBEID',
                tidsperiode: {
                    fom: new Date('2021-04-05'),
                    tom: new Date('2021-06-14'),
                },
            },
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: 'FAR_MEDMOR',
                årsak: 'HV_OVELSE',
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        navnAnnenPart: 'Hanne',
    },
};

export const MorAvslåttPeriodeFørste6UkeneGirTapteDager: Story = {
    args: {
        uttaksplan: [
            {
                id: '1',
                type: Periodetype.Uttak,
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                tidsperiode: {
                    fom: new Date('2023-06-12'),
                    tom: new Date('2023-06-30'),
                },
                forelder: 'MOR',
                ønskerSamtidigUttak: false,
                gradert: false,
            },
            {
                id: '2',
                type: Periodetype.Info,
                infotype: 'avslåttPeriode',
                tidsperiode: {
                    fom: new Date('2023-07-03'),
                    tom: new Date('2023-07-07'),
                },
                avslåttPeriodeType: Periodetype.Uttak,
                kontoType: 'FORELDREPENGER',
                forelder: 'MOR',
                overskrives: true,
                visPeriodeIPlan: true,
                kanSlettes: true,
            },
            {
                id: '3',
                type: Periodetype.Uttak,
                konto: 'FORELDREPENGER',
                tidsperiode: {
                    fom: new Date('2023-07-10'),
                    tom: new Date('2024-05-17'),
                },
                forelder: 'MOR',
                ønskerSamtidigUttak: false,
                gradert: false,
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-07-01'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const MorAvslåttPeriodeUtenTapteDager: Story = {
    args: {
        uttaksplan: [
            {
                id: '1',
                type: Periodetype.Uttak,
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                tidsperiode: {
                    fom: new Date('2023-06-12'),
                    tom: new Date('2023-06-30'),
                },
                forelder: 'MOR',
                ønskerSamtidigUttak: false,
                gradert: false,
            },
            {
                id: '2',
                type: Periodetype.Uttak,
                konto: 'FORELDREPENGER',
                tidsperiode: {
                    fom: new Date('2023-07-03'),
                    tom: new Date('2024-05-17'),
                },
                forelder: 'MOR',
                ønskerSamtidigUttak: false,
                gradert: false,
            },
            {
                id: '3',
                type: Periodetype.Info,
                infotype: 'avslåttPeriode',
                tidsperiode: {
                    fom: new Date('2024-05-18'),
                    tom: new Date('2024-07-07'),
                },
                avslåttPeriodeType: Periodetype.Uttak,
                kontoType: 'FORELDREPENGER',
                forelder: 'MOR',
                overskrives: true,
                visPeriodeIPlan: true,
                kanSlettes: true,
            },
        ] as Periode[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-07-01'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};
export const KortPeriodeMedHelg: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: Forelder.mor,
                konto: 'MØDREKVOTE',
                tidsperiode: {
                    fom: new Date('2024-05-24'),
                    tom: new Date('2024-05-27'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2024-05-23'],
            adopsjonsdato: '2024-05-23',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const KortPeriodeUtenHelg: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: Forelder.mor,
                konto: 'MØDREKVOTE',
                tidsperiode: {
                    fom: new Date('2024-05-22'),
                    tom: new Date('2024-05-24'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};
export const TreSammenhengendePerioderSlåttSammen: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: Forelder.mor,
                konto: 'MØDREKVOTE',
                tidsperiode: {
                    fom: new Date('2024-05-21'),
                    tom: new Date('2024-05-27'),
                },
            },
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: Forelder.mor,
                konto: 'StønadskontoType.Fellesperiode',
                tidsperiode: {
                    fom: new Date('2024-05-28'),
                    tom: new Date('2024-06-06'),
                },
            },
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: Forelder.mor,
                konto: 'MØDREKVOTE',
                tidsperiode: {
                    fom: new Date('2024-06-07'),
                    tom: new Date('2024-06-12'),
                },
            },
        ] as Periode[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const MorOppgirSamtidigUttakMedFar: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: Forelder.mor,
                konto: 'MØDREKVOTE',
                samtidigUttakProsent: '50',
                tidsperiode: {
                    fom: new Date('2024-05-21'),
                    tom: new Date('2024-05-27'),
                },
            },
        ],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        navnAnnenPart: 'Hans',
    },
};

export const FarOppgirSamtidigUttakMedMor: Story = {
    args: {
        uttaksplan: [
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: 'FAR_MEDMOR',
                konto: 'FEDREKVOTE',
                samtidigUttakProsent: '70',
                tidsperiode: {
                    fom: new Date('2025-05-21'),
                    tom: new Date('2025-05-27'),
                },
            },
        ],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2025-05-21'],
            adopsjonsdato: '2025-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        navnAnnenPart: 'Hanne',
    },
};
