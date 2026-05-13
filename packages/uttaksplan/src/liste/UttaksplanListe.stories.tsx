import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { action } from 'storybook/actions';

import { BarnType } from '@navikt/fp-constants';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider } from '../context/UttaksplanRedigeringContext';
import { UttaksplanListe } from './UttaksplanListe';

type AllePerioder = Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

const meta = {
    component: UttaksplanListe,
    args: {
        children: null,
        harAktivitetskravIPeriodeUtenUttak: false,
        oppdaterUttaksplan: action('button-click'),
        harEndretPlan: false,
        isReadOnly: false,
        erPeriodeneTilAnnenPartLåst: false,
    },
    render: (args) => {
        const [perioder, setPerioder] = useState<AllePerioder | undefined>(args.uttakPerioder);

        const handleOnPlanChange = (oppdatertePerioder: AllePerioder | undefined) => {
            setPerioder(oppdatertePerioder);

            if (args.oppdaterUttaksplan) {
                args.oppdaterUttaksplan(oppdatertePerioder);
            }
        };

        return (
            <UttaksplanDataProvider {...args} uttakPerioder={perioder ?? []}>
                <UttaksplanRedigeringProvider
                    oppdaterUttaksplan={handleOnPlanChange}
                    harEndretPlan={perioder !== undefined}
                >
                    <UttaksplanListe isReadOnly={args.isReadOnly} />
                </UttaksplanRedigeringProvider>
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<
    ComponentProps<typeof UttaksplanListe> &
        ComponentProps<typeof UttaksplanDataProvider> &
        ComponentProps<typeof UttaksplanRedigeringProvider>
>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: {
                mor: 'Olga Utvikler',
                farMedmor: 'Espen Utvikler',
            },
            erMedmorDelAvSøknaden: false,
        },
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-05-09'],
            antallBarn: 1,
            termindato: '2025-05-09',
        },
        uttakPerioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2025-05-09',
                tom: '2025-08-21',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
                flerbarnsdager: false,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-12',
                tom: '2026-03-26',
                flerbarnsdager: false,
            },
        ],
        harAktivitetskravIPeriodeUtenUttak: false,
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
    },
};

export const MorOgMedmor: Story = {
    args: {
        ...Default.args,
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: {
                mor: 'Olga Utvikler',
                farMedmor: 'Helga Utvikler',
            },
            erMedmorDelAvSøknaden: true,
        },
    },
};

export const MorOgFarMedFerieopphold: Story = {
    args: {
        ...Default.args,
        uttakPerioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2025-05-09',
                tom: '2025-08-21',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                fom: '2025-12-12',
                tom: '2025-12-15',
                flerbarnsdager: false,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-16',
                tom: '2026-03-30',
                flerbarnsdager: false,
            },
        ],
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: {
                mor: 'Olga Utvikler',
                farMedmor: 'Espen Utvikler',
            },
            erMedmorDelAvSøknaden: false,
        },
        erEndringssøknad: false,
    },
};

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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
    },
};
export const HullperiodeOverFamiliehendelsesdato: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-01',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-03',
                tom: '2024-05-15',
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
    },
};

export const VisPerioderMedOppholdsårsakKorrekt: Story = {
    args: {
        ...HullperiodeOverFamiliehendelsesdato.args,
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
        erEndringssøknad: false,
    },
};

export const FarSøkerOmsorgsovertakelse: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
            navnPåForeldre: {
                mor: 'Olga Utvikler',
                farMedmor: 'Espen Utvikler',
            },
            erMedmorDelAvSøknaden: false,
        },
        barn: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2022-05-09'],
            antallBarn: 1,
            adopsjonsdato: '2025-05-09',
        },
        uttakPerioder: [
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'MØDREKVOTE',
                fom: '2025-05-09',
                tom: '2025-08-21',
                flerbarnsdager: false,
            },
        ],
        harAktivitetskravIPeriodeUtenUttak: false,
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
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
                kontoType: 'FEDREKVOTE',
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
                flerbarnsdager: false,
                kontoType: 'FELLESPERIODE',
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
    },
};

