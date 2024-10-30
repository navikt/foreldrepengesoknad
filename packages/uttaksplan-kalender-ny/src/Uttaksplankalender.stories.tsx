import { Meta, StoryObj } from '@storybook/react';

import { BarnType, Forelder, StønadskontoType } from '@navikt/fp-constants';
import { PeriodeResultatÅrsak, SaksperiodeNy, UtsettelseÅrsakType, UttakArbeidType } from '@navikt/fp-types';

import { UttaksplanKalender } from './UttaksplanKalender';

const meta = {
    title: 'UttaksplanKalender',
    component: UttaksplanKalender,
} satisfies Meta<typeof UttaksplanKalender>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: UtsettelseÅrsakType.HvØvelse,
                forelder: Forelder.mor,
                resultat: {
                    innvilget: false,
                    trekkerDager: false,
                    trekkerMinsterett: false,
                    årsak: PeriodeResultatÅrsak.INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID,
                },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-27',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
                gradering: {
                    aktivitet: {
                        type: UttakArbeidType.ANNET,
                    },
                    arbeidstidprosent: 50,
                },
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
            },
        ] satisfies SaksperiodeNy[],
        annenPartsPerioder: [
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                kontoType: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                kontoType: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const FarSøkerMedTapteDagerOgUtsettelse: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-05-31',
                tom: '2021-06-14',
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Foreldrepenger,
            },
            {
                fom: '2021-06-29',
                tom: '2021-07-16',
                forelder: Forelder.farMedmor,
                utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-05-31'],
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};

export const MorSøkerMedFlereUtsettelser: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-05-31',
                tom: '2021-06-14',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Foreldrepenger,
            },
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonBarnet,
            },
            {
                fom: '2021-06-29',
                tom: '2021-07-16',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonSøker,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-05-31'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};
export const FarSøkerMedSamtidigUttakMorUtsettelseMorOgGradering: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fedrekvote,
                samtidigUttak: 100,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fellesperiode,
            },
            {
                fom: '2024-06-14',
                tom: '2024-07-02',
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fedrekvote,
                gradering: {
                    aktivitet: {
                        type: UttakArbeidType.FRILANS,
                    },
                    arbeidstidprosent: 50,
                },
            },
        ],
        annenPartsPerioder: [
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-04-19',
                tom: '2024-05-16',
                kontoType: StønadskontoType.Fellesperiode,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: UtsettelseÅrsakType.HvØvelse,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-05-24',
                tom: '2024-05-30',
                kontoType: StønadskontoType.Fellesperiode,
                forelder: Forelder.mor,
            },
        ],
        barn: {
            type: BarnType.UFØDT,
            termindato: '2024-04-04',
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};

export const UtsettelseMorArbeid: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseMorFerieMedFarsUtsettelse: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
            },
            {
                fom: '2021-06-29',
                tom: '2021-07-28',
                forelder: Forelder.farMedmor,
                utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseMorFri: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.Fri,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseMorInstitusjonBarnet: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-04-05',
                tom: '2021-05-28',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonBarnet,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};

export const UtsettelseMorInstitusjonSøker: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-04-05',
                tom: '2021-05-28',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonSøker,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseMorNavTiltak: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-04-05',
                tom: '2021-05-28',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.NavTiltak,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const UtsettelseFarSykdom: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: Forelder.farMedmor,
                utsettelseÅrsak: UtsettelseÅrsakType.Sykdom,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};

export const UtsettelseFarHvØvelse: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2024-06-11',
                tom: '2024-06-24',
                forelder: Forelder.farMedmor,
                utsettelseÅrsak: UtsettelseÅrsakType.HvØvelse,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};

export const UtsettelseFarFlereÅrsaker: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2021-04-05',
                tom: '2021-06-14',
                forelder: Forelder.farMedmor,
                utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
            },
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: Forelder.farMedmor,
                utsettelseÅrsak: UtsettelseÅrsakType.HvØvelse,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-04-04'],
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};

export const MorAvslåttPeriodeFørste6UkeneGirTapteDager: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2023-06-12',
                tom: '2023-06-30',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
            },
            {
                fom: '2023-07-03',
                tom: '2023-07-07',
                kontoType: StønadskontoType.Foreldrepenger,
                forelder: Forelder.mor,
                resultat: {
                    innvilget: false,
                    trekkerDager: false,
                    trekkerMinsterett: false,
                    årsak: PeriodeResultatÅrsak.AVSLAG_UTSETTELSE_TILBAKE_I_TID,
                },
            },
            {
                fom: '2023-07-10',
                tom: '2024-05-17',
                kontoType: StønadskontoType.Foreldrepenger,
                forelder: Forelder.mor,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-07-01'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const MorAvslåttPeriodeUtenTapteDager: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2023-06-12',
                tom: '2023-06-30',
                kontoType: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
            },
            {
                fom: '2023-07-03',
                tom: '2024-05-17',
                kontoType: StønadskontoType.Foreldrepenger,
                forelder: Forelder.mor,
            },
            {
                fom: '2024-05-18',
                tom: '2024-07-07',
                kontoType: StønadskontoType.Foreldrepenger,
                forelder: Forelder.mor,
                resultat: {
                    innvilget: false,
                    trekkerDager: false,
                    trekkerMinsterett: false,
                    årsak: PeriodeResultatÅrsak.AVSLAG_UTSETTELSE_TILBAKE_I_TID,
                },
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-07-01'],
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};
export const KortPeriodeMedHelg: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2024-05-24',
                tom: '2024-05-27',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2024-05-23'],
            adopsjonsdato: '2024-05-23',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const KortPeriodeUtenHelg: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2024-05-22',
                tom: '2024-05-24',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};
export const TreSammenhengendePerioderSlåttSammen: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
            },
            {
                fom: '2024-05-28',
                tom: '2024-06-06',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
            },
            {
                fom: '2024-06-07',
                tom: '2024-06-12',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const MorOppgirSamtidigUttakMedFar: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
                samtidigUttak: 50,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hans',
    },
};

export const FarOppgirSamtidigUttakMedMor: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2025-05-21',
                tom: '2025-05-27',
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fedrekvote,
                samtidigUttak: 70,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2025-05-21'],
            adopsjonsdato: '2025-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Hanne',
    },
};

export const FarOppgirSamtidigUttakNårMorSøker: Story = {
    args: {
        søkersPerioder: [
            {
                fom: '2025-05-21',
                tom: '2025-05-27',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Mødrekvote,
            },
        ] satisfies SaksperiodeNy[],
        annenPartsPerioder: [
            {
                fom: '2025-06-11',
                tom: '2025-06-17',
                forelder: Forelder.farMedmor,
                kontoType: StønadskontoType.Fedrekvote,
                samtidigUttak: 70,
            },
        ] satisfies SaksperiodeNy[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2025-05-21'],
            adopsjonsdato: '2025-05-21',
            antallBarn: 1,
        },
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        bareFarHarRett: false,
        navnAnnenPart: 'Espen',
    },
};
