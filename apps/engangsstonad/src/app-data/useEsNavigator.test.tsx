import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import ky, { HTTPError, ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { EsPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/messages/nb_NO.json';
import { ContextDataType, EsDataContext } from './EsDataContext';
import { Path } from './paths';
import { useEsMellomlagring } from './useEsMellomlagring';
import { useEsNavigator } from './useEsNavigator';

const PERSONINFO = { fnr: '12345678910' } as EsPersonopplysningerDto_fpoversikt;

const wrapper = ({ children }: { children: ReactNode }) => (
    <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: nbMessages }}>
        <QueryClientProvider client={new QueryClient()}>
            <MemoryRouter initialEntries={[Path.OM_BARNET]}>
                <EsDataContext initialState={{ [ContextDataType.CURRENT_PATH]: Path.OM_BARNET }}>
                    {children}
                </EsDataContext>
            </MemoryRouter>
        </QueryClientProvider>
    </IntlProvider>
);

const renderNavigator = () =>
    renderHook(
        () => {
            const mellomlagring = useEsMellomlagring(PERSONINFO, vi.fn());
            const navigator = useEsNavigator(mellomlagring.mellomlagreOgNaviger);
            return { ...mellomlagring, navigator };
        },
        { wrapper },
    );

describe('useEsNavigator – fortsett senere', () => {
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
