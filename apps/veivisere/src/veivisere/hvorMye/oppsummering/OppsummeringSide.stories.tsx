import { Meta, StoryObj } from '@storybook/react';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import { Arbeidssituasjon } from '../arbeidssituasjon/ArbeidssituasjonSide';
import OppsummeringSide from './OppsummeringSide';

const STØNADSKONTOER = {
    '100': {
        kontoer: [
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 75,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 75,
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 80,
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: [
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 95,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 95,
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 90,
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
} as TilgjengeligeStønadskontoer;

const satser = {
    engangstønad: [
        {
            fom: '01.01.2023',
            verdi: 92648,
        },
        {
            fom: '01.01.2021',
            verdi: 90300,
        },
    ],
    grunnbeløp: [
        {
            fom: '01.05.2024',
            verdi: 124028,
        },
        {
            fom: '01.05.2023',
            verdi: 118620,
        },
    ],
};

interface StoryArgs {
    arbeidssituasjon: Arbeidssituasjon;
}

const customRenderer = ({ arbeidssituasjon }: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[HvorMyeRoutes.OPPSUMMERING]}>
            <OppsummeringSide arbeidssituasjon={arbeidssituasjon} stønadskontoer={STØNADSKONTOER} satser={satser} />
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

export const ArbeidstakerMed10000IMåneden: Story = {
    args: {
        arbeidssituasjon: {
            erArbeidstakerEllerFrilanser: true,
            erSelvstendigNæringsdrivende: false,
            harUtbetalingFraNav: false,
            lønnMåned1: '10000',
            lønnMåned2: '10000',
            lønnMåned3: '10000',
        },
    },
};
