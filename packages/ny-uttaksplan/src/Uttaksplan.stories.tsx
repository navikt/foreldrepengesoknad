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
        erMedmorDelAvSøknaden: false,
        modus: 'planlegger',
        harAktivitetskravIPeriodeUtenUttak: false,
        oppdaterUttaksplan: action('button-click'),
        harEndretPlan: false,
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
                    <UttaksplanNy />
                </UttaksplanRedigeringProvider>
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<ComponentProps<typeof UttaksplanDataProvider> & ComponentProps<typeof UttaksplanRedigeringProvider>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        erFarEllerMedmor: false,
        søker: 'mor',
        navnPåForeldre: {
            mor: 'Olga Utvikler',
            farMedmor: 'Espen Utvikler',
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
        bareFarMedmorHarRett: false,
        erDeltUttak: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        modus: 'planlegger',
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        aleneOmOmsorg: false,
    },
};

export const MorOgMedmor: Story = {
    args: {
        ...Default.args,
        erFarEllerMedmor: true,
        erMedmorDelAvSøknaden: true,
        navnPåForeldre: {
            mor: 'Olga Utvikler',
            farMedmor: 'Helga Utvikler',
        },
        erDeltUttak: true,
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
        erDeltUttak: true,
    },
};
