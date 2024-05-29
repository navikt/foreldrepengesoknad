import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Forelder, PeriodeHullÅrsak, Periodetype, StønadskontoType, UtsettelseÅrsakType } from '@navikt/fp-common';

import PeriodeListe from './PeriodeListe';

type StoryArgs = ComponentProps<typeof PeriodeListe>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ perioder, erFarEllerMedmor, familiehendelsedato }: StoryArgs) => {
    return (
        <PeriodeListe
            perioder={perioder}
            erFarEllerMedmor={erFarEllerMedmor}
            familiehendelsedato={familiehendelsedato}
        />
    );
};

const meta = {
    title: 'components/PeriodeListe',
    component: PeriodeListe,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const UttaksperioderMor: Story = {
    name: 'Mor søker',
    args: {
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
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
    name: 'Mor og far med samtidig uttak',
    args: {
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
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
    name: 'Far søker og mor har ikke rett',
    args: {
        erFarEllerMedmor: true,
        familiehendelsedato: '2024-05-01',
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
    name: 'Mor og far med flerbarnsdager og samtidig uttak',
    args: {
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
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

export const UttaksperioderMorIkkeSøktFørsteSeksUker: Story = {
    name: 'Mor har ikke lagt inn uttak første seks uker',
    args: {
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
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
                type: Periodetype.Hull,
                årsak: PeriodeHullÅrsak.fridag,
            },
            {
                id: '3',
                tidsperiode: {
                    fom: new Date('2024-06-03'),
                    tom: new Date('2024-06-28'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
            },
        ],
    },
};

export const UttaksperioderMorInnlagtFørsteSeksUker: Story = {
    name: 'Mor er innlagt første seks uker',
    args: {
        erFarEllerMedmor: false,
        familiehendelsedato: '2024-04-22',
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
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.InstitusjonSøker,
                erArbeidstaker: true,
                forelder: Forelder.mor,
            },
            {
                id: '3',
                tidsperiode: {
                    fom: new Date('2024-06-03'),
                    tom: new Date('2024-06-28'),
                },
                type: Periodetype.Uttak,
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
            },
        ],
    },
};
