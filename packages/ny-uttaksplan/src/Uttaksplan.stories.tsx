import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { action } from 'storybook/actions';

import { BarnType } from '@navikt/fp-constants';
import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { UttaksplanNy } from './Uttaksplan';
import { UttaksplanDataProvider } from './context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider } from './context/UttaksplanRedigeringContext';

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

const meta = {
    component: UttaksplanNy,
    args: {
        children: null,
        harAktivitetskravIPeriodeUtenUttak: false,
        oppdaterUttaksplan: action('button-click'),
        harEndretPlan: false,
        isReadOnly: false,
    },
    render: (args) => {
        const [perioder, setPerioder] = useState<UttakPeriode_fpoversikt[] | undefined>(args.saksperioder);

        const handleOnPlanChange = (oppdatertePerioder: UttakPeriode_fpoversikt[] | undefined) => {
            setPerioder(oppdatertePerioder);

            if (args.oppdaterUttaksplan) {
                args.oppdaterUttaksplan(oppdatertePerioder);
            }
        };

        return (
            <UttaksplanDataProvider {...args} saksperioder={perioder ?? []}>
                <UttaksplanRedigeringProvider
                    oppdaterUttaksplan={handleOnPlanChange}
                    harEndretPlan={perioder !== undefined}
                >
                    <UttaksplanNy isReadOnly={args.isReadOnly} />
                </UttaksplanRedigeringProvider>
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<
    ComponentProps<typeof UttaksplanNy> &
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
        saksperioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2025-05-09',
                tom: '2025-08-21',
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-12',
                tom: '2026-03-26',
            },
        ],
        harAktivitetskravIPeriodeUtenUttak: false,
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
    },
};

export const MorOgMedmor: Story = {
    args: {
        ...Default.args,
        foreldreInfo: {
            rettighetType: 'BEGGE_RETT',
            søker: 'FAR_ELLER_MEDMOR',
            navnPåForeldre: {
                mor: 'Olga Utvikler',
                farMedmor: 'Helga Utvikler',
            },
            erMedmorDelAvSøknaden: true,
        },
    },
};

export const MorOgFarMedFerieopphold: Story = {
    name: 'Mor og far, uten felles med ferieopphold',
    args: {
        ...Default.args,
        saksperioder: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2025-05-09',
                tom: '2025-08-21',
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
            },
            {
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                fom: '2025-12-12',
                tom: '2025-12-15',
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-16',
                tom: '2026-03-30',
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
    },
};

export const MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering: Story = {
    args: {
        saksperioder: [
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
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
    },
};
export const HullperiodeOverFamiliehendelsesdato: Story = {
    args: {
        saksperioder: [
            {
                fom: '2024-03-14',
                tom: '2024-04-01',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-05-03',
                tom: '2024-05-15',
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
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
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
        saksperioder: [
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
