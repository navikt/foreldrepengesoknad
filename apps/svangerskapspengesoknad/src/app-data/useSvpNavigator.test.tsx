import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import ky, { HTTPError, ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/nb_NO.json';
import { ContextDataType, SvpDataContext } from './SvpDataContext';
import { SøknadRoute } from './routes';
import { useMellomlagreSøknad } from './useMellomlagreSøknad';
import { useSvpNavigator } from './useSvpNavigator';

const SØKER_INFO = { fnr: '12345678910' } as SvpPersonopplysningerDto_fpoversikt;

const wrapper = ({ children }: { children: ReactNode }) => (
    <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: nbMessages }}>
        <QueryClientProvider client={new QueryClient()}>
            <MemoryRouter>
                <SvpDataContext initialState={{ [ContextDataType.APP_ROUTE]: SøknadRoute.BARNET }}>
                    {children}
                </SvpDataContext>
            </MemoryRouter>
        </QueryClientProvider>
    </IntlProvider>
);

const renderNavigator = () =>
    renderHook(
        () => {
            const mellomlagring = useMellomlagreSøknad(SØKER_INFO, vi.fn());
            const navigator = useSvpNavigator({
                mellomlagreOgNaviger: mellomlagring.mellomlagreOgNaviger,
                arbeidsforhold: [],
                harRegistrertNæring: false,
            });
            return { ...mellomlagring, navigator };
        },
        { wrapper },
    );

describe('useSvpNavigator – fortsett senere', () => {
    const assign = vi.fn();

    beforeEach(() => {
        vi.stubGlobal('location', { assign, reload: vi.fn() });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        assign.mockReset();
    });

    it('skal sende brukeren ut av søknaden når lagringen gikk bra', async () => {
        vi.spyOn(ky, 'post').mockReturnValue(Promise.resolve() as unknown as ResponsePromise);

        const { result } = renderNavigator();

        act(() => result.current.navigator.fortsettSøknadSenere());

        await waitFor(() => expect(assign).toHaveBeenCalledExactlyOnceWith('https://nav.no'));
    });

    it('skal bli i søknaden og vise feil når lagringen feiler', async () => {
        const feil = new HTTPError(
            new Response(null, { status: 500 }),
            new Request('https://example.com'),
            {} as never,
        );
        const postMock = vi
            .spyOn(ky, 'post')
            .mockImplementation(() => Promise.reject(feil) as unknown as ResponsePromise);

        const { result } = renderNavigator();

        act(() => result.current.navigator.fortsettSøknadSenere());

        await waitFor(() => expect(result.current.lagringsfeil).toBe('FEILET'));
        expect(postMock).toHaveBeenCalledOnce();
        expect(assign).not.toHaveBeenCalled();
    });
});
