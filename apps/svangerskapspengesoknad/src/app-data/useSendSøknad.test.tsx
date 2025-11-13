import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { API_URLS } from 'appData/queries';
import ky, { ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidIUtlandet, ArbeidIUtlandetType } from 'types/ArbeidIUtlandet';
import { AvtaltFeriePerArbeidsgiver } from 'types/AvtaltFerie';
import {
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    PeriodeMedVariasjon,
    TilOgMedDatoType,
} from 'types/Tilrettelegging';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import {
    Attachment,
    AvtaltFerieDto,
    FRILANS_ID,
    NæringDto,
    PersonMedArbeidsforholdDto_fpoversikt,
    SvangerskapspengesøknadDto,
    UtenlandsoppholdPeriode,
} from '@navikt/fp-types';
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

const DEFAULT_SØKER_INFO = {
    arbeidsforhold: [
        {
            arbeidsgiverId: ANNEN_ARBEIDSGIVER_ID,
            arbeidsgiverIdType: 'ikke-orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2018-06-25T00:00:00.000Z',
            stillingsprosent: 80,
        },
        {
            arbeidsgiverId: ARBEIDSGIVER_ID,
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
            fom: '2017-04-05T00:00:00.000Z',
            stillingsprosent: 100,
        },
    ],
    person: {
        navn: {
            etternavn: 'Oravakangas',
            fornavn: 'Erlinga-Mask',
        },
        fnr: '30088930610',
        fødselsdato: '1989-08-30',
        kjønn: 'K',
        barn: [],
    },
} satisfies PersonMedArbeidsforholdDto_fpoversikt;

const BARNET = {
    erBarnetFødt: true,
    fødselsdato: '2024-11-01',
    termindato: '2024-11-02',
};

const TIDLIGERE_UTENLANDSOPPHOLD: UtenlandsoppholdPeriode[] = [
    {
        fom: '2023-01-01',
        tom: '2023-10-01',
        landkode: 'SE',
    },
];
const SENERE_UTENLANDSOPPHOLD: UtenlandsoppholdPeriode[] = [
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

const INGEN_FERIE = [] satisfies AvtaltFerieDto[];

const EGEN_NÆRING = {
    næringstype: 'FISKE',
    fom: '2023-01-01',
    tom: '2023-10-01',
    næringsinntekt: 100000,
    navnPåNæringen: 'Fiskeriet',
    registrertINorge: true,
} satisfies NæringDto;

const VEDLEGG = {
    id: '1',
    file: {} as File,
    filename: 'hello.png',
    filesize: 5,
    pending: false,
    skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
    type: AttachmentType.TERMINBEKREFTELSE,
    uploaded: true,
    uuid: 'uuid-test',
    innsendingsType: 'LASTET_OPP',
} satisfies Attachment;

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
} satisfies ArbeidIUtlandet;

