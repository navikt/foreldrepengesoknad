import { Meta, StoryObj } from '@storybook/react';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import { Arbeidssituasjon } from '../arbeidssituasjon/ArbeidssituasjonSide';
import OppsummeringSide from './OppsummeringSide';

interface StoryArgs {
    arbeidssituasjon: Arbeidssituasjon;
}

const customRenderer = ({ arbeidssituasjon }: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[HvorMyeRoutes.OPPSUMMERING]}>
            <OppsummeringSide arbeidssituasjon={arbeidssituasjon} />
        </MemoryRouter>
    );
};

const meta = {
    title: 'hvorMye/OppsummeringSide',
    component: OppsummeringSide,
    render: customRenderer,
} satisfies Meta<typeof OppsummeringSide & StoryArgs>;
export default meta;

type Story = StoryObj<StoryArgs>;

export const ArbeidstakerMed20000Imåneden: Story = {
    args: {
        arbeidssituasjon: {
            erArbeidstakerEllerFrilanser: true,
            erSelvstendigNæringsdrivende: false,
            harUtbetalingFraNav: false,
            lønnMåned1: '20000',
            lønnMåned2: '20000',
            lønnMåned3: '20000',
        },
    },
};

export const ArbeidstakerMed100000Imåneden: Story = {
    args: {
        arbeidssituasjon: {
            erArbeidstakerEllerFrilanser: true,
            erSelvstendigNæringsdrivende: false,
            harUtbetalingFraNav: false,
            lønnMåned1: '100000',
            lønnMåned2: '100000',
            lønnMåned3: '100000',
        },
    },
};

export const ArbeidstakerMed1000Imåneden: Story = {
    args: {
        arbeidssituasjon: {
            erArbeidstakerEllerFrilanser: true,
            erSelvstendigNæringsdrivende: false,
            harUtbetalingFraNav: false,
            lønnMåned1: '1000',
            lønnMåned2: '1000',
            lønnMåned3: '1000',
        },
    },
};
