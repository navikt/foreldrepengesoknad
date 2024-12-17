import { Meta, StoryObj } from '@storybook/react';
import { saker } from 'storybookData/saker/saker';

import { BehandlingTilstand } from './../../types/BehandlingTilstand';
import StatusTag from './StatusTag';

const meta = {
    title: 'StatusTag',
    component: StatusTag,
} satisfies Meta<typeof StatusTag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const AktivSak: Story = {
    args: {
        //@ts-ignore fiks
        sak: saker.foreldrepenger[0],
        harMinstEttArbeidsforhold: true,
    },
};

export const AvsluttetSak: Story = {
    args: {
        //@ts-ignore fiks
        sak: {
            //@ts-ignore fiks
            ...saker.foreldrepenger[0],
            sakAvsluttet: true,
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const UnderBehandling: Story = {
    args: {
        //@ts-ignore fiks
        sak: {
            //@ts-ignore fiks
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: BehandlingTilstand.UNDER_BEHANDLING,
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåInntektsmelding: Story = {
    args: {
        //@ts-ignore fiks
        sak: {
            //@ts-ignore fiks
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING,
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåBehandling: Story = {
    args: {
        //@ts-ignore fiks
        sak: {
            //@ts-ignore fiks
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING,
            },
        },
        harMinstEttArbeidsforhold: false,
    },
};

export const TidligSøknad: Story = {
    args: {
        //@ts-ignore fiks
        sak: {
            //@ts-ignore fiks
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: BehandlingTilstand.TIDLIG_SØKNAD,
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};

export const VenterPåMeldekort: Story = {
    args: {
        //@ts-ignore fiks
        sak: {
            //@ts-ignore fiks
            ...saker.foreldrepenger[0],
            åpenBehandling: {
                tilstand: BehandlingTilstand.VENTER_PÅ_MELDEKORT,
            },
        },
        harMinstEttArbeidsforhold: true,
    },
};
