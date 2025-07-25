import { Meta, StoryObj } from '@storybook/react-vite';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER, StønadskontoType } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import { Arbeidssituasjon } from '../arbeidssituasjon/ArbeidssituasjonSide';
import { OppsummeringSide } from './OppsummeringSide';

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

interface StoryArgs {
    arbeidssituasjon: Arbeidssituasjon;
}

const meta = {
    title: 'hvorMye/OppsummeringSide',
    component: OppsummeringSide,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[HvorMyeRoutes.OPPSUMMERING]}>
                <OppsummeringSide {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof OppsummeringSide & StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ArbeidstakerMed20000Imåneden: Story = {
    args: {
        stønadskontoer: STØNADSKONTOER,
        satser: DEFAULT_SATSER,
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
        ...ArbeidstakerMed20000Imåneden.args,
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
        ...ArbeidstakerMed20000Imåneden.args,
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
        ...ArbeidstakerMed20000Imåneden.args,
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
