import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { action } from 'storybook/actions';

import { BarnType } from '@navikt/fp-constants';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider } from '../context/UttaksplanRedigeringContext';
import { UttaksplanKalender } from './UttaksplanKalender';

type AllePerioder = Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

const meta = {
    title: 'UttaksplanKalender',
    component: UttaksplanKalender,
    args: {
        readOnly: false,
        valgtStønadskonto: {
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
        const [perioder, setPerioder] = useState<AllePerioder | undefined>(args.uttakPerioder);

        const handleOnPlanChange = (oppdatertePerioder: AllePerioder | undefined) => {
            setPerioder(oppdatertePerioder);
        };

        return (
            <UttaksplanDataProvider
                barn={args.barn}
                valgtStønadskonto={args.valgtStønadskonto}
                foreldreInfo={args.foreldreInfo}
                harAktivitetskravIPeriodeUtenUttak={false}
                uttakPerioder={perioder ?? []}
                erPeriodeneTilAnnenPartLåst={args.erPeriodeneTilAnnenPartLåst}
                aktiveArbeidsforhold={args.aktiveArbeidsforhold}
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
        uttakPerioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-27',
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
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const SkalHaPeriodeMedFratrekkForPleiepenger: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-17',
                tom: '2024-04-23',
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
            {
                fom: '2024-04-24',
                tom: '2024-04-29',
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
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const FarSøkerMedTapteDagerOgFerie: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2021-07-29',
                tom: '2021-08-16',
                forelder: 'FAR_MEDMOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
            },
            {
                fom: '2021-09-01',
                tom: '2021-09-14',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
            },
            {
                fom: '2021-09-17',
                tom: '2021-09-30',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
            },
            {
                fom: '2021-10-13',
                tom: '2021-10-29',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const MorSøkerMedFlereUtsettelser: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2021-05-31',
                tom: '2021-06-14',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER',
                flerbarnsdager: false,
            },
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};
export const FarSøkerMedSamtidigUttakMorUtsettelseMorOgGradering: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                samtidigUttak: 100,
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-06-14',
                tom: '2024-07-02',
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
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-19',
                tom: '2024-05-16',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-24',
                tom: '2024-05-30',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                flerbarnsdager: false,
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
    },
};

export const UtsettelseMorFerieMedFarsUtsettelse: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
            },
            {
                fom: '2021-06-29',
                tom: '2021-07-28',
                forelder: 'FAR_MEDMOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const MorAvslåttPeriodeFørste6UkeneGirTapteDager: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2023-06-12',
                tom: '2023-06-30',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            {
                fom: '2023-07-03',
                tom: '2023-07-07',
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
            {
                fom: '2023-07-10',
                tom: '2024-05-17',
                kontoType: 'FORELDREPENGER',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const MorAvslåttPeriodeUtenTapteDager: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2023-06-12',
                tom: '2023-06-30',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2023-07-03',
                tom: '2024-05-17',
                kontoType: 'FORELDREPENGER',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-18',
                tom: '2024-07-07',
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
        ] satisfies UttakPeriode_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-07-01'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
    },
};

export const KortPeriodeMedHelg: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-05-24',
                tom: '2024-05-27',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const KortPeriodeMedHelgFødsel: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-05-24',
                tom: '2024-05-27',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const KortPeriodeUtenHelg: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-05-22',
                tom: '2024-05-24',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const TreSammenhengendePerioderSlåttSammen: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-28',
                tom: '2024-06-06',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-06-07',
                tom: '2024-06-12',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const MorOppgirSamtidigUttakMedFar: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const MorOppgirSamtidigUttakMedMedmor: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                forelder: 'FAR_MEDMOR',
                kontoType: 'MØDREKVOTE',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const FarOppgirSamtidigUttakMedMor: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2025-05-21',
                tom: '2025-05-27',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                samtidigUttak: 70,
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const FellesPeriodeForMorOgSamtidigUttak: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-18',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-18',
                kontoType: 'FELLESPERIODE',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
            {
                fom: '2024-06-19',
                tom: '2024-07-15',
                kontoType: 'FELLESPERIODE',
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
    },
};

export const HarPeriode11UkerFørFamiliehendelseDato: Story = {
    args: {
        ...MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering.args,
        uttakPerioder: [
            {
                fom: '2024-01-18',
                tom: '2024-02-23',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },

            ...MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering.args.uttakPerioder,
        ] satisfies AllePerioder,
    },
};