const getWrapper =
    (
        tilrettelegginger: Record<string, DelvisTilrettelegging | IngenTilrettelegging>,
        tilretteleggingerVedlegg: Record<string, Attachment[]>,
        tilretteleggingerPerioder?: Record<string, PeriodeMedVariasjon[]>,
        ferie?: AvtaltFeriePerArbeidsgiver,
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
                            [ContextDataType.FERIE]: ferie,
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
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const tilrettelegginger = {
            [ARBEIDSGIVER_ID]: {
                behovForTilretteleggingFom: '2024-05-10',
                type: 'delvis',
                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                enPeriodeMedTilretteleggingStillingsprosent: '50',
                enPeriodeMedTilretteleggingFom: '2024-05-10',
            } satisfies DelvisTilrettelegging,
            [ANNEN_ARBEIDSGIVER_ID]: {
                behovForTilretteleggingFom: '2024-09-10',
                type: 'ingen',
                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.VALGFRI_DATO,
                enPeriodeMedTilretteleggingFom: '2024-09-10',
                enPeriodeMedTilretteleggingTilbakeIJobbDato: '2024-10-10',
            } satisfies IngenTilrettelegging,
        };

        const tilretteleggingerVedlegg = {
            [ARBEIDSGIVER_ID]: [VEDLEGG],
            [ANNEN_ARBEIDSGIVER_ID]: [VEDLEGG],
        };

        const ferie = {
            [ARBEIDSGIVER_ID]: {
                skalHaFerie: true,
                feriePerioder: [
                    {
                        arbeidsforhold: {
                            type: 'virksomhet',
                            id: ARBEIDSGIVER_ID,
                        },
                        fom: '2024-09-10',
                        tom: '2024-10-10',
                    },
                ],
            },
        } satisfies AvtaltFeriePerArbeidsgiver;

        const { result } = renderHook(() => useSendSøknad(DEFAULT_SØKER_INFO), {
            wrapper: getWrapper(tilrettelegginger, tilretteleggingerVedlegg, undefined, ferie),
        });

        await result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.sendSøknad,
            expect.objectContaining({
                json: {
                    søkerinfo: {
                        fnr: DEFAULT_SØKER_INFO.person.fnr,
                        navn: DEFAULT_SØKER_INFO.person.navn,
                        arbeidsforhold: DEFAULT_SØKER_INFO.arbeidsforhold.map((af) => ({
                            navn: af.arbeidsgiverNavn,
                            orgnummer: af.arbeidsgiverId,
                            stillingsprosent: af.stillingsprosent,
                            fom: af.fom,
                        })),
                    },
                    språkkode: 'NB',
                    barn: BARNET,
                    frilans: FRILANS,
                    avtaltFerie: ferie[ARBEIDSGIVER_ID].feriePerioder,
                    egenNæring: EGEN_NÆRING,
                    andreInntekterSiste10Mnd: ARBEID_I_UTLANDET.arbeidIUtlandet,
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    tilretteleggingsbehov: [
                        {
                            arbeidsforhold: {
                                id: ARBEIDSGIVER_ID,
                                type: 'virksomhet',
                            },
                            behovForTilretteleggingFom: '2024-05-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-05-10',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-10-11',
                                    stillingsprosent: 50,
                                    type: 'delvis',
                                },
                            ],
                            risikofaktorer: undefined,
                            tilretteleggingstiltak: undefined,
                        },
                        {
                            arbeidsforhold: {
                                id: ANNEN_ARBEIDSGIVER_ID,
                                type: 'privat',
                            },
                            behovForTilretteleggingFom: '2024-09-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-09-10',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-10-09',
                                    stillingsprosent: 0,
                                    type: 'ingen',
                                },
                                {
                                    fom: '2024-10-10',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-10-11',
                                    stillingsprosent: 80,
                                    type: 'hel',
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
                                    type: 'virksomhet',
                                },
                                type: 'TILRETTELEGGING',
                            },
                        },
                        {
                            ...VEDLEGG,
                            dokumenterer: {
                                arbeidsforhold: {
                                    id: ANNEN_ARBEIDSGIVER_ID,
                                    type: 'privat',
                                },
                                type: 'TILRETTELEGGING',
                            },
                        },
                    ],
                } satisfies SvangerskapspengesøknadDto,
            }),
        );
    });

    it('skal sende inn tilrettelegging for næring og frilans', async () => {
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const tilrettelegginger = {
            [EGEN_NÆRING_ID]: {
                behovForTilretteleggingFom: '2024-05-10',
                type: 'delvis',
                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                enPeriodeMedTilretteleggingStillingsprosent: '50',
                enPeriodeMedTilretteleggingFom: '2024-05-10',
            } satisfies DelvisTilrettelegging,
            [FRILANS_ID]: {
                behovForTilretteleggingFom: '2024-09-10',
                type: 'ingen',
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

        const { result } = renderHook(() => useSendSøknad(DEFAULT_SØKER_INFO), {
            wrapper: getWrapper(tilrettelegginger, tilretteleggingerVedlegg),
        });

        await result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.sendSøknad,
            expect.objectContaining({
                json: {
                    søkerinfo: {
                        fnr: DEFAULT_SØKER_INFO.person.fnr,
                        navn: DEFAULT_SØKER_INFO.person.navn,
                        arbeidsforhold: DEFAULT_SØKER_INFO.arbeidsforhold.map((af) => ({
                            navn: af.arbeidsgiverNavn,
                            orgnummer: af.arbeidsgiverId,
                            stillingsprosent: af.stillingsprosent,
                            fom: af.fom,
                        })),
                    },
                    språkkode: 'NB',
                    barn: BARNET,
                    frilans: FRILANS,
                    avtaltFerie: INGEN_FERIE,
                    egenNæring: EGEN_NÆRING,
                    andreInntekterSiste10Mnd: ARBEID_I_UTLANDET.arbeidIUtlandet,
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    tilretteleggingsbehov: [
                        {
                            arbeidsforhold: {
                                id: EGEN_NÆRING_ID,
                                type: 'selvstendig',
                            },
                            behovForTilretteleggingFom: '2024-05-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-05-10',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-10-11',
                                    stillingsprosent: 50,
                                    type: 'delvis',
                                },
                            ],
                            risikofaktorer: undefined,
                            tilretteleggingstiltak: undefined,
                        },
                        {
                            arbeidsforhold: {
                                id: FRILANS_ID,
                                type: 'frilanser',
                            },
                            behovForTilretteleggingFom: '2024-09-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-09-10',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-10-11',
                                    stillingsprosent: 0,
                                    type: 'ingen',
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
                                    type: 'selvstendig',
                                },
                                type: 'TILRETTELEGGING',
                            },
                        },
                        {
                            ...VEDLEGG,
                            dokumenterer: {
                                arbeidsforhold: {
                                    id: FRILANS_ID,
                                    type: 'frilanser',
                                },
                                type: 'TILRETTELEGGING',
                            },
                        },
                    ],
                } satisfies SvangerskapspengesøknadDto,
            }),
        );
    });

    it('skal sende inn tilrettelegging med mange perioder', async () => {
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const tilrettelegginger = {
            [ARBEIDSGIVER_ID]: {
                behovForTilretteleggingFom: '2024-05-10',
                type: 'delvis',
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

        const { result } = renderHook(() => useSendSøknad(DEFAULT_SØKER_INFO), {
            wrapper: getWrapper(tilrettelegginger, tilretteleggingerVedlegg, tilretteleggingPerioder),
        });

        await result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.sendSøknad,
            expect.objectContaining({
                json: {
                    søkerinfo: {
                        fnr: DEFAULT_SØKER_INFO.person.fnr,
                        navn: DEFAULT_SØKER_INFO.person.navn,
                        arbeidsforhold: DEFAULT_SØKER_INFO.arbeidsforhold.map((af) => ({
                            navn: af.arbeidsgiverNavn,
                            orgnummer: af.arbeidsgiverId,
                            stillingsprosent: af.stillingsprosent,
                            fom: af.fom,
                        })),
                    },
                    språkkode: 'NB',
                    barn: BARNET,
                    frilans: FRILANS,
                    avtaltFerie: INGEN_FERIE,
                    egenNæring: EGEN_NÆRING,
                    andreInntekterSiste10Mnd: ARBEID_I_UTLANDET.arbeidIUtlandet,
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    tilretteleggingsbehov: [
                        {
                            arbeidsforhold: {
                                id: ARBEIDSGIVER_ID,
                                type: 'virksomhet',
                            },
                            behovForTilretteleggingFom: '2024-05-10',
                            tilrettelegginger: [
                                {
                                    fom: '2024-05-10',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-06-01',
                                    stillingsprosent: 50,
                                    type: 'delvis',
                                },
                                {
                                    fom: '2024-06-02',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-08-01',
                                    stillingsprosent: 0,
                                    type: 'ingen',
                                },
                                {
                                    fom: '2024-08-02',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-09-25',
                                    stillingsprosent: 70,
                                    type: 'delvis',
                                },
                                {
                                    fom: '2024-09-26',
                                    // @ts-expect-error -- Har alltid sendt med ekstra data
                                    tom: '2024-10-11',
                                    stillingsprosent: 100,
                                    type: 'hel',
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
                                    type: 'virksomhet',
                                },
                                type: 'TILRETTELEGGING',
                            },
                        },
                    ],
                } satisfies SvangerskapspengesøknadDto,
            }),
        );
    });
});
