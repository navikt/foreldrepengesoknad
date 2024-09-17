import { Meta, StoryObj } from '@storybook/react';

import { initAmplitude } from '@navikt/fp-metrics';

import Umyndig from './Umyndig';

const meta = {
    component: Umyndig,
    render: (props) => {
        initAmplitude();
        return <Umyndig {...props} />;
    },
} satisfies Meta<typeof Umyndig>;
export default meta;

type Story = StoryObj<typeof meta>;

export const UmyndigForeldrepenger: Story = {
    args: {
        appnavn: 'Foreldrepenger',
    },
};

export const UmyndigEngangsstonad: Story = {
    args: {
        appnavn: 'Engangsstønad',
    },
};

export const UmyndigSvangerskapspenger: Story = {
    args: {
        appnavn: 'Svangerskapspenger',
    },
};
