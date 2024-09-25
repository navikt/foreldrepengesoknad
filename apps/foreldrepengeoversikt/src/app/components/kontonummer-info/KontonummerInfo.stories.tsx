import { Meta, StoryObj } from '@storybook/react/*';

import { KontonummerInfo } from 'app/components/kontonummer-info/KontonummerInfo';
import { Ytelse } from 'app/types/Ytelse';

const meta = {
    title: 'KontonummerInfo',
    component: KontonummerInfo,
} satisfies Meta<typeof KontonummerInfo>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: Ytelse.FORELDREPENGER,
    },
};

export const ForEngangsstønad: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: Ytelse.ENGANGSSTØNAD,
    },
};

export const ForSvangerskapspenger: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: Ytelse.SVANGERSKAPSPENGER,
    },
};

export const HarIkkeKontonr: Story = {
    args: {
        ytelse: Ytelse.ENGANGSSTØNAD,
        bankkonto: undefined,
    },
};
