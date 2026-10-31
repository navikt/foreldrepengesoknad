import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { API_URLS } from 'api/queries';
import { SøknadRoutes } from 'appData/routes';
import ky, { HTTPError, ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { FpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, FpDataContext, useContextSaveData } from './FpDataContext';
import { useMellomlagreSøknad } from './useMellomlagreSøknad';

const SØKER_INFO = { fnr: '12345678910' } as FpPersonopplysningerDto_fpoversikt;

const lagDeferred = () => Promise.withResolvers<void>();

const lagHttpError = (status: number) =>
    new HTTPError(new Response(null, { status }), new Request('https://example.com'), {} as never);

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter>
            <FpDataContext initialState={{ [ContextDataType.APP_ROUTE]: SøknadRoutes.SØKERSITUASJON }}>
                {children}
            </FpDataContext>
        </MemoryRouter>
    </QueryClientProvider>
);

const renderMellomlagring = () =>
    renderHook(
        () => ({
            ...useMellomlagreSøknad([], SØKER_INFO, false),
            oppdaterRoute: useContextSaveData(ContextDataType.APP_ROUTE),
        }),
        { wrapper },
    );

const lagretRoute = (kall: unknown[]) => (kall[1] as { json: Record<string, unknown> }).json[ContextDataType.APP_ROUTE];

describe('useMellomlagreSøknad', () => {
    const reload = vi.fn();

    beforeEach(() => {
        vi.stubGlobal('location', { reload, assign: vi.fn() });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        reload.mockReset();
    });

    it('skal ikke starte ny lagring før forrige er ferdig, og lagre siste versjon av søknaden', async () => {
        const førsteLagring = lagDeferred();
        const postMock = vi
            .spyOn(ky, 'post')
            .mockReturnValueOnce(førsteLagring.promise as unknown as ResponsePromise)
            .mockReturnValue(Promise.resolve() as unknown as ResponsePromise);

        const { result } = renderMellomlagring();

        const onFerdig = vi.fn();
        let første: Promise<void> = Promise.resolve();
        act(() => {
            første = result.current.mellomlagreSøknad({ onFerdig });
        });
        await waitFor(() => expect(postMock).toHaveBeenCalledTimes(1));

        let andre: Promise<void> = Promise.resolve();
        let tredje: Promise<void> = Promise.resolve();
        act(() => {
            result.current.oppdaterRoute(SøknadRoutes.OM_BARNET);
            andre = result.current.mellomlagreSøknad({ onFerdig });
        });
        act(() => {
            result.current.oppdaterRoute(SøknadRoutes.ANNEN_FORELDER);
            tredje = result.current.mellomlagreSøknad({ onFerdig });
        });

        expect(postMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            førsteLagring.resolve();
            await Promise.all([første, andre, tredje]);
        });

        expect(postMock).toHaveBeenCalledTimes(2);
        expect(lagretRoute(postMock.mock.calls[0]!)).toBe(SøknadRoutes.SØKERSITUASJON);
        expect(lagretRoute(postMock.mock.calls[1]!)).toBe(SøknadRoutes.ANNEN_FORELDER);
        expect(onFerdig).toHaveBeenCalledTimes(3);
        expect(onFerdig.mock.calls).toEqual([['OK'], ['OK'], ['OK']]);
    });

    it('skal slette mellomlagringen først etter at pågående lagring er ferdig', async () => {
        const lagring = lagDeferred();
        const postMock = vi.spyOn(ky, 'post').mockReturnValueOnce(lagring.promise as unknown as ResponsePromise);
        const deleteMock = vi.spyOn(ky, 'delete').mockReturnValue(Promise.resolve() as unknown as ResponsePromise);

        const { result } = renderMellomlagring();

        act(() => {
            void result.current.mellomlagreSøknad();
        });
        await waitFor(() => expect(postMock).toHaveBeenCalledTimes(1));

        let sletting: Promise<void> = Promise.resolve();
        act(() => {
            sletting = result.current.slettMellomlagring();
        });

        expect(deleteMock).not.toHaveBeenCalled();

        await act(async () => {
            lagring.resolve();
            await sletting;
        });

        expect(deleteMock).toHaveBeenCalledExactlyOnceWith(API_URLS.mellomlagring);
    });

    it('skal laste siden på nytt når sesjonen er utløpt (401)', async () => {
        vi.spyOn(ky, 'post').mockImplementation(() => Promise.reject(lagHttpError(401)) as unknown as ResponsePromise);

        const { result } = renderMellomlagring();

        const onFerdig = vi.fn();
        act(() => {
            void result.current.mellomlagreSøknad({ onFerdig });
        });
        await waitFor(() => expect(onFerdig).toHaveBeenCalled());

        expect(onFerdig).toHaveBeenCalledExactlyOnceWith('UTLOGGET');
        expect(reload).toHaveBeenCalledOnce();
    });

    it('skal vise tilgangsfeil når brukeren ikke har tilgang (403)', async () => {
        vi.spyOn(ky, 'post').mockImplementation(() => Promise.reject(lagHttpError(403)) as unknown as ResponsePromise);

        const { result } = renderMellomlagring();

        const onFerdig = vi.fn();
        act(() => {
            void result.current.mellomlagreSøknad({ onFerdig });
        });
        await waitFor(() => expect(onFerdig).toHaveBeenCalled());

        expect(onFerdig).toHaveBeenCalledExactlyOnceWith('INGEN_TILGANG');
        expect(result.current.lagringsfeil).toBe('INGEN_TILGANG');
        expect(reload).not.toHaveBeenCalled();
    });
});
