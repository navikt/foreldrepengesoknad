import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import ky, { ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidIUtlandetType } from 'types/ArbeidIUtlandet';
import {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    PeriodeMedVariasjon,
    TilOgMedDatoType,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';

import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, EGEN_NÆRING_ID, FRILANS_ID, Næringstype } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/nb_NO.json';
import { ContextDataType, SvpDataContext } from './SvpDataContext';
import { useSendSøknad } from './useSendSøknad';

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

const ARBEIDSGIVER_ID = '990322244';
const ANNEN_ARBEIDSGIVER_ID = '9903232324';

const DEFAULT_ARBEIDSFORHOLD = [
    {
        id: '86832061-1118-9701-6179-20647729409710',
        arbeidsgiverId: ANNEN_ARBEIDSGIVER_ID,
        arbeidsgiverIdType: 'ikke-orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-06-25T00:00:00.000Z',
        stillingsprosent: 80,
    },
    {
        id: '263929546-6215-9868-5127-161910165730101',
        arbeidsgiverId: ARBEIDSGIVER_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
];

const BARNET = {
    erBarnetFødt: true,
    fødselsdato: '2024-11-01',
    termindato: '2024-11-02',
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
    (
        tilrettelegginger: Record<string, DelvisTilrettelegging | IngenTilrettelegging>,
        tilretteleggingerVedlegg: Record<string, Attachment[]>,
        tilretteleggingerPerioder?: Record<string, PeriodeMedVariasjon[]>,
    ) =>
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
                            [ContextDataType.TILRETTELEGGINGER_PERIODER]: tilretteleggingerPerioder,
                            [ContextDataType.TILRETTELEGGINGER_VEDLEGG]: tilretteleggingerVedlegg,
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

    it('skal sende inn tilrettelegging for to arbeidsforhold', async () => {
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const tilrettelegginger = {
            [ARBEIDSGIVER_ID]: {
                behovForTilretteleggingFom: '2024-05-10',
                type: Tilretteleggingstype.DELVIS,
                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                enPeriodeMedTilretteleggingStillingsprosent: '50',
                enPeriodeMedTilretteleggingFom: '2024-05-10',
            } satisfies DelvisTilrettelegging,
            [ANNEN_ARBEIDSGIVER_ID]: {
                behovForTilretteleggingFom: '2024-09-10',
                type: Tilretteleggingstype.INGEN,
                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.VALGFRI_DATO,
                enPeriodeMedTilretteleggingFom: '2024-09-10',
                enPeriodeMedTilretteleggingTilbakeIJobbDato: '2024-10-10',
            } satisfies IngenTilrettelegging,
        };

        const tilretteleggingerVedlegg = {
            [ARBEIDSGIVER_ID]: [VEDLEGG],
            [ANNEN_ARBEIDSGIVER_ID]: [VEDLEGG],
        };

        const { result } = renderHook(() => useSendSøknad(setKvittering, 'nb', DEFAULT_ARBEIDSFORHOLD), {
            wrapper: getWrapper(tilrettelegginger, tilretteleggingerVedlegg),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            `${import.meta.env.BASE_URL}/rest/soknad/svangerskapspenger`,
            expect.objectContaining({
                json: {
                    språkkode: 'nb',
                    barn: BARNET,
                    frilans: FRILANS,
                    egenNæring: EGEN_NÆRING,
                    andreInntekterSiste10Mnd: ARBEID_I_UTLANDET.arbeidIUtlandet,
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    tilretteleggingsbehov: [
                        {
                            arbeidsforhold: {
                                id: ARBEIDSGIVER_ID,
                                type: Arbeidsforholdstype.VIRKSOMHET,
                            },
                            behovForTilretteleggingFom: '2024-05-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-05-10',
                                    tom: '2024-10-11',
                                    stillingsprosent: 50,
                                    type: Tilretteleggingstype.DELVIS,
                                },
                            ],
                            risikofaktorer: undefined,
                            tilretteleggingstiltak: undefined,
                        },
                        {
                            arbeidsforhold: {
                                id: ANNEN_ARBEIDSGIVER_ID,
                                type: Arbeidsforholdstype.PRIVAT,
                            },
                            behovForTilretteleggingFom: '2024-09-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-09-10',
                                    tom: '2024-10-09',
                                    stillingsprosent: 0,
                                    type: Tilretteleggingstype.INGEN,
                                },
                                {
                                    fom: '2024-10-10',
                                    tom: '2024-10-11',
                                    stillingsprosent: 80,
                                    type: Tilretteleggingstype.HEL,
                                },
                            ],
                            risikofaktorer: undefined,
                            tilretteleggingstiltak: undefined,
                        },
                    ],
                    vedlegg: [
                        {
                            ...VEDLEGG,
                            dokumenterer: {
                                arbeidsforhold: {
                                    id: ARBEIDSGIVER_ID,
                                    type: Arbeidsforholdstype.VIRKSOMHET,
                                },
                                type: AttachmentMetadataType.TILRETTELEGGING,
                            },
                        },
                        {
                            ...VEDLEGG,
                            dokumenterer: {
                                arbeidsforhold: {
                                    id: ANNEN_ARBEIDSGIVER_ID,
                                    type: Arbeidsforholdstype.PRIVAT,
                                },
                                type: AttachmentMetadataType.TILRETTELEGGING,
                            },
                        },
                    ],
                },
            }),
        );
    });

    it('skal sende inn tilrettelegging for næring og frilans', async () => {
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const tilrettelegginger = {
            [EGEN_NÆRING_ID]: {
                behovForTilretteleggingFom: '2024-05-10',
                type: Tilretteleggingstype.DELVIS,
                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                enPeriodeMedTilretteleggingStillingsprosent: '50',
                enPeriodeMedTilretteleggingFom: '2024-05-10',
            } satisfies DelvisTilrettelegging,
            [FRILANS_ID]: {
                behovForTilretteleggingFom: '2024-09-10',
                type: Tilretteleggingstype.INGEN,
                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                enPeriodeMedTilretteleggingFom: '2024-09-10',
                risikofaktorer: 'Dette er en risikofaktor',
                tilretteleggingstiltak: 'Dette er et tiltak',
            } satisfies IngenTilrettelegging,
        };

        const tilretteleggingerVedlegg = {
            [EGEN_NÆRING_ID]: [VEDLEGG],
            [FRILANS_ID]: [VEDLEGG],
        };

        const { result } = renderHook(() => useSendSøknad(setKvittering, 'nb', []), {
            wrapper: getWrapper(tilrettelegginger, tilretteleggingerVedlegg),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            `${import.meta.env.BASE_URL}/rest/soknad/svangerskapspenger`,
            expect.objectContaining({
                json: {
                    språkkode: 'nb',
                    barn: BARNET,
                    frilans: FRILANS,
                    egenNæring: EGEN_NÆRING,
                    andreInntekterSiste10Mnd: ARBEID_I_UTLANDET.arbeidIUtlandet,
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    tilretteleggingsbehov: [
                        {
                            arbeidsforhold: {
                                id: EGEN_NÆRING_ID,
                                type: Arbeidsforholdstype.SELVSTENDIG,
                            },
                            behovForTilretteleggingFom: '2024-05-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-05-10',
                                    tom: '2024-10-11',
                                    stillingsprosent: 50,
                                    type: Tilretteleggingstype.DELVIS,
                                },
                            ],
                            risikofaktorer: undefined,
                            tilretteleggingstiltak: undefined,
                        },
                        {
                            arbeidsforhold: {
                                id: FRILANS_ID,
                                type: Arbeidsforholdstype.FRILANSER,
                            },
                            behovForTilretteleggingFom: '2024-09-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-09-10',
                                    tom: '2024-10-11',
                                    stillingsprosent: 0,
                                    type: Tilretteleggingstype.INGEN,
                                },
                            ],
                            risikofaktorer: 'Dette er en risikofaktor',
                            tilretteleggingstiltak: 'Dette er et tiltak',
                        },
                    ],
                    vedlegg: [
                        {
                            ...VEDLEGG,
                            dokumenterer: {
                                arbeidsforhold: {
                                    id: EGEN_NÆRING_ID,
                                    type: Arbeidsforholdstype.SELVSTENDIG,
                                },
                                type: AttachmentMetadataType.TILRETTELEGGING,
                            },
                        },
                        {
                            ...VEDLEGG,
                            dokumenterer: {
                                arbeidsforhold: {
                                    id: FRILANS_ID,
                                    type: Arbeidsforholdstype.FRILANSER,
                                },
                                type: AttachmentMetadataType.TILRETTELEGGING,
                            },
                        },
                    ],
                },
            }),
        );
    });

    it('skal sende inn tilrettelegging med mange perioder', async () => {
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const tilrettelegginger = {
            [ARBEIDSGIVER_ID]: {
                behovForTilretteleggingFom: '2024-05-10',
                type: Tilretteleggingstype.DELVIS,
                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
            } satisfies DelvisTilrettelegging,
        };

        const tilretteleggingPerioder = {
            [ARBEIDSGIVER_ID]: [
                {
                    tomType: TilOgMedDatoType.VALGFRI_DATO,
                    fom: '2024-05-10',
                    tom: '2024-06-01',
                    stillingsprosent: '50',
                },
                {
                    tomType: TilOgMedDatoType.VALGFRI_DATO,
                    fom: '2024-06-02',
                    tom: '2024-08-01',
                    stillingsprosent: '0',
                },
                {
                    tomType: TilOgMedDatoType.VALGFRI_DATO,
                    fom: '2024-08-02',
                    tom: '2024-09-25',
                    stillingsprosent: '70',
                },
            ] satisfies PeriodeMedVariasjon[],
        };

        const tilretteleggingerVedlegg = {
            [ARBEIDSGIVER_ID]: [VEDLEGG],
        };

        const { result } = renderHook(() => useSendSøknad(setKvittering, 'nb', DEFAULT_ARBEIDSFORHOLD), {
            wrapper: getWrapper(tilrettelegginger, tilretteleggingerVedlegg, tilretteleggingPerioder),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            `${import.meta.env.BASE_URL}/rest/soknad/svangerskapspenger`,
            expect.objectContaining({
                json: {
                    språkkode: 'nb',
                    barn: BARNET,
                    frilans: FRILANS,
                    egenNæring: EGEN_NÆRING,
                    andreInntekterSiste10Mnd: ARBEID_I_UTLANDET.arbeidIUtlandet,
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    tilretteleggingsbehov: [
                        {
                            arbeidsforhold: {
                                id: ARBEIDSGIVER_ID,
                                type: Arbeidsforholdstype.VIRKSOMHET,
                            },
                            behovForTilretteleggingFom: '2024-05-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-05-10',
                                    tom: '2024-06-01',
                                    stillingsprosent: 50,
                                    type: Tilretteleggingstype.DELVIS,
                                },
                                {
                                    fom: '2024-06-02',
                                    tom: '2024-08-01',
                                    stillingsprosent: 0,
                                    type: Tilretteleggingstype.INGEN,
                                },
                                {
                                    fom: '2024-08-02',
                                    tom: '2024-09-25',
                                    stillingsprosent: 70,
                                    type: Tilretteleggingstype.DELVIS,
                                },
                                {
                                    fom: '2024-09-26',
                                    tom: '2024-10-11',
                                    stillingsprosent: 100,
                                    type: Tilretteleggingstype.HEL,
                                },
                            ],
                            risikofaktorer: undefined,
                            tilretteleggingstiltak: undefined,
                        },
                    ],
                    vedlegg: [
                        {
                            ...VEDLEGG,
                            dokumenterer: {
                                arbeidsforhold: {
                                    id: ARBEIDSGIVER_ID,
                                    type: Arbeidsforholdstype.VIRKSOMHET,
                                },
                                type: AttachmentMetadataType.TILRETTELEGGING,
                            },
                        },
                    ],
                },
            }),
        );
    });
});
