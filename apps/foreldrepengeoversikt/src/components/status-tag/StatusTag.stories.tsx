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
        //@ts-expect-error fiks
        sak: saker.foreldrepenger[0],
        harMinstEttArbeidsforhold: true,
    },
};

export const AvsluttetSak: Story = {
    args: {
        //@ts-expect-error fiks
        sak: {
            ...saker.foreldrepenger[0],
            sakAvsluttet: true,
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const UnderBehandling: Story = {
    args: {
        //@ts-expect-error fiks
        sak: {
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: 'UNDER_BEHANDLING',
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåInntektsmelding: Story = {
    args: {
        //@ts-expect-error fiks
        sak: {
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: 'VENT_INNTEKTSMELDING',
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåBehandling: Story = {
    args: {
        //@ts-expect-error fiks
        sak: {
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: 'VENT_INNTEKTSMELDING',
            },
        },
        harMinstEttArbeidsforhold: false,
    },
};

export const TidligSøknad: Story = {
    args: {
        //@ts-expect-error fiks
        sak: {
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: 'VENT_TIDLIG_SØKNAD',
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåMeldekort: Story = {
    args: {
        //@ts-expect-error fiks
        sak: {
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: 'VENT_MELDEKORT',
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};
