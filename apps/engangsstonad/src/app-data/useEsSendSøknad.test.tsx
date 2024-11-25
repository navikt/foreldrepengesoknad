import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import ky, { ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Dokumentasjon } from 'types/Dokumentasjon';
import { OmBarnet } from 'types/OmBarnet';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
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
            uuid: 'uuid-test',
        },
    ],
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
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const omBarnetAdopsjon = {
            adopsjonsdato: '2024-01-02',
            termindato: '2024-01-02',
            antallBarn: 1,
            fødselsdatoer: [{ dato: '2024-01-01' }],
            adopsjonAvEktefellesBarn: true,
        };

        const { result } = renderHook(() => useEsSendSøknad('nb', setKvittering), {
            wrapper: getWrapper(omBarnetAdopsjon, DOKUMENTASJON),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            `${import.meta.env.BASE_URL}/rest/soknad/engangsstonad`,
            expect.objectContaining({
                json: {
                    barn: {
                        type: 'adopsjon',
                        adopsjonAvEktefellesBarn: true,
                        adopsjonsdato: '2024-01-02',
                        antallBarn: 1,
                        fødselsdatoer: ['2024-01-01'],
                        vedleggreferanser: ['1'],
                    },
                    språkkode: 'nb',
                    type: 'engangsstønad',
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    vedlegg: [
                        {
                            ...DOKUMENTASJON.vedlegg[0],
                            dokumenterer: {
                                type: 'barn',
                            },
                        },
                    ],
                },
            }),
        );
    });

    it('skal sende inn korrekt data når barnet er født', async () => {
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const omBarnetErFødt = {
            erBarnetFødt: true,
            antallBarn: 1,
            fødselsdato: '2024-01-01',
            termindato: '2024-01-01',
        };

        const { result } = renderHook(() => useEsSendSøknad('nb', setKvittering), {
            wrapper: getWrapper(omBarnetErFødt),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            `${import.meta.env.BASE_URL}/rest/soknad/engangsstonad`,
            expect.objectContaining({
                json: {
                    barn: {
                        type: 'fødsel',
                        fødselsdato: '2024-01-01',
                        termindato: '2024-01-01',
                        antallBarn: 1,
                        vedleggreferanser: [],
                    },
                    språkkode: 'nb',
                    type: 'engangsstønad',
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    vedlegg: [],
                },
            }),
        );
    });

    it('skal sende inn korrekt data når en venter på fødsel', async () => {
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const omBarnetVenterPåFødsel = {
            erBarnetFødt: false,
            antallBarn: 1,
            fødselsdato: '2024-01-01',
            termindato: '2024-01-01',
        };

        const { result } = renderHook(() => useEsSendSøknad('nb', setKvittering), {
            wrapper: getWrapper(omBarnetVenterPåFødsel, { ...DOKUMENTASJON, terminbekreftelsedato: '2024-01-01' }),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            `${import.meta.env.BASE_URL}/rest/soknad/engangsstonad`,
            expect.objectContaining({
                json: {
                    barn: {
                        type: 'termin',
                        antallBarn: 1,
                        terminbekreftelseDato: '2024-01-01',
                        termindato: '2024-01-01',
                        vedleggreferanser: ['1'],
                    },
                    språkkode: 'nb',
                    type: 'engangsstønad',
                    utenlandsopphold: TIDLIGERE_UTENLANDSOPPHOLD.concat(SENERE_UTENLANDSOPPHOLD),
                    vedlegg: [
                        {
                            ...DOKUMENTASJON.vedlegg[0],
                            dokumenterer: {
                                type: 'barn',
                            },
                        },
                    ],
                },
            }),
        );
    });
});
