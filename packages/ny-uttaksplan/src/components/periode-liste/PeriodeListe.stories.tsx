import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Forelder, Periodetype, StønadskontoType } from '@navikt/fp-common';

import PeriodeListe from './PeriodeListe';

type StoryArgs = ComponentProps<typeof PeriodeListe>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ perioder }: StoryArgs) => {
    return <PeriodeListe perioder={perioder} erFarEllerMedmor={true} familiehendelsesdato="2024-04-22" />;
};

const meta = {
    title: 'components/PeriodeListe',
    component: PeriodeListe,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const UttaksperioderMor: Story = {
    args: {
        perioder: [
            {
                id: '1',
                tidsperiode: {
                    fom: new Date('2024-04-01'),
                    tom: new Date('2024-04-19'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
            },
            {
                id: '2',
                tidsperiode: {
                    fom: new Date('2024-04-22'),
                    tom: new Date('2024-05-31'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
            },
            {
                id: '3',
                tidsperiode: {
                    fom: new Date('2024-06-03'),
                    tom: new Date('2024-06-10'),
                },
                type: Periodetype.PeriodeUtenUttak,
            },
            {
                id: '4',
                tidsperiode: {
                    fom: new Date('2024-06-11'),
                    tom: new Date('2024-06-28'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fellesperiode,
                forelder: Forelder.mor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '50',
            },
            {
                id: '5',
                tidsperiode: {
                    fom: new Date('2024-07-01'),
                    tom: new Date('2024-07-02'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fedrekvote,
                forelder: Forelder.mor,
            },
            {
                id: '6',
                tidsperiode: {
                    fom: new Date('2024-07-03'),
                    tom: new Date('2024-07-10'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                gradert: true,
                stillingsprosent: '20',
            },
        ],
    },
};

export const UttaksperioderMorOgFar: Story = {
    args: {
        perioder: [
            {
                id: '1',
                tidsperiode: {
                    fom: new Date('2024-04-01'),
                    tom: new Date('2024-04-19'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
            },
            {
                id: '2',
                tidsperiode: {
                    fom: new Date('2024-04-22'),
                    tom: new Date('2024-05-03'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                samtidigUttakProsent: '100',
            },
            {
                id: '3',
                tidsperiode: {
                    fom: new Date('2024-04-22'),
                    tom: new Date('2024-05-03'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
                samtidigUttakProsent: '100',
            },
            {
                id: '4',
                tidsperiode: {
                    fom: new Date('2024-05-06'),
                    tom: new Date('2024-05-31'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
            },
            {
                id: '5',
                tidsperiode: {
                    fom: new Date('2024-06-03'),
                    tom: new Date('2024-06-28'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
            },
            {
                id: '6',
                tidsperiode: {
                    fom: new Date('2024-07-01'),
                    tom: new Date('2024-07-08'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fellesperiode,
                forelder: Forelder.farMedmor,
            },
        ],
    },
};

export const UttaksperioderFarMorIkkeRett: Story = {
    args: {
        perioder: [
            {
                id: '1',
                tidsperiode: {
                    fom: new Date('2024-05-01'),
                    tom: new Date('2024-08-21'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Foreldrepenger,
                forelder: Forelder.farMedmor,
            },
            {
                id: '2',
                tidsperiode: {
                    fom: new Date('2024-08-22'),
                    tom: new Date('2024-08-29'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.AktivitetsfriKvote,
                forelder: Forelder.farMedmor,
            },
            {
                id: '2',
                tidsperiode: {
                    fom: new Date('2024-08-30'),
                    tom: new Date('2024-09-13'),
                },
                type: Periodetype.PeriodeUtenUttak,
            },
            {
                id: '2',
                tidsperiode: {
                    fom: new Date('2024-09-16'),
                    tom: new Date('2024-09-23'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Foreldrepenger,
                forelder: Forelder.farMedmor,
                gradert: true,
                stillingsprosent: '80',
            },
        ],
    },
};

export const UttaksperioderMorOgFarFlerbarnsdager: Story = {
    args: {
        perioder: [
            {
                id: '1',
                tidsperiode: {
                    fom: new Date('2024-04-01'),
                    tom: new Date('2024-04-19'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                forelder: Forelder.mor,
            },
            {
                id: '2',
                tidsperiode: {
                    fom: new Date('2024-04-22'),
                    tom: new Date('2024-05-31'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                ønskerFlerbarnsdager: true,
                samtidigUttakProsent: '100',
            },
            {
                id: '3',
                tidsperiode: {
                    fom: new Date('2024-04-22'),
                    tom: new Date('2024-05-31'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
                ønskerFlerbarnsdager: true,
                samtidigUttakProsent: '100',
            },
        ],
    },
};
