import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { API_URLS } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

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
        arbeidsgiverId: '991122334',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Mitt Konsulentfirma AS',
        fom: '2024-01-01T00:00:00.000Z',
        stillingsprosent: 100,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

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
            handlers: [http.get(API_URLS.mineSN, () => HttpResponse.json(DEFAULT_SELVSTENDIG_NÆRING))],
        },
    },
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        return (
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
                    }}
                >
                    <ArbeidsforholdOgInntektSteg {...rest} />
                </SvpDataContext>
            </MemoryRouter>
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
