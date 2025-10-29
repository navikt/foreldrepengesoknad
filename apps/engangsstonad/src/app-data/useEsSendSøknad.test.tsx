import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { API_URLS } from 'appData/queries';
import ky, { ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Dokumentasjon } from 'types/Dokumentasjon';
import { OmBarnet } from 'types/OmBarnet';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { EngangsstønadDto, PersonDto_fpoversikt, UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/messages/nb_NO.json';
import { ContextDataType, EsDataContext } from './EsDataContext';
import { useEsSendSøknad } from './useEsSendSøknad';

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

const DOKUMENTASJON = {
    vedlegg: [
        {
            id: '1',
            file: {} as File,
            filename: 'hello.png',
            filesize: 5,
            pending: false,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
            type: AttachmentType.TERMINBEKREFTELSE,
            uploaded: true,
            url: 'test.com',
            innsendingsType: 'LASTET_OPP',
            uuid: 'uuid-test',
        } as const,
    ],
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

const DEFAULT_PERSONINFO = {
    fnr: '11111111111',
    navn: {
        fornavn: 'Henrikke',
        etternavn: 'Ibsen',
    },
    kjønn: 'K',
    fødselsdato: '1979-01-28',
    bankkonto: {
        kontonummer: '49875234987',
        banknavn: 'Storebank',
    },
    barn: [],
} satisfies PersonDto_fpoversikt;

const getWrapper =
    (barnet: OmBarnet, dokumentasjon?: Dokumentasjon) =>
    ({ children }: { children: ReactNode }) => (
        <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EsDataContext
                        initialState={{
                            [ContextDataType.OM_BARNET]: barnet,
                            [ContextDataType.DOKUMENTASJON]: dokumentasjon,
                            [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: TIDLIGERE_UTENLANDSOPPHOLD,
                            [ContextDataType.UTENLANDSOPPHOLD_SENERE]: SENERE_UTENLANDSOPPHOLD,
                        }}
                    >
                        {children}
                    </EsDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        </IntlProvider>
    );

vi.mock('ky');

describe('useEsSendSøknad', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('skal sende inn korrekt data ved adopsjon', async () => {
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const omBarnetAdopsjon = {
            adopsjonsdato: '2024-01-02',
            termindato: '2024-01-02',
            antallBarn: 1,
            fødselsdatoer: [{ dato: '2024-01-01' }],
            adopsjonAvEktefellesBarn: true,
        };

        const { result } = renderHook(() => useEsSendSøknad(DEFAULT_PERSONINFO), {
            wrapper: getWrapper(omBarnetAdopsjon, DOKUMENTASJON),
        });

        await result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.sendSøknad,
            expect.objectContaining({
                json: {
                    søkerinfo: {
                        fnr: DEFAULT_PERSONINFO.fnr,
                        navn: DEFAULT_PERSONINFO.navn,
                    },
                    barn: {
                        type: 'adopsjon',
                        adopsjonAvEktefellesBarn: true,
                        adopsjonsdato: '2024-01-02',
                        antallBarn: 1,
                        fødselsdatoer: ['2024-01-01'],
                    },
                    språkkode: 'NB',
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    vedlegg: [
                        {
                            ...DOKUMENTASJON.vedlegg[0],
                            dokumenterer: {
                                type: 'BARN',
                            },
                        },
                    ],
                } satisfies EngangsstønadDto,
            }),
        );
    });

    it('skal sende inn korrekt data når barnet er født', async () => {
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const omBarnetErFødt = {
            erBarnetFødt: true,
            antallBarn: 1,
            fødselsdato: '2024-01-01',
            termindato: '2024-01-01',
        };
        const { result } = renderHook(() => useEsSendSøknad(DEFAULT_PERSONINFO), {
            wrapper: getWrapper(omBarnetErFødt),
        });

        await result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.sendSøknad,
            expect.objectContaining({
                json: {
                    søkerinfo: {
                        fnr: DEFAULT_PERSONINFO.fnr,
                        navn: DEFAULT_PERSONINFO.navn,
                    },
                    barn: {
                        type: 'fødsel',
                        fødselsdato: '2024-01-01',
                        termindato: '2024-01-01',
                        antallBarn: 1,
                    },
                    språkkode: 'NB',
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    vedlegg: [],
                } satisfies EngangsstønadDto,
            }),
        );
    });

    it('skal sende inn korrekt data når en venter på fødsel', async () => {
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const omBarnetVenterPåFødsel = {
            erBarnetFødt: false,
            antallBarn: 1,
            fødselsdato: '2024-01-01',
            termindato: '2024-01-01',
        };

        const { result } = renderHook(() => useEsSendSøknad(DEFAULT_PERSONINFO), {
            wrapper: getWrapper(omBarnetVenterPåFødsel, { ...DOKUMENTASJON, terminbekreftelsedato: '2024-01-01' }),
        });

        await result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.sendSøknad,
            expect.objectContaining({
                json: {
                    søkerinfo: {
                        fnr: DEFAULT_PERSONINFO.fnr,
                        navn: DEFAULT_PERSONINFO.navn,
                    },
                    barn: {
                        type: 'termin',
                        antallBarn: 1,
                        terminbekreftelseDato: '2024-01-01',
                        termindato: '2024-01-01',
                    },
                    språkkode: 'NB',
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    vedlegg: [
                        {
                            ...DOKUMENTASJON.vedlegg[0],
                            dokumenterer: {
                                type: 'BARN',
                            },
                        },
                    ],
                } satisfies EngangsstønadDto,
            }),
        );
    });
});
