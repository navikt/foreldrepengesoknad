import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Forelder, Periodetype, StønadskontoType } from '@navikt/fp-common';

import PeriodeListeItem from './PeriodeListeItem';

type StoryArgs = ComponentProps<typeof PeriodeListeItem>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ periode }: StoryArgs) => {
    return <PeriodeListeItem periode={periode} />;
};

const meta = {
    title: 'components/PeriodeListeItem',
    component: PeriodeListeItem,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const Uttaksperiode: Story = {
    args: {
        periode: {
            id: '1',
            tidsperiode: {
                fom: new Date('2024-06-01'),
                tom: new Date('2024-06-31'),
            },
            type: Periodetype.Uttak,
            konto: StønadskontoType.Mødrekvote,
            forelder: Forelder.mor,
        },
    },
};

export const PeriodeUtenUttak: Story = {
    args: {
        periode: {
            id: '2',
            tidsperiode: {
                fom: new Date('2024-08-01'),
                tom: new Date('2024-08-31'),
            },
            type: Periodetype.PeriodeUtenUttak,
        },
    },
};
