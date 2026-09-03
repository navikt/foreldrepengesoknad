import { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { API_URLS, mineFrilansoppdragOptions, selvstendigNæringOptions } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { EksternArbeidsforholdDto_fpoversikt, NæringDto, SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

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

const DEFAULT_SELVSTENDIG_NÆRING = [
    {
        organisasjonsnummer: '991122334',
        navn: 'Mitt Konsulentfirma AS',
        næringstype: 'ANNEN',
    },
] satisfies SelvstendigNæringDto_fpoversikt[];

const DEFAULT_FRILANSOPPDRAG = [
    {
        arbeidsgiverId: '999999999',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Frilans Oppdrag AS',
        fom: '2024-01-15T00:00:00.000Z',
        stillingsprosent: 0,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    frilansoppdrag?: EksternArbeidsforholdDto_fpoversikt[];
    egenNæring?: NæringDto;
    selvstendigNæring?: SelvstendigNæringDto_fpoversikt[];
} & ComponentProps<typeof ArbeidsforholdOgInntektSteg>;

const meta = {
    title: 'steps/ArbeidsforholdOgInntektSteg',
    component: ArbeidsforholdOgInntektSteg,
    parameters: {
        msw: {
            handlers: [http.get(API_URLS.selvstendigNæring, () => HttpResponse.json(DEFAULT_SELVSTENDIG_NÆRING))],
        },
    },
    render: ({
        gåTilNesteSide = action('button-click'),
        frilansoppdrag = [],
        egenNæring,
        selvstendigNæring = DEFAULT_SELVSTENDIG_NÆRING,
        ...rest
    }) => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        queryClient.setQueryData(selvstendigNæringOptions().queryKey, selvstendigNæring);
        queryClient.setQueryData(mineFrilansoppdragOptions().queryKey, frilansoppdrag);
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT]}>
                    <SvpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.UTENLANDSOPPHOLD]: {
                                harBoddUtenforNorgeSiste12Mnd: false,
                                skalBoUtenforNorgeNeste12Mnd: false,
                            },
                            [ContextDataType.OM_BARNET]: {
                                erBarnetFødt: false,
                                termindato: '2024-02-18',
                                fødselsdato: '2024-02-18',
                            },
                            [ContextDataType.EGEN_NÆRING]: egenNæring,
                        }}
                    >
                        <ArbeidsforholdOgInntektSteg {...rest} />
                    </SvpDataContext>
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

export const BrukerKanIkkeSøke: Story = {
    args: {
        ...Default.args,
        arbeidsforhold: [],
    },
};

export const MedFrilansoppdrag: Story = {
    args: {
        ...Default.args,
        frilansoppdrag: DEFAULT_FRILANSOPPDRAG,
    },
};
