import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';

import { BarnType } from '@navikt/fp-constants';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import { UttaksplanListe } from './UttaksplanListe';

const meta = {
    title: 'UttaksplanListe - Innsyn',
    component: UttaksplanListe,
    args: {
        children: null,
        isReadOnly: true,
    },
    render: (args) => {
        return (
            <UttaksplanDataProvider {...args} uttakPerioder={args.uttakPerioder ?? []}>
                <UttaksplanListe isReadOnly={args.isReadOnly} />
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<ComponentProps<typeof UttaksplanListe> & ComponentProps<typeof UttaksplanDataProvider>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorAleneOmOmsorg: Story = {
    name: 'Mor er alene om omsorg',
    args: {
        foreldreInfo: {
            rettighetType: 'ALENEOMSORG',
            søker: 'MOR',
            navnPåForeldre: {
                farMedmor: 'Annen forelder',
                mor: 'Iris',
            },
            erMedmorDelAvSøknaden: false,
        },
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-09-30'],
            termindato: '2025-10-07',
            antallBarn: 1,
        },
        harAktivitetskravIPeriodeUtenUttak: false,
        uttakPerioder: [
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
