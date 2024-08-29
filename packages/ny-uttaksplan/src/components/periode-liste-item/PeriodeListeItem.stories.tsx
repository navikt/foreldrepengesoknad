import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Accordion } from '@navikt/ds-react';

import { Arbeidsform, Forelder, PeriodeHullÅrsak, Periodetype, StønadskontoType } from '@navikt/fp-common';

import { UttaksplanContextDataType, UttaksplanDataContext } from '../../context/UttaksplanDataContext';
import PeriodeListeItem from './PeriodeListeItem';

type StoryArgs = ComponentProps<typeof PeriodeListeItem>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ permisjonsperiode }: StoryArgs) => {
    return (
        <UttaksplanDataContext
            initialState={{
                [UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR]: true,
                [UttaksplanContextDataType.NAVN_PÅ_FORELDRE]: {
                    farMedmor: 'Far',
                    mor: 'Mor',
                },
            }}
        >
            <div style={{ maxWidth: '704px', margin: '2rem 4rem' }}>
                <Accordion>
                    <PeriodeListeItem permisjonsperiode={permisjonsperiode} familiehendelsedato="2024-06-01" />
                </Accordion>
            </div>
        </UttaksplanDataContext>
    );
};

const meta = {
    title: 'components/PeriodeListeItem',
    component: PeriodeListeItem,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const UttaksperiodeMor: Story = {
    args: {
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-06-30',
            },
            forelder: Forelder.mor,
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    type: Periodetype.Uttak,
                    tidsperiode: {
                        fom: new Date('2024-06-01'),
                        tom: new Date('2024-06-30'),
                    },
                    forelder: Forelder.mor,
                    konto: StønadskontoType.Mødrekvote,
                },
            ],
        },
    },
};

export const UttaksperiodeMorFlerePerioder: Story = {
    args: {
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-07-26',
            },
            forelder: Forelder.mor,
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    type: Periodetype.Uttak,
                    tidsperiode: {
                        fom: new Date('2024-06-01'),
                        tom: new Date('2024-06-28'),
                    },
                    forelder: Forelder.mor,
                    konto: StønadskontoType.Mødrekvote,
                },
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    type: Periodetype.Uttak,
                    tidsperiode: {
                        fom: new Date('2024-07-01'),
                        tom: new Date('2024-07-26'),
                    },
                    forelder: Forelder.mor,
                    konto: StønadskontoType.Fellesperiode,
                },
            ],
        },
    },
};

export const UttaksperiodeMorFlerePerioderInkludererGradering: Story = {
    args: {
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-07-26',
            },
            forelder: Forelder.mor,
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    type: Periodetype.Uttak,
                    tidsperiode: {
                        fom: new Date('2024-06-01'),
                        tom: new Date('2024-06-28'),
                    },
                    forelder: Forelder.mor,
                    konto: StønadskontoType.Mødrekvote,
                },
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    type: Periodetype.Uttak,
                    tidsperiode: {
                        fom: new Date('2024-07-01'),
                        tom: new Date('2024-07-26'),
                    },
                    forelder: Forelder.mor,
                    konto: StønadskontoType.Fellesperiode,
                },
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    type: Periodetype.Uttak,
                    tidsperiode: {
                        fom: new Date('2024-07-29'),
                        tom: new Date('2024-08-23'),
                    },
                    forelder: Forelder.mor,
                    konto: StønadskontoType.Fellesperiode,
                    gradert: true,
                    arbeidsformer: [Arbeidsform.arbeidstaker],
                    stillingsprosent: '50',
                },
            ],
        },
    },
};

export const UttaksperiodeFar: Story = {
    args: {
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-06-28',
            },
            forelder: Forelder.farMedmor,
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    type: Periodetype.Uttak,
                    tidsperiode: {
                        fom: new Date('2024-06-01'),
                        tom: new Date('2024-06-28'),
                    },
                    forelder: Forelder.farMedmor,
                    konto: StønadskontoType.Fedrekvote,
                },
            ],
        },
    },
};

export const PeriodeUtenUttak: Story = {
    args: {
        permisjonsperiode: {
            erPeriodeUtenUttak: true,
            tidsperiode: {
                fom: '2024-08-01',
                tom: '2024-08-31',
            },
            perioder: [
                {
                    id: '88638814-3912-1440-03308-2381934996836',
                    type: Periodetype.Hull,
                    tidsperiode: {
                        fom: new Date('2024-08-01'),
                        tom: new Date('2024-08-31'),
                    },
                    årsak: PeriodeHullÅrsak.fridag,
                },
            ],
        },
    },
};
