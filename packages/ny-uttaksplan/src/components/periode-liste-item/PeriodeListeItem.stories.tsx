import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Forelder } from '@navikt/fp-common';

import PeriodeListeItem from './PeriodeListeItem';

type StoryArgs = ComponentProps<typeof PeriodeListeItem>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ permisjonsperiode }: StoryArgs) => {
    return <PeriodeListeItem permisjonsperiode={permisjonsperiode} />;
};

const meta = {
    title: 'components/PeriodeListeItem',
    component: PeriodeListeItem,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const Uttaksperiode: Story = {
    args: {
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-06-01',
                tom: '2024-06-31',
            },
            forelder: Forelder.mor,
            perioder: [],
        },
    },
};

export const PeriodeUtenUttak: Story = {
    args: {
        permisjonsperiode: {
            tidsperiode: {
                fom: '2024-08-01',
                tom: '2024-08-31',
            },
            forelder: Forelder.farMedmor,
            perioder: [],
        },
    },
};
