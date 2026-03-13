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
        kontonummer: '1212123132',
        ytelse: 'FORELDREPENGER',
        harMinstEttArbeidsforhold: true,
    },
};

export const ForForeldrepengerUtenArbeidsforhold: Story = {
    args: {
        kontonummer: '1212123132',
        ytelse: 'FORELDREPENGER',
        harMinstEttArbeidsforhold: false,
    },
};

export const ForEngangsstønad: Story = {
    args: {
        kontonummer: '1212123132',
        ytelse: 'ENGANGSSTØNAD',
        harMinstEttArbeidsforhold: true,
    },
};

export const ForSvangerskapspenger: Story = {
    args: {
        kontonummer: '1212123132',
        ytelse: 'SVANGERSKAPSPENGER',
        harMinstEttArbeidsforhold: true,
    },
};

export const ForSvangerskapspengerUtenArbeidsforhold: Story = {
    args: {
        kontonummer: '1212123132',
        ytelse: 'SVANGERSKAPSPENGER',
        harMinstEttArbeidsforhold: false,
    },
};

export const HarIkkeKontonr: Story = {
    args: {
        ytelse: 'ENGANGSSTØNAD',
        kontonummer: undefined,
        harMinstEttArbeidsforhold: true,
    },
};
