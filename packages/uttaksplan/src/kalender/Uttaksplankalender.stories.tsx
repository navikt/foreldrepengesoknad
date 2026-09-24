import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { action } from 'storybook/actions';

import { BarnType } from '@navikt/fp-constants';
import { PeriodeDto_fpoversikt } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider } from '../context/UttaksplanRedigeringContext';
import { UttaksplanKalender } from './UttaksplanKalender';

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

const meta = {
    title: 'UttaksplanKalender',
    component: UttaksplanKalender,
    args: {
        readOnly: false,
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erPeriodeneTilAnnenPartLåst: false,
        children: null,
    },
    render: (args) => {
        const [perioder, setPerioder] = useState<PeriodeDto_fpoversikt[] | undefined>(args.perioder);

        const handleOnPlanChange = (oppdatertePerioder: PeriodeDto_fpoversikt[] | undefined) => {
            setPerioder(oppdatertePerioder);
        };

        return (
            <UttaksplanDataProvider
                barn={args.barn}
                valgtStønadskvote={args.valgtStønadskvote}
                foreldreInfo={args.foreldreInfo}
                harAktivitetskravIPeriodeUtenUttak={false}
                perioder={perioder ?? []}
                erPeriodeneTilAnnenPartLåst={args.erPeriodeneTilAnnenPartLåst}
                aktiveArbeidsforhold={args.aktiveArbeidsforhold}
                erEndringssøknad={args.erEndringssøknad}
            >
                <UttaksplanRedigeringProvider
                    oppdaterUttaksplan={handleOnPlanChange}
                    harEndretPlan={perioder !== undefined}
                >
                    <UttaksplanKalender
                        readOnly={false}
                        scrollToKvoteOppsummering={action('button-click')}
                        barnehagestartdato={args.barnehagestartdato}
                    />
                </UttaksplanRedigeringProvider>
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<ComponentProps<typeof UttaksplanDataProvider> & ComponentProps<typeof UttaksplanKalender>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering: Story = {
    args: {
        perioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                søker: { kontoType: 'MØDREKVOTE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                søker: { utsettelseÅrsak: 'FERIE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-27',
                søker: {
                    forelder: 'MOR',
                    kontoType: 'FELLESPERIODE',
                    gradering: {
                        aktivitet: {
                            type: 'ANNET',
                        },
                        arbeidstidprosent: 50,
                    },
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', samtidigUttak: 50, flerbarnsdager: false },
                annenPart: {
                    kontoType: 'FEDREKVOTE',
                    forelder: 'FAR_MEDMOR',
                    samtidigUttak: 50,
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                annenPart: { kontoType: 'FEDREKVOTE', forelder: 'FAR_MEDMOR', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        barnehagestartdato: '2024-12-14',
        erEndringssøknad: false,
    },
};

export const SkalHaPeriodeMedFratrekkForPleiepenger: Story = {
    args: {
        perioder: [
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-17',
                tom: '2024-04-23',
                søker: {
                    kontoType: 'FELLESPERIODE',
                    forelder: 'MOR',
                    resultat: {
                        innvilget: false,
                        trekkerDager: true,
                        trekkerMinsterett: false,
                        årsak: 'AVSLAG_FRATREKK_PLEIEPENGER',
                    },
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2024-04-24',
                tom: '2024-04-29',
                søker: {
                    kontoType: 'FELLESPERIODE',
                    forelder: 'MOR',
                    resultat: {
                        innvilget: false,
                        trekkerDager: true,
                        trekkerMinsterett: false,
                        årsak: 'ANNET',
                    },
                    flerbarnsdager: false,
                },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const FarSøkerMedTapteDagerOgFerie: Story = {
    args: {
        perioder: [
            {
                fom: '2021-07-29',
                tom: '2021-08-16',
                søker: { forelder: 'FAR_MEDMOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
            {
                fom: '2021-09-01',
                tom: '2021-09-14',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
            },
            {
                fom: '2021-09-17',
                tom: '2021-09-30',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
            },
            {
                fom: '2021-10-13',
                tom: '2021-10-29',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-05-31'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const MorSøkerMedFlereUtsettelser: Story = {
    args: {
        perioder: [
            {
                fom: '2021-05-31',
                tom: '2021-06-14',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
            },
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-05-31'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const FarSøkerMedSamtidigUttakMorUtsettelseMorOgGradering: Story = {
    args: {
        perioder: [
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', samtidigUttak: 100, flerbarnsdager: false },
                annenPart: { kontoType: 'MØDREKVOTE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2024-06-14',
                tom: '2024-07-02',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                    gradering: {
                        aktivitet: {
                            type: 'FRILANS',
                        },
                        arbeidstidprosent: 50,
                    },
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                annenPart: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-19',
                tom: '2024-05-16',
                annenPart: { kontoType: 'FELLESPERIODE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                annenPart: { utsettelseÅrsak: 'FERIE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-24',
                tom: '2024-05-30',
                annenPart: { kontoType: 'FELLESPERIODE', forelder: 'MOR', flerbarnsdager: false },
            },
        ],
        barn: {
            type: BarnType.UFØDT,
            termindato: '2024-04-04',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const UtsettelseMorFerieMedFarsUtsettelse: Story = {
    args: {
        perioder: [
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
            {
                fom: '2021-06-29',
                tom: '2021-07-28',
                annenPart: { forelder: 'FAR_MEDMOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-06-14'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const MorAvslåttPeriodeFørste6UkeneGirTapteDager: Story = {
    args: {
        perioder: [
            {
                fom: '2023-06-12',
                tom: '2023-06-30',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2023-07-03',
                tom: '2023-07-07',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    forelder: 'MOR',
                    resultat: {
                        innvilget: false,
                        trekkerDager: false,
                        trekkerMinsterett: false,
                        årsak: 'AVSLAG_UTSETTELSE_TILBAKE_I_TID',
                    },
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2023-07-10',
                tom: '2024-05-17',
                søker: { kontoType: 'FORELDREPENGER', forelder: 'MOR', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-07-01'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: true,
    },
};

export const MorAvslåttPeriodeUtenTapteDager: Story = {
    args: {
        perioder: [
            {
                fom: '2023-06-12',
                tom: '2023-06-30',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2023-07-03',
                tom: '2024-05-17',
                søker: { kontoType: 'FORELDREPENGER', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-18',
                tom: '2024-07-07',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    forelder: 'MOR',
                    resultat: {
                        innvilget: false,
                        trekkerDager: false,
                        trekkerMinsterett: false,
                        årsak: 'AVSLAG_UTSETTELSE_TILBAKE_I_TID',
                    },
                    flerbarnsdager: false,
                },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-07-01'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: true,
    },
};

export const KortPeriodeMedHelg: Story = {
    args: {
        perioder: [
            {
                fom: '2024-05-24',
                tom: '2024-05-27',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2024-05-23'],
            adopsjonsdato: '2024-05-23',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const KortPeriodeMedHelgFødsel: Story = {
    args: {
        perioder: [
            {
                fom: '2024-05-24',
                tom: '2024-05-27',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-05-23'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const KortPeriodeUtenHelg: Story = {
    args: {
        perioder: [
            {
                fom: '2024-05-22',
                tom: '2024-05-24',
                annenPart: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const TreSammenhengendePerioderSlåttSammen: Story = {
    args: {
        perioder: [
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2024-05-28',
                tom: '2024-06-06',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2024-06-07',
                tom: '2024-06-12',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const MorOppgirSamtidigUttakMedFar: Story = {
    args: {
        perioder: [
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', samtidigUttak: 50, flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const MorOppgirSamtidigUttakMedMedmor: Story = {
    args: {
        perioder: [
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', samtidigUttak: 50, flerbarnsdager: false },
                annenPart: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'MØDREKVOTE',
                    samtidigUttak: 50,
                    flerbarnsdager: false,
                },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-05-21'],
            adopsjonsdato: '2024-05-21',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Grete' },
            erMedmorDelAvSøknaden: true,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const FarOppgirSamtidigUttakMedMor: Story = {
    args: {
        perioder: [
            {
                fom: '2025-05-21',
                tom: '2025-05-27',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', samtidigUttak: 70, flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2025-05-21'],
            adopsjonsdato: '2025-05-21',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const FellesPeriodeForMorOgSamtidigUttak: Story = {
    args: {
        perioder: [
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                søker: { kontoType: 'MØDREKVOTE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-18',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', samtidigUttak: 50, flerbarnsdager: false },
                annenPart: {
                    kontoType: 'FELLESPERIODE',
                    forelder: 'FAR_MEDMOR',
                    samtidigUttak: 50,
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2024-06-19',
                tom: '2024-07-15',
                annenPart: { kontoType: 'FELLESPERIODE', forelder: 'FAR_MEDMOR', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const HarPeriode11UkerFørFamiliehendelseDato: Story = {
    args: {
        ...MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering.args,
        perioder: [
            {
                fom: '2024-01-18',
                tom: '2024-02-23',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },

            ...MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering.args.perioder,
        ] satisfies PeriodeDto_fpoversikt[],
    },
};

export const VisFarsAktivitetsfriKvote: Story = {
    args: {
        perioder: [
            {
                fom: '2024-06-14',
                tom: '2024-06-18',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    forelder: 'FAR_MEDMOR',
                    morsAktivitet: 'IKKE_OPPGITT',
                    gradering: {
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                        },
                        arbeidstidprosent: 50,
                    },
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2024-06-19',
                tom: '2024-07-15',
                søker: {
                    kontoType: 'FORELDREPENGER',
                    forelder: 'FAR_MEDMOR',
                    morsAktivitet: 'IKKE_OPPGITT',
                    flerbarnsdager: false,
                },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        valgtStønadskvote: {
            kontoer: [
                { konto: 'AKTIVITETSFRI_KVOTE', dager: 75 },
                { konto: 'FORELDREPENGER', dager: 125 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
    },
};

export const VisPerioderMedOppholdsårsakKorrekt: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-12-09'],
            antallBarn: 1,
        },
        perioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-08',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-09',
                tom: '2024-12-13',
                søker: { kontoType: 'MØDREKVOTE', flerbarnsdager: false, forelder: 'MOR' },
            },
            {
                fom: '2024-12-16',
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
                tom: '2025-09-29',
                annenPart: { kontoType: 'FELLESPERIODE', flerbarnsdager: false, forelder: 'FAR_MEDMOR' },
            },
            {
                fom: '2025-09-30',
                tom: '2025-10-15',
                søker: { kontoType: 'MØDREKVOTE', flerbarnsdager: false, forelder: 'MOR' },
            },
        ],
        erEndringssøknad: false,
    },
};

export const MorOverførerFarsKvote: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-01-21'],
            termindato: '2026-01-21',
            antallBarn: 1,
        },
        perioder: [
            {
                fom: '2025-12-31',
                tom: '2026-01-20',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2026-01-21',
                tom: '2026-05-05',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2026-05-06',
                tom: '2026-08-25',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2026-08-26',
                tom: '2026-12-08',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ],
        erEndringssøknad: false,
    },
};

export const MorSøkerOgFarHarEøsPeriode: Story = {
    args: {
        perioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                søker: { kontoType: 'MØDREKVOTE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                søker: { utsettelseÅrsak: 'FERIE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            { fom: '2024-07-03', tom: '2024-07-15', annenPartEøs: { kontoType: 'FEDREKVOTE', trekkdager: 10 } },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const FarSøkerOgMorHarEøsPeriode: Story = {
    args: {
        perioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                annenPart: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                annenPartEøs: { kontoType: 'MØDREKVOTE', trekkdager: 10 },
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                annenPart: { utsettelseÅrsak: 'FERIE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                annenPartEøs: { kontoType: 'FEDREKVOTE', trekkdager: 10 },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const MorSøkerOgMedmorHarEøsPeriode: Story = {
    args: {
        perioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                søker: { kontoType: 'MØDREKVOTE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                søker: { utsettelseÅrsak: 'FERIE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                annenPartEøs: { kontoType: 'FEDREKVOTE', trekkdager: 10 },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: true,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const MarkerPeriodeNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt: Story = {
    args: {
        perioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                annenPart: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                annenPart: { kontoType: 'MØDREKVOTE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                annenPart: { utsettelseÅrsak: 'FERIE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
    },
};

export const SamtidigUttak: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-01-21'],
            termindato: '2026-01-21',
            antallBarn: 1,
        },
        perioder: [
            {
                fom: '2025-12-31',
                tom: '2026-01-20',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2026-01-21',
                tom: '2026-05-05',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2026-05-06',
                tom: '2026-08-25',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2026-08-26',
                tom: '2026-12-08',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ],
        erEndringssøknad: false,
    },
};

export const FarSøkerEtterAtMorHarSøkt: Story = {
    args: {
        perioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                annenPart: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                annenPart: { kontoType: 'MØDREKVOTE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                annenPart: { utsettelseÅrsak: 'FERIE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-27',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'FELLESPERIODE',
                    gradering: {
                        aktivitet: {
                            type: 'ANNET',
                        },
                        arbeidstidprosent: 50,
                    },
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE', samtidigUttak: 50, flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erPeriodeneTilAnnenPartLåst: true,
        erEndringssøknad: false,
    },
};

export const FarsUttakMorForSyk: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-01-21'],
            termindato: '2026-01-21',
            antallBarn: 1,
        },
        perioder: [
            {
                fom: '2025-12-31',
                tom: '2026-01-20',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2026-01-21',
                tom: '2026-05-05',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2026-05-06',
                tom: '2026-08-25',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2026-08-26',
                tom: '2026-12-08',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ],
        erEndringssøknad: false,
    },
};

export const MedArbeidsforhold: Story = {
    args: {
        ...MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering.args,
        aktiveArbeidsforhold: [
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: '1',
                stillingsprosent: 100,
                arbeidsgiverNavn: 'NAV',
                fom: '2024-01-01',
            },
            {
                arbeidsgiverId: '2',
                arbeidsgiverIdType: '2',
                stillingsprosent: 80,
                arbeidsgiverNavn: 'Bedrift AS',
                fom: '2024-01-01',
            },
        ],
    },
};

export const HarUtsettelse: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-01-21'],
            termindato: '2026-01-21',
            antallBarn: 1,
        },
        perioder: [
            {
                fom: '2025-12-31',
                tom: '2026-01-20',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2026-01-21',
                tom: '2026-01-22',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2026-01-23',
                tom: '2026-01-29',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'BARN_INNLAGT', flerbarnsdager: false },
            },
            {
                fom: '2026-01-30',
                tom: '2026-05-05',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ],
        erEndringssøknad: false,
    },
};

export const FlerbarnMorOgFar: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-01-21'],
            termindato: '2026-01-21',
            antallBarn: 2,
        },
        perioder: [
            {
                fom: '2025-12-31',
                tom: '2026-01-20',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2026-01-21',
                tom: '2026-05-05',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2026-05-06',
                tom: '2026-08-25',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2026-08-26',
                tom: '2026-12-08',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ],
        erEndringssøknad: false,
    },
};

export const SkalIkkeViseAvslåttePerioderSomOverlapperMedAndrePerioder: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-05-06'],
            termindato: '2025-05-06',
            antallBarn: 2,
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
                tom: '2025-05-19',
                søker: {
                    kontoType: 'FEDREKVOTE',
                    resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                    samtidigUttak: 100,
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
                annenPart: {
                    kontoType: 'MØDREKVOTE',
                    resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                    flerbarnsdager: false,
                    forelder: 'MOR',
                    samtidigUttak: 100,
                },
            },
            {
                fom: '2025-05-20',
                tom: '2025-08-18',
                annenPart: {
                    kontoType: 'MØDREKVOTE',
                    resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
            },
            {
                fom: '2025-08-19',
                tom: '2025-11-30',
                annenPart: {
                    kontoType: 'FELLESPERIODE',
                    resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
            },
            {
                fom: '2025-12-01',
                tom: '2025-12-08',
                søker: {
                    kontoType: 'FEDREKVOTE',
                    resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
                annenPart: {
                    kontoType: 'FELLESPERIODE',
                    resultat: { innvilget: false, trekkerMinsterett: false, trekkerDager: false, årsak: 'ANNET' },
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
            },
            {
                fom: '2025-12-09',
                tom: '2026-01-30',
                søker: {
                    kontoType: 'FEDREKVOTE',
                    resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
        ],
        erEndringssøknad: true,
    },
};

export const KunFarHarRettOgHarPauseperiode: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        perioder: [
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                søker: { kontoType: 'FEDREKVOTE', forelder: 'FAR_MEDMOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-24',
                tom: '2024-05-28',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    utsettelseÅrsak: 'FRI',
                    morsAktivitet: 'ARBEID_OG_UTDANNING',
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        erEndringssøknad: false,
    },
};

export const SkalViseAvslåttPeriodeKorrekt: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-02-09'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
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
        ] satisfies PeriodeDto_fpoversikt[],
        erEndringssøknad: true,
    },
};

export const SkalViseGradertePeriodeForAnnenPartSomErLåst: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-08-19'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        aktiveArbeidsforhold: [
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: '1',
                stillingsprosent: 100,
                arbeidsgiverNavn: 'NAV',
                fom: '2024-01-01',
            },
        ],
        erPeriodeneTilAnnenPartLåst: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        perioder: [
            {
                fom: '2025-07-29',
                tom: '2025-08-18',
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
                fom: '2025-08-19',
                tom: '2025-12-01',
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
                fom: '2025-12-02',
                tom: '2025-12-31',
                annenPart: {
                    kontoType: 'FELLESPERIODE',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    gradering: {
                        arbeidstidprosent: 50,
                    },
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
            },
            {
                fom: '2026-01-01',
                tom: '2026-03-31',
                søker: {
                    kontoType: 'FEDREKVOTE',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    samtidigUttak: 50,
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
                annenPart: {
                    kontoType: 'FELLESPERIODE',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    gradering: {
                        arbeidstidprosent: 50,
                    },
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
            },
            {
                fom: '2026-04-01',
                tom: '2026-06-30',
                annenPart: {
                    kontoType: 'FELLESPERIODE',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    gradering: {
                        arbeidstidprosent: 50,
                    },
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
            },
            {
                fom: '2026-07-01',
                tom: '2026-07-07',
                annenPart: {
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
        ] satisfies PeriodeDto_fpoversikt[],
        erEndringssøknad: true,
    },
};

export const SkalIkkeMarkereAvslåttePerioderMedVarselOmMorsAktivitet: Story = {
    args: {
        perioder: [
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FELLESPERIODE',
                    flerbarnsdager: false,
                    resultat: {
                        innvilget: false,
                        trekkerDager: true,
                        trekkerMinsterett: false,
                        årsak: 'ANNET',
                    },
                },
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-20',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FELLESPERIODE',
                    flerbarnsdager: false,
                    resultat: {
                        innvilget: false,
                        trekkerDager: true,
                        trekkerMinsterett: false,
                        årsak: 'AVSLAG_FRATREKK_PLEIEPENGER',
                    },
                },
            },
        ],
        barn: {
            type: BarnType.UFØDT,
            termindato: '2024-04-04',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: true,
    },
};

export const MarkerPeriodeNårGraderingsaktivitetMangler: Story = {
    args: {
        perioder: [
            {
                fom: '2027-01-04',
                tom: '2027-05-28',
                søker: {
                    kontoType: 'FELLESPERIODE',
                    forelder: 'MOR',
                    samtidigUttak: 40,
                    gradering: {
                        arbeidstidprosent: 60,
                        aktivitet: { type: 'ANNET' },
                    },
                    flerbarnsdager: false,
                },
                annenPart: {
                    kontoType: 'FEDREKVOTE',
                    forelder: 'FAR_MEDMOR',
                    samtidigUttak: 100,
                    flerbarnsdager: false,
                },
            },
        ] satisfies PeriodeDto_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-12-01'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Olga', farMedmor: 'Espen' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        erEndringssøknad: false,
        aktiveArbeidsforhold: [],
    },
};
