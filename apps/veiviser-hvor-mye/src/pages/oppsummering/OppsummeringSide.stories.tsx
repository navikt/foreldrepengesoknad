import { Meta, StoryObj } from '@storybook/react-vite';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { KontoBeregningDto } from '@navikt/fp-types';

import { Arbeidssituasjon } from '../arbeidssituasjon/ArbeidssituasjonSide';
import { OppsummeringSide } from './OppsummeringSide';

const STØNADSKONTOER = {
    '100': {
        kontoer: [
            {
                konto: 'MØDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FELLESPERIODE',
                dager: 80,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    } satisfies KontoBeregningDto,
    '80': {
        kontoer: [
            {
                konto: 'MØDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FELLESPERIODE',
                dager: 90,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    } satisfies KontoBeregningDto,
};

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
