import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import ky, { ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidIUtlandetType } from 'types/ArbeidIUtlandet';
import Tilrettelegging, { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'types/Tilrettelegging';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Næringstype } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/nb_NO.json';
import { ContextDataType, SvpDataContext } from './SvpDataContext';
import useSendSøknad from './useSendSøknad';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: nbMessages,
};

const BARNET = {
    erBarnetFødt: true,
    fødselsdato: '2024-01-01',
    termindato: '2024-01-02',
};

const TIDLIGERE_UTENLANDSOPPHOLD = [
    {
        fom: '2023-01-01',
        tom: '2023-10-01',
        landkode: 'SE',
    },
];
const SENERE_UTENLANDSOPPHOLD = [
    {
        fom: '2025-01-01',
        tom: '2025-10-01',
        landkode: 'SE',
    },
];

const FRILANS = {
    jobberFremdelesSomFrilans: true,
    oppstart: '2024-01-01',
};

const EGEN_NÆRING = {
    næringstype: Næringstype.FISKER,
    fom: '2023-01-01',
    tom: '2023-10-01',
    næringsinntekt: 100000,
    pågående: false,
    navnPåNæringen: 'Fiskeriet',
    registrertINorge: true,
};

const VEDLEGG = {
    id: '1',
    file: {} as File,
    filename: 'hello.png',
    filesize: 5,
    pending: false,
    skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
    type: AttachmentType.TERMINBEKREFTELSE,
    uploaded: true,
    url: 'test.com',
    uuid: 'uuid-test',
};

const ARBEID_I_UTLANDET = {
    arbeidIUtlandet: [
        {
            type: ArbeidIUtlandetType.JOBB_I_UTLANDET,
            fom: '2023-10-10',
            tom: undefined,
            pågående: true,
            arbeidsgiverNavn: 'MUFC',
            land: 'UK',
        },
    ],
};

const getWrapper =
    (tilrettelegginger: Tilrettelegging[]) =>
    ({ children }: { children: ReactNode }) => (
        <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <SvpDataContext
                        initialState={{
                            [ContextDataType.OM_BARNET]: BARNET,
                            [ContextDataType.FRILANS]: FRILANS,
                            [ContextDataType.EGEN_NÆRING]: EGEN_NÆRING,
                            [ContextDataType.ARBEID_I_UTLANDET]: ARBEID_I_UTLANDET,
                            [ContextDataType.TILRETTELEGGINGER]: tilrettelegginger,
                            [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: TIDLIGERE_UTENLANDSOPPHOLD,
                            [ContextDataType.UTENLANDSOPPHOLD_SENERE]: SENERE_UTENLANDSOPPHOLD,
                        }}
                    >
                        {children}
                    </SvpDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        </IntlProvider>
    );

vi.mock('ky');

describe('useSendSøknad', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('skal sende inn korrekt data', async () => {
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const tilrettelegginger = [
            {
                id: '1',
                behovForTilretteleggingFom: '2024-10-10',
                arbeidsforhold: {
                    arbeidsgiverId: '1',
                    type: Arbeidsforholdstype.VIRKSOMHET,
                    navn: 'Virksomhetsnavn',
                    stillinger: [
                        {
                            fom: '2024-01-01',
                            stillingsprosent: 100,
                        },
                    ],
                    startdato: '2024-01-01',
                },
                type: TilretteleggingstypeOptions.DELVIS,
                vedlegg: [VEDLEGG],
            },
        ];

        const { result } = renderHook(() => useSendSøknad(setKvittering, 'nb'), {
            wrapper: getWrapper(tilrettelegginger),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            'https://svp/rest/soknad/svangerskapspenger',
            expect.objectContaining({
                json: {
                    språkkode: 'nb',
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    andreInntekterSiste10Mnd: ARBEID_I_UTLANDET.arbeidIUtlandet,
                    barn: BARNET,
                    egenNæring: EGEN_NÆRING,
                    frilans: FRILANS,
                    tilrettelegging: [
                        {
                            arbeidsforhold: {
                                id: '1',
                                type: 'virksomhet',
                            },
                            behovForTilretteleggingFom: '2024-10-10',
                            slutteArbeidFom: undefined,
                            type: 'ingen',
                        },
                    ],
                    vedlegg: [
                        {
                            ...VEDLEGG,
                            dokumenterer: {
                                arbeidsforhold: {
                                    id: '1',
                                    type: 'virksomhet',
                                },
                                type: 'TILRETTELEGGING',
                            },
                        },
                    ],
                },
            }),
        );
    });
});
