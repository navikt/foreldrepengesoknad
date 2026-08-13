import { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { API_URLS } from 'api/queries';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { BarnType } from '@navikt/fp-constants';
import { EksternArbeidsforholdDto_fpoversikt, SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

import { ArbeidsforholdOgInntektSteg } from './ArbeidsforholdOgInntektSteg';

const DEFAULT_ARBEIDSFORHOLD = [
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-04-09T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2018-09-09T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-06-25T00:00:00.000Z',
        stillingsprosent: 80,
        tom: '2018-08-05T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2019-06-01T00:00:00.000Z',
        stillingsprosent: 85.09,
    },
    {
        arbeidsgiverId: '990322244',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
    {
        arbeidsgiverId: '995090910',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2018-06-01T00:00:00.000Z',
        stillingsprosent: 0,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const DEFAULT_FRILANSOPPDRAG = [
    {
        arbeidsgiverId: '888777666',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Frilans Oppdrag AS',
        fom: '2024-01-15T00:00:00.000Z',
        stillingsprosent: 0,
    },
    {
        arbeidsgiverId: '888777667',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Frilans Media AS',
        fom: '2022-03-01T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2023-12-31T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '888777668',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Frilans Kultur AS',
        fom: '2020-06-01T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2021-09-30T00:00:00.000Z',
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const DEFAULT_SELVSTENDIG_NÆRING = [
    {
        organisasjonsnummer: '991122334',
        navn: 'Mitt Konsulentfirma AS',
        næringstype: 'ANNEN',
        underAvvikling: false,
    },
] satisfies SelvstendigNæringDto_fpoversikt[];

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof ArbeidsforholdOgInntektSteg>;

const meta = {
    title: 'steps/ArbeidsforholdOgInntektSteg',
    component: ArbeidsforholdOgInntektSteg,
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.mineFrilansoppdrag, () => HttpResponse.json(DEFAULT_FRILANSOPPDRAG)),
                http.get(API_URLS.selvstendigNæring, () => HttpResponse.json(DEFAULT_SELVSTENDIG_NÆRING)),
            ],
        },
    },
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        const freshQueryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        return (
            <QueryClientProvider client={freshQueryClient}>
                <MemoryRouter initialEntries={[SøknadRoutes.ARBEID_OG_INNTEKT]}>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.SØKERSITUASJON]: {
                                rolle: 'mor',
                                situasjon: 'fødsel',
                            },
                            [ContextDataType.OM_BARNET]: {
                                termindato: '2024-02-18',
                                type: BarnType.FØDT,
                                fødselsdatoer: ['2024-02-18'],
                                antallBarn: 1,
                            },
                            [ContextDataType.ANDRE_INNTEKTSKILDER]: [],
                        }}
                    >
                        <ArbeidsforholdOgInntektSteg {...rest} />
                    </FpDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: () => action('button-click'),
        arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    },
};

export const BrukerKanSøkeVedKunNeiSvar: Story = {
    args: {
        ...Default.args,
        arbeidsforhold: [],
    },
};
