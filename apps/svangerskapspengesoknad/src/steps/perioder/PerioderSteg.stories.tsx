import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute, TILRETTELEGGING_PARAM, addTilretteleggingIdToRoute } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { action } from 'storybook/actions';
import { Barn } from 'types/Barn';
import { DelivisTilretteleggingPeriodeType, DelvisTilrettelegging, IngenTilrettelegging } from 'types/Tilrettelegging';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { PerioderSteg } from './PerioderSteg';

const TILRETTELEGGING_ID = '263929546-6215-9868-5127-161910165730101';
const ANNEN_TILRETTELEGGING_ID = '0132715641-23932-19917-03900-809964087910';

const DEFAULT_ARBEIDSFORHOLD = [
    {
        arbeidsgiverId: '1669400414-9409-3313-0700-3334116100409',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '149599873-5769-19110-21897-6184606004018',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-04-09T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2018-09-09T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '86832061-1118-9701-6179-20647729409710',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-06-25T00:00:00.000Z',
        stillingsprosent: 80,
        tom: '2018-08-05T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '186699244-06994-0884-1562-860234771205',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2019-06-01T00:00:00.000Z',
        stillingsprosent: 85.09,
    },
    {
        arbeidsgiverId: TILRETTELEGGING_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
    {
        arbeidsgiverId: ANNEN_TILRETTELEGGING_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2023-09-01',
        stillingsprosent: 10,
    },
    {
        arbeidsgiverId: ANNEN_TILRETTELEGGING_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2023-10-01',
        stillingsprosent: 20,
    },
    {
        arbeidsgiverId: ANNEN_TILRETTELEGGING_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2023-11-01',
        stillingsprosent: 0,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const DEFAULT_BARN = {
    erBarnetFødt: false,
    termindato: '2024-02-18',
    fødselsdato: '2024-02-18',
};

const promiseAction = () => (): Promise<void> => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    tilrettelegging: IngenTilrettelegging | DelvisTilrettelegging;
    valgteArbeidsforhold: string[];
    barn?: Barn;
    gåTilNesteSide?: (action: Action) => void;
    valgtTilretteleggingId?: string;
} & ComponentProps<typeof PerioderSteg>;

const meta = {
    title: 'steps/PerioderSteg',
    component: PerioderSteg,
    render: ({
        gåTilNesteSide = action('button-click'),
        tilrettelegging,
        valgtTilretteleggingId = TILRETTELEGGING_ID,
        valgteArbeidsforhold,
        barn = DEFAULT_BARN,
        ...rest
    }) => {
        return (
            <MemoryRouter initialEntries={[addTilretteleggingIdToRoute(SøknadRoute.PERIODER, valgtTilretteleggingId)]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.TILRETTELEGGINGER]: { [valgtTilretteleggingId]: tilrettelegging },
                        [ContextDataType.OM_BARNET]: barn,
                        [ContextDataType.VALGTE_ARBEIDSFORHOLD]: valgteArbeidsforhold,
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harHattArbeidIUtlandet: false,
                            harJobbetSomFrilans: false,
                            harJobbetSomSelvstendigNæringsdrivende: false,
                        },
                    }}
                >
                    <Routes>
                        <Route
                            element={<PerioderSteg {...rest} />}
                            path={`/${SøknadRoute.PERIODER}/${TILRETTELEGGING_PARAM}`}
                        />
                    </Routes>
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
        valgteArbeidsforhold: [TILRETTELEGGING_ID],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: () => action('button-click'),
        tilrettelegging: {
            type: 'delvis',
            delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        } as DelvisTilrettelegging,
    },
};

export const FremTilFødselsdato: Story = {
    args: {
        ...Default.args,
        tilrettelegging: {
            type: 'delvis',
            delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        } as DelvisTilrettelegging,
        barn: {
            erBarnetFødt: true,
            termindato: '2024-01-18',
            fødselsdato: '2023-02-18',
        },
    },
};

export const FlereStillinger: Story = {
    args: {
        ...Default.args,
        valgtTilretteleggingId: ANNEN_TILRETTELEGGING_ID,
        valgteArbeidsforhold: [ANNEN_TILRETTELEGGING_ID],
        tilrettelegging: {
            behovForTilretteleggingFom: '2023-09-01',
            type: 'delvis',
            delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        } as DelvisTilrettelegging,
    },
};
