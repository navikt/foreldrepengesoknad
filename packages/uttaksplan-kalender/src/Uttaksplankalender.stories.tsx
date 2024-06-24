import { Meta, StoryObj } from '@storybook/react';

import {
    Arbeidsform,
    BarnType,
    Forelder,
    OppholdÅrsakType,
    PeriodeInfoType,
    Periodetype,
    StønadskontoType,
    UtsettelseÅrsakType,
} from '@navikt/fp-constants';
import { Periode } from '@navikt/fp-types';

import UttaksplanKalender from './UttaksplanKalender';

const meta = {
    title: 'UttaksplanKalender',
    component: UttaksplanKalender,
} satisfies Meta<typeof UttaksplanKalender>;
export default meta;

type Story = StoryObj<typeof UttaksplanKalender>;

const uttaksplanMor = [
    {
        type: Periodetype.Uttak,
        id: '1',
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        tidsperiode: {
            fom: new Date('2024-03-15'),
            tom: new Date('2024-04-03'),
        },
        forelder: Forelder.mor,
    },
    {
        type: Periodetype.Uttak,
        id: '2',
        konto: StønadskontoType.Mødrekvote,
        tidsperiode: {
            fom: new Date('2024-04-04'),
            tom: new Date('2024-04-18'),
        },
        forelder: Forelder.mor,
    },
    {
        type: Periodetype.Hull,
        id: '3',
        forelder: Forelder.mor,
        tidsperiode: {
            fom: new Date('2024-04-19'),
            tom: new Date('2024-05-16'),
        },
    },
    {
        type: Periodetype.Info,
        infotype: PeriodeInfoType.avslåttPeriode,
        id: '4',
        årsak: UtsettelseÅrsakType.HvØvelse,
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
        konto: StønadskontoType.Fellesperiode,
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
        konto: StønadskontoType.Fellesperiode,
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
        konto: StønadskontoType.Fellesperiode,
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
        årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
        tidsperiode: {
            fom: new Date('2024-06-28'),
            tom: new Date('2024-07-02'),
        },
        forelder: Forelder.farMedmor,
        overskrives: true,
        gradert: false,
        ønskerSamtidigUttak: true,
        visPeriodeIPlan: false,
    },
    {
        type: Periodetype.Info,
        infotype: PeriodeInfoType.uttakAnnenPart,
        id: '10',
        årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
        tidsperiode: {
            fom: new Date('2024-07-03'),
            tom: new Date('2024-07-15'),
        },
        forelder: Forelder.farMedmor,
        overskrives: true,
        gradert: false,
        ønskerSamtidigUttak: false,
        visPeriodeIPlan: true,
    },
];

export const MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering: Story = {
    args: {
        uttaksplan: uttaksplanMor as Periode[],
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
                konto: StønadskontoType.ForeldrepengerFørFødsel,
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
                konto: StønadskontoType.ForeldrepengerFørFødsel,
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
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.Foreldrepenger,
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
                forelder: Forelder.farMedmor,
                tidsperiode: {
                    fom: new Date('2021-06-29'),
                    tom: new Date('2021-07-16'),
                },
                årsak: UtsettelseÅrsakType.Arbeid,
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
                konto: StønadskontoType.Foreldrepenger,
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
                årsak: UtsettelseÅrsakType.InstitusjonBarnet,
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
                årsak: UtsettelseÅrsakType.InstitusjonSøker,
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
                årsak: OppholdÅrsakType.ForeldrepengerFørFødsel,
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
                årsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
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
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.Fedrekvote,
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
                årsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
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
                årsak: UtsettelseÅrsakType.HvØvelse,
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
                årsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
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
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.Fellesperiode,
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
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.Fedrekvote,
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
                årsak: UtsettelseÅrsakType.Arbeid,
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
                årsak: UtsettelseÅrsakType.Ferie,
                tidsperiode: {
                    fom: new Date('2021-06-15'),
                    tom: new Date('2021-06-28'),
                },
            },
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.farMedmor,
                årsak: UtsettelseÅrsakType.Ferie,
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
                årsak: UtsettelseÅrsakType.Fri,
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
                årsak: UtsettelseÅrsakType.InstitusjonBarnet,
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
                årsak: UtsettelseÅrsakType.InstitusjonSøker,
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
                årsak: UtsettelseÅrsakType.NavTiltak,
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
                forelder: Forelder.farMedmor,
                årsak: UtsettelseÅrsakType.Sykdom,
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
                forelder: Forelder.farMedmor,
                årsak: UtsettelseÅrsakType.HvØvelse,
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
                forelder: Forelder.farMedmor,
                årsak: UtsettelseÅrsakType.Arbeid,
                tidsperiode: {
                    fom: new Date('2021-04-05'),
                    tom: new Date('2021-06-14'),
                },
            },
            {
                type: Periodetype.Utsettelse,
                id: '2',
                forelder: Forelder.farMedmor,
                årsak: UtsettelseÅrsakType.HvØvelse,
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
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                tidsperiode: {
                    fom: new Date('2023-06-12'),
                    tom: new Date('2023-06-30'),
                },
                forelder: 'mor',
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
                kontoType: StønadskontoType.Foreldrepenger,
                forelder: 'mor',
                overskrives: true,
                visPeriodeIPlan: true,
                kanSlettes: true,
            },
            {
                id: '3',
                type: Periodetype.Uttak,
                konto: StønadskontoType.Foreldrepenger,
                tidsperiode: {
                    fom: new Date('2023-07-10'),
                    tom: new Date('2024-05-17'),
                },
                forelder: 'mor',
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
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                tidsperiode: {
                    fom: new Date('2023-06-12'),
                    tom: new Date('2023-06-30'),
                },
                forelder: 'mor',
                ønskerSamtidigUttak: false,
                gradert: false,
            },
            {
                id: '2',
                type: Periodetype.Uttak,
                konto: StønadskontoType.Foreldrepenger,
                tidsperiode: {
                    fom: new Date('2023-07-03'),
                    tom: new Date('2024-05-17'),
                },
                forelder: 'mor',
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
                kontoType: StønadskontoType.Foreldrepenger,
                forelder: 'mor',
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
                konto: StønadskontoType.Mødrekvote,
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
                konto: StønadskontoType.Mødrekvote,
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
                konto: StønadskontoType.Mødrekvote,
                tidsperiode: {
                    fom: new Date('2024-05-21'),
                    tom: new Date('2024-05-27'),
                },
            },
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: Forelder.mor,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: {
                    fom: new Date('2024-05-28'),
                    tom: new Date('2024-06-06'),
                },
            },
            {
                type: Periodetype.Uttak,
                id: '1',
                forelder: Forelder.mor,
                konto: StønadskontoType.Mødrekvote,
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
                konto: StønadskontoType.Mødrekvote,
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
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.Fedrekvote,
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
