import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';

import { BarnType } from '@navikt/fp-constants';
import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { UttaksplanNy } from './Uttaksplan';
import { UttaksplanDataProvider } from './context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider } from './context/UttaksplanRedigeringContext';

const meta = {
    title: 'Uttaksplan - Innsyn',
    component: UttaksplanNy,
    args: {
        children: null,
        erMedmorDelAvSøknaden: false,
    },
    render: (args) => {
        const [perioder, setPerioder] = useState<UttakPeriode_fpoversikt[] | undefined>(args.saksperioder);

        const handleOnPlanChange = (oppdatertePerioder: UttakPeriode_fpoversikt[] | undefined) => {
            setPerioder(oppdatertePerioder);
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
} satisfies Meta<ComponentProps<typeof UttaksplanDataProvider>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorAleneOmOmsorg: Story = {
    name: 'Mor er alene om omsorg',
    args: {
        bareFarMedmorHarRett: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-09-30'],
            termindato: '2025-10-07',
            antallBarn: 1,
        },
        aleneOmOmsorg: true,
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        modus: 'innsyn',
        navnPåForeldre: {
            farMedmor: 'Annen forelder',
            mor: 'Iris',
        },
        erDeltUttak: false,
        søker: 'mor',
        saksperioder: [
            {
                fom: '2025-09-16',
                tom: '2025-09-29',
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
                fom: '2025-09-30',
                tom: '2026-01-19',
                kontoType: 'FORELDREPENGER',
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
                fom: '2026-02-24',
                tom: '2026-06-15',
                kontoType: 'FORELDREPENGER',
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        valgtStønadskonto: {} as any,
    },
};

export const PrematurUker: Story = {
    name: 'Mor har prematuruker',
    args: {
        bareFarMedmorHarRett: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-08-13'],
            termindato: '2025-10-19',
            antallBarn: 1,
        },
        aleneOmOmsorg: false,
        erFarEllerMedmor: false,
        erDeltUttak: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        modus: 'innsyn',
        søker: 'mor',
        navnPåForeldre: {
            farMedmor: 'Annen forelder',
            mor: 'Avansert',
        },
        saksperioder: [
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
                utsettelseÅrsak: 'BARN_INNLAGT',
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        valgtStønadskonto: {} as any,
    },
};
