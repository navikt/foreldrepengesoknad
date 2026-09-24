import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { action } from 'storybook/actions';

import { BarnType } from '@navikt/fp-constants';
import { PeriodeDto_fpoversikt } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider } from '../context/UttaksplanRedigeringContext';
import { UttaksplanListe } from './UttaksplanListe';

type AllePerioder = PeriodeDto_fpoversikt[];

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
        const [perioder, setPerioder] = useState<AllePerioder | undefined>(args.perioder);

        const handleOnPlanChange = (oppdatertePerioder: AllePerioder | undefined) => {
            setPerioder(oppdatertePerioder);

            if (args.oppdaterUttaksplan) {
                args.oppdaterUttaksplan(oppdatertePerioder);
            }
        };

        return (
            <UttaksplanDataProvider {...args} perioder={perioder ?? []}>
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
        perioder: [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-05-09',
                tom: '2025-08-21',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2025-08-22',
                tom: '2025-12-11',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-12',
                tom: '2026-03-26',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
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
        perioder: [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                annenPart: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-05-09',
                tom: '2025-08-21',
                annenPart: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2025-08-22',
                tom: '2025-12-11',
                annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-12',
                tom: '2026-03-26',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ],
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
        perioder: [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-05-09',
                tom: '2025-08-21',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2025-08-22',
                tom: '2025-12-11',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-12',
                tom: '2025-12-15',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-16',
                tom: '2026-03-30',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
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
        perioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-01',
                søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-03',
                tom: '2024-05-15',
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
        perioder: [
            {
                fom: '2025-05-09',
                tom: '2025-08-21',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
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
        perioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-03',
                annenPart: { kontoType: 'FORELDREPENGER_FØR_FØDSEL', forelder: 'MOR', flerbarnsdager: false },
            },
            { fom: '2024-04-04', tom: '2024-04-18', annenPartEøs: { kontoType: 'FEDREKVOTE', trekkdager: 10 } },
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                annenPart: { utsettelseÅrsak: 'FERIE', forelder: 'MOR', flerbarnsdager: false },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                annenPart: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'FELLESPERIODE' },
            },
            {
                fom: '2024-07-03',
                tom: '2024-07-15',
                søker: { kontoType: 'FEDREKVOTE', forelder: 'FAR_MEDMOR', flerbarnsdager: false },
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
        perioder: [
            {
                fom: '2025-08-15',
                tom: '2025-08-25',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'BARN_INNLAGT', flerbarnsdager: false },
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

export const KunFarHarRettOgUfødtBarn: Story = {
    args: {
        barn: {
            type: BarnType.UFØDT,
            termindato: '2024-04-04',
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
        perioder: [
            { fom: '2025-05-06', tom: '2025-10-08', annenPartEøs: { kontoType: 'MØDREKVOTE', trekkdager: 75 } },
            { fom: '2025-10-16', tom: '2025-12-24', annenPartEøs: { kontoType: 'FELLESPERIODE', trekkdager: 50 } },
            {
                fom: '2025-12-25',
                tom: '2026-03-23',
                søker: {
                    kontoType: 'FEDREKVOTE',
                    resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                },
            },
        ] satisfies PeriodeDto_fpoversikt[],
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
        perioder: [
            {
                fom: '2026-03-09',
                tom: '2026-05-15',
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
                fom: '2026-05-18',
                tom: '2026-06-12',
                søker: {
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
            },
            {
                fom: '2026-06-15',
                tom: '2026-07-10',
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

export const MarkeringNårGraderingsaktivitetMangler: Story = {
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
        aktiveArbeidsforhold: [],
    },
};
