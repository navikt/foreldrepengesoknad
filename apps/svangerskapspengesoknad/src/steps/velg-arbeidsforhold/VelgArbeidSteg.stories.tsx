import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { DelvisTilrettelegging, IngenTilrettelegging } from 'types/Tilrettelegging';

import { ArbeidsforholdOgInntektSvp, Frilans, NæringDto } from '@navikt/fp-types';

import { VelgArbeidSteg } from './VelgArbeidSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

const DEFAULT_ARBEIDSFORHOLD = [
    {
        id: '1669400414-9409-3313-0700-3334116100409',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
    {
        id: '149599873-5769-19110-21897-6184606004018',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-04-09T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2018-09-09T00:00:00.000Z',
    },
    {
        id: '86832061-1118-9701-6179-20647729409710',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-06-25T00:00:00.000Z',
        stillingsprosent: 80,
        tom: '2018-08-05T00:00:00.000Z',
    },
    {
        id: '186699244-06994-0884-1562-860234771205',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2019-06-01T00:00:00.000Z',
        stillingsprosent: 85.09,
    },
    {
        id: '263929546-6215-9868-5127-161910165730101',
        arbeidsgiverId: '990322244',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
    {
        id: '0132715641-23932-19917-03900-809964087910',
        arbeidsgiverId: '995090910',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2018-06-01T00:00:00.000Z',
        stillingsprosent: 0,
    },
];

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    tilrettelegginger?: Record<string, DelvisTilrettelegging | IngenTilrettelegging>;
    valgteArbeidsforhold?: string[];
    arbeidsforholdOgInntekt?: ArbeidsforholdOgInntektSvp;
    egenNæring?: NæringDto;
    frilans?: Frilans;
} & ComponentProps<typeof VelgArbeidSteg>;

const meta = {
    title: 'steps/VelgArbeidSteg',
    component: VelgArbeidSteg,
    render: ({
        gåTilNesteSide = action('button-click'),
        arbeidsforholdOgInntekt,
        tilrettelegginger,
        valgteArbeidsforhold,
        egenNæring,
        frilans,
        ...rest
    }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoute.VELG_ARBEID]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
                        [ContextDataType.TILRETTELEGGINGER]: tilrettelegginger,
                        [ContextDataType.VALGTE_ARBEIDSFORHOLD]: valgteArbeidsforhold,
                        [ContextDataType.EGEN_NÆRING]: egenNæring,
                        [ContextDataType.FRILANS]: frilans,
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: '2024-02-18',
                            fødselsdato: '2024-02-18',
                        },
                    }}
                >
                    <VelgArbeidSteg {...rest} />
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
        avbrytSøknad: promiseAction(),
        arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
        arbeidsforholdOgInntekt: {
            harHattArbeidIUtlandet: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
    },
};

export const MedNæringsvalg: Story = {
    args: {
        ...Default.args,
        arbeidsforholdOgInntekt: {
            harHattArbeidIUtlandet: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: true,
        },
        egenNæring: {
            fom: '2024-01-01',
            tom: '2024-10-01',
            registrertINorge: true,
            næringstype: 'FISKE',
        },
    },
};

export const MedFrilansvalg: Story = {
    args: {
        ...Default.args,
        arbeidsforholdOgInntekt: {
            harHattArbeidIUtlandet: false,
            harJobbetSomFrilans: true,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        frilans: {
            jobberFremdelesSomFrilans: true,
            oppstart: '2024-01-01',
        },
    },
};
