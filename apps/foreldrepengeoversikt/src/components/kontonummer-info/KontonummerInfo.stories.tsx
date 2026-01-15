import { Meta, StoryObj } from '@storybook/react-vite';

import { KontonummerInfo } from './KontonummerInfo';

const meta = {
    title: 'KontonummerInfo',
    component: KontonummerInfo,
} satisfies Meta<typeof KontonummerInfo>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ForForeldrepenger: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: 'FORELDREPENGER',
        harMinstEttArbeidsforhold: true,
    },
};

export const ForForeldrepengerUtenArbeidsforhold: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: 'FORELDREPENGER',
        harMinstEttArbeidsforhold: false,
    },
};

export const ForEngangsstønad: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: 'ENGANGSSTØNAD',
        harMinstEttArbeidsforhold: true,
    },
};

export const ForSvangerskapspenger: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: 'SVANGERSKAPSPENGER',
        harMinstEttArbeidsforhold: true,
    },
};

export const ForSvangerskapspengerUtenArbeidsforhold: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: 'SVANGERSKAPSPENGER',
        harMinstEttArbeidsforhold: false,
    },
};

export const HarIkkeKontonr: Story = {
    args: {
        ytelse: 'ENGANGSSTØNAD',
        bankkonto: undefined,
        harMinstEttArbeidsforhold: true,
    },
};
