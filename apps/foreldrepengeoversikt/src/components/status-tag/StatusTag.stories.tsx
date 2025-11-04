import { Meta, StoryObj } from '@storybook/react-vite';
import { saker } from 'storybookData/saker/saker';

import { StatusTag } from './StatusTag';

const meta = {
    title: 'StatusTag',
    component: StatusTag,
} satisfies Meta<typeof StatusTag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const AktivSak: Story = {
    args: {
        sak: {
            ...saker.foreldrepenger[0],
            ytelse: 'FORELDREPENGER',
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const AvsluttetSak: Story = {
    args: {
        sak: {
            ...saker.foreldrepenger[0],
            ytelse: 'FORELDREPENGER',
            sakAvsluttet: true,
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const UnderBehandling: Story = {
    args: {
        sak: {
            ...saker.foreldrepenger[0],
            ytelse: 'FORELDREPENGER',
            åpenBehandling: {
                søknadsperioder: [],
                tilstand: 'UNDER_BEHANDLING',
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåInntektsmelding: Story = {
    args: {
        sak: {
            ...saker.foreldrepenger[0],
            ytelse: 'FORELDREPENGER',
            åpenBehandling: {
                søknadsperioder: [],
                tilstand: 'VENT_INNTEKTSMELDING',
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåBehandling: Story = {
    args: {
        sak: {
            ...saker.foreldrepenger[0],
            ytelse: 'FORELDREPENGER',
            åpenBehandling: {
                søknadsperioder: [],
                tilstand: 'VENT_INNTEKTSMELDING',
            },
        },
        harMinstEttArbeidsforhold: false,
    },
};

export const TidligSøknad: Story = {
    args: {
        sak: {
            ...saker.foreldrepenger[0],
            ytelse: 'FORELDREPENGER',
            åpenBehandling: {
                søknadsperioder: [],
                tilstand: 'VENT_TIDLIG_SØKNAD',
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåMeldekort: Story = {
    args: {
        sak: {
            ...saker.foreldrepenger[0],
            ytelse: 'FORELDREPENGER',
            åpenBehandling: {
                søknadsperioder: [],
                tilstand: 'VENT_MELDEKORT',
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};