export const VisFarsAktivitetsfriKvote: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-06-14',
                tom: '2024-06-18',
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
            {
                fom: '2024-06-19',
                tom: '2024-07-15',
                kontoType: 'FORELDREPENGER',
                forelder: 'FAR_MEDMOR',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
        valgtStønadskonto: {
            kontoer: [
                { konto: 'AKTIVITETSFRI_KVOTE', dager: 75 },
                { konto: 'FORELDREPENGER', dager: 125 },
            ],
            minsteretter: MINSTERETTER,
        },
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
        uttakPerioder: [
            {
                fom: '2024-11-18',
                tom: '2024-12-08',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-09',
                tom: '2024-12-13',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2024-12-16',
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
                tom: '2025-07-25',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-07-28',
                tom: '2025-09-29',
                oppholdÅrsak: 'FELLESPERIODE_ANNEN_FORELDER',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-09-30',
                tom: '2025-10-15',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ],
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
        uttakPerioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-12-31',
                tom: '2026-01-20',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2026-01-21',
                tom: '2026-05-05',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2026-05-06',
                tom: '2026-08-25',
                flerbarnsdager: false,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2026-08-26',
                tom: '2026-12-08',
                flerbarnsdager: false,
            },
        ],
    },
};

export const MorSøkerOgFarHarEøsPeriode: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                kontoType: 'FEDREKVOTE',
                trekkdager: 10,
            },
        ] satisfies Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
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
    },
};

export const FarSøkerOgMorHarEøsPeriode: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                trekkdager: 10,
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                kontoType: 'FEDREKVOTE',
                trekkdager: 10,
                flerbarnsdager: false,
            },
        ] satisfies Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
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
    },
};

export const MorSøkerOgMedmorHarEøsPeriode: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                kontoType: 'FEDREKVOTE',
                trekkdager: 10,
                flerbarnsdager: false,
            },
        ] satisfies Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
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
    },
};

export const MarkerPeriodeNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
        uttakPerioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-12-31',
                tom: '2026-01-20',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2026-01-21',
                tom: '2026-05-05',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2026-05-06',
                tom: '2026-08-25',
                flerbarnsdager: false,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2026-08-26',
                tom: '2026-12-08',
                flerbarnsdager: false,
            },
        ],
    },
};

export const FarSøkerEtterAtMorHarSøkt: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-27',
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
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
        ] satisfies UttakPeriode_fpoversikt[],
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
        uttakPerioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-12-31',
                tom: '2026-01-20',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2026-01-21',
                tom: '2026-05-05',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2026-05-06',
                tom: '2026-08-25',
                flerbarnsdager: false,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2026-08-26',
                tom: '2026-12-08',
                flerbarnsdager: false,
            },
        ],
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
        uttakPerioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-12-31',
                tom: '2026-01-20',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2026-01-21',
                tom: '2026-01-22',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                fom: '2026-01-23',
                tom: '2026-01-29',
                utsettelseÅrsak: 'BARN_INNLAGT',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2026-01-30',
                tom: '2026-05-05',
                flerbarnsdager: false,
            },
        ],
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
        uttakPerioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-12-31',
                tom: '2026-01-20',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2026-01-21',
                tom: '2026-05-05',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2026-05-06',
                tom: '2026-08-25',
                flerbarnsdager: false,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2026-08-26',
                tom: '2026-12-08',
                flerbarnsdager: false,
            },
        ],
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
        uttakPerioder: [
            {
                fom: '2025-04-15',
                tom: '2025-05-05',
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
                fom: '2025-05-06',
                tom: '2025-05-19',
                kontoType: 'FEDREKVOTE',
                resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                samtidigUttak: 100,
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-05-06',
                tom: '2025-05-19',
                kontoType: 'MØDREKVOTE',
                resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                flerbarnsdager: false,
                forelder: 'MOR',
                samtidigUttak: 100,
            },
            {
                fom: '2025-05-20',
                tom: '2025-08-18',
                kontoType: 'MØDREKVOTE',
                resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-08-19',
                tom: '2025-11-30',
                kontoType: 'FELLESPERIODE',
                resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-12-01',
                tom: '2025-12-08',
                kontoType: 'FELLESPERIODE',
                resultat: { innvilget: false, trekkerMinsterett: false, trekkerDager: false, årsak: 'ANNET' },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2025-12-01',
                tom: '2026-01-30',
                kontoType: 'FEDREKVOTE',
                resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
    },
};

export const KunFarHarRettOgHarPausePeriode: Story = {
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
        uttakPerioder: [
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-24',
                tom: '2024-05-28',
                forelder: 'FAR_MEDMOR',
                utsettelseÅrsak: 'FRI',
                morsAktivitet: 'ARBEID_OG_UTDANNING',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ] satisfies Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
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
        uttakPerioder: [
            {
                fom: '2026-03-23',
                tom: '2026-05-29',
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
            {
                fom: '2026-06-01',
                tom: '2026-06-30',
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
            {
                fom: '2026-07-01',
                tom: '2026-07-17',
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
            {
                fom: '2026-07-20',
                tom: '2026-07-27',
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
        ] satisfies Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
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
        uttakPerioder: [
            {
                fom: '2025-07-29',
                tom: '2025-08-18',
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
                fom: '2025-08-19',
                tom: '2025-12-01',
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
                fom: '2025-12-02',
                tom: '2026-06-30',
                kontoType: 'FELLESPERIODE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                gradering: {
                    arbeidstidprosent: 50.0,
                },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2026-07-01',
                tom: '2026-07-07',
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
                fom: '2026-01-01',
                tom: '2026-03-31',
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
        ] satisfies Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    },
};
