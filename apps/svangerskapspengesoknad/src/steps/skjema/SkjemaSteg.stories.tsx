import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidsforholdstype, Tilrettelegging } from 'types/Tilrettelegging';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';

import SkjemaSteg from './SkjemaSteg';

const file1 = new File(['abc'.repeat(100000)], 'Filnavn1.jpg');
const file2 = new File(['abc'.repeat(500000)], 'Filnavn2.jpg');

const defaultTilrettelegging = {
    id: '990322244',
    arbeidsforhold: {
        arbeidsgiverId: '990322244',
        type: Arbeidsforholdstype.VIRKSOMHET,
        navn: 'Omsorgspartner Vestfold AS',
        stillinger: [],
        startdato: '2023-01-01',
    },
    varierendePerioder: [],
    behovForTilretteleggingFom: undefined!,
    type: undefined!,
    vedlegg: [],
} as Tilrettelegging;

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
];

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    tilrettelegging: Tilrettelegging[];
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof SkjemaSteg>;

const meta = {
    title: 'steps/SkjemaSteg',
    component: SkjemaSteg,
    render: ({ gåTilNesteSide = action('button-click'), tilrettelegging, ...rest }) => {
        initAmplitude();

        return (
            <MemoryRouter initialEntries={[SøknadRoutes.SKJEMA]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harHattArbeidIUtlandet: false,
                            harJobbetSomFrilans: false,
                            harJobbetSomSelvstendigNæringsdrivende: false,
                        },
                        [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
                        [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: '2024-02-18',
                            fødselsdato: '2024-02-18',
                        },
                    }}
                >
                    <SkjemaSteg {...rest} />
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SkalIkkeFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    'https://svp/rest/storage/svangerskapspenger/vedlegg',
                    () => new HttpResponse('uuid-test', { status: 200, headers: { location: 'test.com' } }),
                ),
            ],
        },
    },
    args: {
        tilrettelegging: [defaultTilrettelegging],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: promiseAction(),
        arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
        maxAntallVedlegg: 40,
    },
};

export const SkalFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    'https://svp/rest/storage/svangerskapspenger/vedlegg',
                    () => new HttpResponse(null, { status: 400 }),
                ),
            ],
        },
    },
    args: SkalIkkeFeileOpplasting.args,
};

export const MedVedlegg: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        tilrettelegging: [
            {
                ...defaultTilrettelegging,
                vedlegg: [
                    {
                        id: 'V134300149934973076055420920289127108',
                        filename: file1.name,
                        filesize: file1.size,
                        file: file1,
                        uploaded: true,
                        pending: false,
                        type: AttachmentType.TILRETTELEGGING,
                        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                        url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                        uuid: 'Created',
                    },
                ],
            },
        ],
    },
};

export const MedToTilrettelegginger: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        tilrettelegging: [defaultTilrettelegging, defaultTilrettelegging],
    },
};

export const ErTypeFrilans: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        tilrettelegging: [
            {
                ...defaultTilrettelegging,
                arbeidsforhold: {
                    ...defaultTilrettelegging.arbeidsforhold,
                    type: Arbeidsforholdstype.FRILANSER,
                },
            },
        ],
    },
};

export const KanMaxHaToVedlegg: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        tilrettelegging: [
            {
                ...defaultTilrettelegging,
                vedlegg: [
                    {
                        id: 'V134300149934973076055420920289127108',
                        filename: file1.name,
                        filesize: file1.size,
                        file: file1,
                        uploaded: true,
                        pending: false,
                        type: AttachmentType.TILRETTELEGGING,
                        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                        url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                        uuid: 'Created',
                    },
                ],
            },
            {
                ...defaultTilrettelegging,
                vedlegg: [
                    {
                        id: 'V134300149934973076055420920289127108',
                        filename: file2.name,
                        filesize: file2.size,
                        file: file2,
                        uploaded: true,
                        pending: false,
                        type: AttachmentType.TILRETTELEGGING,
                        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                        url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                        uuid: 'Created',
                    },
                ],
            },
        ],
        maxAntallVedlegg: 2,
    },
};
