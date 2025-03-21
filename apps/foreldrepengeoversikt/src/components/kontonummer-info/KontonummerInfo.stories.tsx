import { Meta, StoryObj } from '@storybook/react/*';

import { Ytelse } from '@navikt/fp-types';

import { KontonummerInfo } from './../kontonummer-info/KontonummerInfo';

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
        ytelse: Ytelse.FORELDREPENGER,
        harMinstEttArbeidsforhold: true,
    },
};

export const ForForeldrepengerUtenArbeidsforhold: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: Ytelse.FORELDREPENGER,
        harMinstEttArbeidsforhold: false,
    },
};

export const ForEngangsstønad: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: Ytelse.ENGANGSSTØNAD,
        harMinstEttArbeidsforhold: true,
    },
};

export const ForSvangerskapspenger: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: Ytelse.SVANGERSKAPSPENGER,
        harMinstEttArbeidsforhold: true,
    },
};

export const ForSvangerskapspengerUtenArbeidsforhold: Story = {
    args: {
        bankkonto: {
            kontonummer: '1212123132',
            banknavn: 'Luster Sparebank',
        },
        ytelse: Ytelse.SVANGERSKAPSPENGER,
        harMinstEttArbeidsforhold: false,
    },
};

export const HarIkkeKontonr: Story = {
    args: {
        ytelse: Ytelse.ENGANGSSTØNAD,
        bankkonto: undefined,
        harMinstEttArbeidsforhold: true,
    },
};
