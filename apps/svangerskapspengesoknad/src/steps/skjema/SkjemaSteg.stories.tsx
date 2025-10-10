import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { API_URLS } from 'appData/queries';
import { SøknadRoute, TILRETTELEGGING_PARAM, addTilretteleggingIdToRoute } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { action } from 'storybook/actions';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import { ArbeidsforholdOgInntektSvp, Attachment, FRILANS_ID } from '@navikt/fp-types';

import { SkjemaSteg } from './SkjemaSteg';

const file1 = new File(['abc'.repeat(100000)], 'Filnavn1.jpg');
const file2 = new File(['abc'.repeat(500000)], 'Filnavn2.jpg');

const ARBEIDSGIVER_ID = '990322244';
const ANNEN_ARBEIDSGIVER_ID = '975326209';

const DEFAULT_ARBEIDSFORHOLD = [
    {
        arbeidsgiverId: ANNEN_ARBEIDSGIVER_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
    {
        arbeidsgiverId: ARBEIDSGIVER_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
];

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    vedlegg?: Record<string, Attachment[]>;
    valgteArbeidsforhold?: string[];
    valgtTilretteleggingId: string;
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektSvp;
} & ComponentProps<typeof SkjemaSteg>;

const meta = {
    title: 'steps/SkjemaSteg',
    component: SkjemaSteg,
    render: ({
        gåTilNesteSide = action('button-click'),
        vedlegg,
        valgteArbeidsforhold,
        valgtTilretteleggingId,
        arbeidsforholdOgInntekt,
        ...rest
    }) => {
        return (
            <MemoryRouter initialEntries={[addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, valgtTilretteleggingId)]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
                        [ContextDataType.TILRETTELEGGINGER_VEDLEGG]: vedlegg,
                        [ContextDataType.VALGTE_ARBEIDSFORHOLD]: valgteArbeidsforhold,
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: '2024-02-18',
                            fødselsdato: '2024-02-18',
                        },
                    }}
                >
                    <Routes>
                        <Route
                            element={<SkjemaSteg {...rest} />}
                            path={`/${SøknadRoute.SKJEMA}/${TILRETTELEGGING_PARAM}`}
                        />
                    </Routes>
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
                    API_URLS.sendVedlegg,
                    () =>
                        new HttpResponse(JSON.stringify('uuid-test'), {
                            status: 200,
                            headers: { location: 'test.com' },
                        }),
                ),
            ],
        },
    },
    args: {
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: promiseAction(),
        arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
        maxAntallVedlegg: 40,
        valgtTilretteleggingId: ARBEIDSGIVER_ID,
        arbeidsforholdOgInntekt: {
            harHattArbeidIUtlandet: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
    },
};

export const SkalFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse(null, { status: 400 }))],
        },
    },
    args: SkalIkkeFeileOpplasting.args,
};

export const MedVedlegg: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        vedlegg: {
            [ARBEIDSGIVER_ID]: [
                {
                    id: 'V134300149934973076055420920289127108',
                    filename: file1.name,
                    filesize: file1.size,
                    file: file1,
                    innsendingsType: 'LASTET_OPP',
                    uploaded: true,
                    pending: false,
                    type: AttachmentType.TILRETTELEGGING,
                    skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                    url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                    uuid: 'Created',
                },
            ],
        },
    },
};

export const MedToTilrettelegginger: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        valgteArbeidsforhold: [ARBEIDSGIVER_ID, ANNEN_ARBEIDSGIVER_ID],
    },
};

export const ErTypeFrilans: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        valgtTilretteleggingId: FRILANS_ID,
        valgteArbeidsforhold: [FRILANS_ID],
        arbeidsforholdOgInntekt: {
            harHattArbeidIUtlandet: false,
            harJobbetSomFrilans: true,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
    },
};

export const ErTypeEgenNæring: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        valgtTilretteleggingId: EGEN_NÆRING_ID,
        valgteArbeidsforhold: [EGEN_NÆRING_ID],
        arbeidsforholdOgInntekt: {
            harHattArbeidIUtlandet: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: true,
        },
    },
};

export const KanMaxHaToVedlegg: Story = {
    parameters: SkalIkkeFeileOpplasting.parameters,
    args: {
        ...SkalIkkeFeileOpplasting.args,
        valgtTilretteleggingId: ARBEIDSGIVER_ID,
        vedlegg: {
            [ARBEIDSGIVER_ID]: [
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
                    innsendingsType: 'LASTET_OPP',
                },
                {
                    id: 'V134300149934973076055420920289127101',
                    filename: file2.name,
                    filesize: file2.size,
                    file: file2,
                    uploaded: true,
                    pending: false,
                    type: AttachmentType.TILRETTELEGGING,
                    skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                    url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                    uuid: 'Created',
                    innsendingsType: 'LASTET_OPP',
                },
            ],
        },
        maxAntallVedlegg: 2,
    },
};