export const MarkeringNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt: Story = {
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
    },
};

export const HarAvslåttePerioder: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: {
                farMedmor: 'Annen forelder',
                mor: 'Avansert',
            },
            erMedmorDelAvSøknaden: false,
        },
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-08-13'],
            termindato: '2025-10-19',
            antallBarn: 1,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        uttakPerioder: [
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
        erEndringssøknad: true,
    },
};

export const HarUtsettelse: Story = {
    args: {
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: {
                farMedmor: 'Annen forelder',
                mor: 'Avansert',
            },
            erMedmorDelAvSøknaden: false,
        },
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-08-13'],
            termindato: '2025-10-19',
            antallBarn: 1,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        uttakPerioder: [
            {
                fom: '2025-08-15',
                tom: '2025-08-25',
                forelder: 'MOR',
                utsettelseÅrsak: 'BARN_INNLAGT',
                flerbarnsdager: false,
            },
        ],
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
        erEndringssøknad: false,
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: false,
    },
};

export const EøsPerioderForAnnenPart: Story = {
    args: {
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
        uttakPerioder: [
            { fom: '2025-05-06', tom: '2025-10-08', kontoType: 'MØDREKVOTE', trekkdager: 75 },
            {
                fom: '2025-12-09',
                tom: '2025-12-24',
                kontoType: 'FEDREKVOTE',
                resultat: { innvilget: false, trekkerMinsterett: false, trekkerDager: false, årsak: 'ANNET' },
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            { fom: '2025-10-16', tom: '2025-12-24', kontoType: 'FELLESPERIODE', trekkdager: 50 },
            {
                fom: '2025-12-25',
                tom: '2026-03-23',
                kontoType: 'FEDREKVOTE',
                resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ] satisfies Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: true,
    },
};

export const SkalIkkeMarkereAvslåttePerioderMedVarselOmMorsAktivitet: Story = {
    args: {
        uttakPerioder: [
            {
                fom: '2024-04-04',
                tom: '2024-04-18',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
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
            {
                fom: '2024-06-14',
                tom: '2024-06-20',
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: true,
    },
};

export const BareFarHarRettMedAvslåttePerioder: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-03-09'],
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
                fom: '2026-03-09',
                tom: '2026-05-15',
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
                fom: '2026-05-18',
                tom: '2026-06-12',
                kontoType: 'FORELDREPENGER',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2026-06-15',
                tom: '2026-07-10',
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
                { konto: 'FORELDREPENGER', dager: 150 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: true,
    },
};

export const BeggeRettMedAvslåttMødrekvote: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-01-05'],
            antallBarn: 1,
        },
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'MOR',
            navnPåForeldre: { mor: 'Kari', farMedmor: 'Ola' },
            erMedmorDelAvSøknaden: false,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        uttakPerioder: [
            {
                fom: '2026-01-05',
                tom: '2026-03-20',
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
            {
                fom: '2026-03-23',
                tom: '2026-06-30',
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        ] satisfies Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
        valgtStønadskvote: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 75 },
                { konto: 'FEDREKVOTE', dager: 75 },
                { konto: 'FELLESPERIODE', dager: 80 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: true,
    },
};

export const BareFarHarRettMedAvslåttUtsettelse: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-01-05'],
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
                fom: '2026-01-05',
                tom: '2026-05-15',
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
                fom: '2026-05-18',
                tom: '2026-06-12',
                utsettelseÅrsak: 'FRI',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'AVSLAG_UTSETTELSE_TILBAKE_I_TID',
                },
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2026-06-15',
                tom: '2026-07-10',
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
        valgtStønadskvote: {
            kontoer: [
                { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
                { konto: 'FORELDREPENGER', dager: 150 },
            ],
            minsteretter: MINSTERETTER,
        },
        erEndringssøknad: true,
    },
};
