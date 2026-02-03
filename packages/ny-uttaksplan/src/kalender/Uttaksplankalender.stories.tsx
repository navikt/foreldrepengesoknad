import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { action } from 'storybook/actions';

import { BarnType } from '@navikt/fp-constants';
import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

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
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        children: null,
    },
    render: (args) => {
        const [perioder, setPerioder] = useState<UttakPeriode_fpoversikt[] | undefined>(args.uttakPerioder);

        const handleOnPlanChange = (oppdatertePerioder: UttakPeriode_fpoversikt[] | undefined) => {
            setPerioder(oppdatertePerioder);
        };

        return (
            <UttaksplanDataProvider
                barn={args.barn}
                valgtStønadskonto={args.valgtStønadskonto}
                foreldreInfo={args.foreldreInfo}
                harAktivitetskravIPeriodeUtenUttak={false}
                uttakPerioder={perioder ?? []}
            >
                <UttaksplanRedigeringProvider
                    oppdaterUttaksplan={handleOnPlanChange}
                    harEndretPlan={perioder !== undefined}
                >
                    <UttaksplanKalender readOnly={false} scrollToKvoteOppsummering={action('button-click')} />
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
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
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
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                samtidigUttak: 50,
            },
            {
                fom: '2024-06-28',
                tom: '2024-07-02',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 50,
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
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

export const SkalHaPeriodeMedFratrekkForPleiepenger: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                resultat: {
                    innvilget: false,
                    trekkerDager: false,
                    trekkerMinsterett: false,
                    årsak: 'AVSLAG_FRATREKK_PLEIEPENGER',
                },
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

export const FarSøkerMedTapteDagerOgUtsettelse: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2021-05-31',
                tom: '2021-06-14',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
            },
            {
                fom: '2021-06-29',
                tom: '2021-07-16',
                forelder: 'FAR_MEDMOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            },
        ] satisfies UttakPeriode_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-05-31'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_ELLER_MEDMOR',
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
            },
            {
                fom: '2021-06-15',
                tom: '2021-06-28',
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
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
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
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
            },
            {
                fom: '2024-03-15',
                tom: '2024-04-03',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
            },
            {
                fom: '2024-04-19',
                tom: '2024-05-16',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                forelder: 'MOR',
            },
            {
                fom: '2024-05-24',
                tom: '2024-05-30',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
            },
        ],
        barn: {
            type: BarnType.UFØDT,
            termindato: '2024-04-04',
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_ELLER_MEDMOR',
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
            },
            {
                fom: '2021-06-29',
                tom: '2021-07-28',
                forelder: 'FAR_MEDMOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
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
            },
            {
                fom: '2023-07-10',
                tom: '2024-05-17',
                kontoType: 'FORELDREPENGER',
                forelder: 'MOR',
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
            },
            {
                fom: '2023-07-03',
                tom: '2024-05-17',
                kontoType: 'FORELDREPENGER',
                forelder: 'MOR',
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
            },
        ] satisfies UttakPeriode_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-07-01'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_ELLER_MEDMOR',
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
            søker: 'FAR_ELLER_MEDMOR',
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
            },
            {
                fom: '2024-05-28',
                tom: '2024-06-06',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
            },
            {
                fom: '2024-06-07',
                tom: '2024-06-12',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
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
            },
            {
                fom: '2024-05-21',
                tom: '2024-05-27',
                forelder: 'FAR_MEDMOR',
                kontoType: 'MØDREKVOTE',
                samtidigUttak: 50,
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
            søker: 'FAR_ELLER_MEDMOR',
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
            },
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-18',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                samtidigUttak: 50,
            },
            {
                fom: '2024-06-14',
                tom: '2024-06-18',
                kontoType: 'FELLESPERIODE',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 50,
            },
            {
                fom: '2024-06-19',
                tom: '2024-07-15',
                kontoType: 'FELLESPERIODE',
                forelder: 'FAR_MEDMOR',
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
            },

            ...MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering.args.uttakPerioder,
        ] satisfies UttakPeriode_fpoversikt[],
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
            },
            {
                fom: '2024-06-19',
                tom: '2024-07-15',
                kontoType: 'FORELDREPENGER',
                forelder: 'FAR_MEDMOR',
                morsAktivitet: 'IKKE_OPPGITT',
            },
        ] satisfies UttakPeriode_fpoversikt[],
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-04-04'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_ELLER_MEDMOR',
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
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2026-01-21',
                tom: '2026-05-05',
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2026-05-06',
                tom: '2026-08-25',
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2026-08-26',
                tom: '2026-12-08',
            },
        ],
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
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2026-01-21',
                tom: '2026-05-05',
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2026-05-06',
                tom: '2026-08-25',
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2026-08-26',
                tom: '2026-12-08',
            },
        ],
    },
};
