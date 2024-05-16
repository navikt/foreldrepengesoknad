import { StoryFn } from '@storybook/react';

import {
    BarnType,
    Forelder,
    OppholdÅrsakType,
    Periode,
    PeriodeInfoType,
    Periodetype,
    StønadskontoType,
    UtsettelseÅrsakType,
} from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';

import UttaksplanKalender, { UttaksplanKalenderProps } from './UttaksplanKalender';

export default {
    title: 'UttaksplanKalender',
    component: UttaksplanKalender,
};

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
        type: 'uttak',
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
        type: 'uttak',
        arbeidsformer: ['ARBEIDSTAKER'],
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
        type: 'uttak',
        arbeidsformer: ['ARBEIDSTAKER'],
        erArbeidstaker: false,
        gradert: true,
        orgnumre: ['896929119'],
        stillingsprosent: '56',
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
        visPeriodeIPlan: true,
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

const uttaksplanFar = [
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
        type: 'uttak',
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
        type: 'uttak',
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
        type: 'uttak',
        arbeidsformer: ['ARBEIDSTAKER'],
        erArbeidstaker: false,
        gradert: true,
        orgnumre: ['896929119'],
        stillingsprosent: '56',
        ønskerSamtidigUttak: false,
    },
];

const uttaksplanFarAleneMedUtsettelseOgTapteDager = [
    {
        id: '1',
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Foreldrepenger,
        tidsperiode: {
            fom: new Date('2021-05-31'),
            tom: new Date('2021-06-14'),
        },
        type: 'uttak',
        erArbeidstaker: false,
        gradert: false,
        orgnumre: [],
        ønskerSamtidigUttak: false,
    },
    {
        type: Periodetype.Hull,
        id: '2',
        forelder: Forelder.farMedmor,
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
    },
];

const uttaksplanMorAleneMedFlereUtsettelser = [
    {
        id: '1',
        forelder: Forelder.mor,
        konto: StønadskontoType.Foreldrepenger,
        tidsperiode: {
            fom: new Date('2021-05-31'),
            tom: new Date('2021-06-14'),
        },
        type: 'uttak',
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
    },
];

const Template: StoryFn<UttaksplanKalenderProps> = ({ uttaksplan, erFarEllerMedmor, barn, navnAnnenPart }) => {
    initAmplitude();
    return (
        <UttaksplanKalender
            uttaksplan={uttaksplan}
            erFarEllerMedmor={erFarEllerMedmor}
            barn={barn}
            navnAnnenPart={navnAnnenPart}
        />
    );
};

export const MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering = Template.bind({});
MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering.args = {
    uttaksplan: uttaksplanMor as Periode[],
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2024-04-04'],
        antallBarn: 1,
    },
    erFarEllerMedmor: false,
    navnAnnenPart: 'Hans',
};

export const MorVelgerIngenUttakFørTerminIUttaksplan = Template.bind({});
MorVelgerIngenUttakFørTerminIUttaksplan.args = {
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
};

export const MorVelgerIngenUttakFørTerminIStegetFør = Template.bind({});
MorVelgerIngenUttakFørTerminIStegetFør.args = {
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
};

export const FarSøkerMedTapteDagerOgUtsettelse = Template.bind({});
FarSøkerMedTapteDagerOgUtsettelse.args = {
    uttaksplan: uttaksplanFarAleneMedUtsettelseOgTapteDager as Periode[],
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-05-31'],
        antallBarn: 1,
    },
    erFarEllerMedmor: true,
    navnAnnenPart: 'Hanne',
};

export const MorSøkerMedFlereUtsettelser = Template.bind({});
MorSøkerMedFlereUtsettelser.args = {
    uttaksplan: uttaksplanMorAleneMedFlereUtsettelser as Periode[],
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-05-31'],
        antallBarn: 1,
    },
    erFarEllerMedmor: false,
    navnAnnenPart: 'Hans',
};

export const FarSøkerMedSamtidigUttakMorUtsettelseMorOgGradering = Template.bind({});
FarSøkerMedSamtidigUttakMorUtsettelseMorOgGradering.args = {
    uttaksplan: uttaksplanFar as Periode[],
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2024-04-04'],
        antallBarn: 1,
    },
    erFarEllerMedmor: true,
    navnAnnenPart: 'Hanne',
};

export const UtsettelseMorArbeid = Template.bind({});
UtsettelseMorArbeid.args = {
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
};

export const UtsettelseMorFerieMedFarsUtsettelse = Template.bind({});
UtsettelseMorFerieMedFarsUtsettelse.args = {
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
};

export const UtsettelseMorFri = Template.bind({});
UtsettelseMorFri.args = {
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
};

export const UtsettelseMorInstitusjonBarnet = Template.bind({});
UtsettelseMorInstitusjonBarnet.args = {
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
};

export const UtsettelseMorInstitusjonSøker = Template.bind({});
UtsettelseMorInstitusjonSøker.args = {
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
};

export const UtsettelseMorNavTiltak = Template.bind({});
UtsettelseMorNavTiltak.args = {
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
};

export const UtsettelseFarSykdom = Template.bind({});
UtsettelseFarSykdom.args = {
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
};

export const UtsettelseFarHvØvelse = Template.bind({});
UtsettelseFarHvØvelse.args = {
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
};

export const UtsettelseFarFlereÅrsaker = Template.bind({});
UtsettelseFarFlereÅrsaker.args = {
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
};
