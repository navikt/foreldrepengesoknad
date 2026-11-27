import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import ky, { type KyResponse } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { EsPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, EsDataContext } from './EsDataContext';
import { Path } from './paths';
import { useEsMellomlagring } from './useEsMellomlagring';

const PERSONINFO = {
    fnr: '11111111111',
    navn: { fornavn: 'Henrikke', etternavn: 'Ibsen' },
    kjønn: 'K',
    fødselsdato: '1979-01-28',
} satisfies EsPersonopplysningerDto_fpoversikt;

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
            <EsDataContext initialState={{ [ContextDataType.CURRENT_PATH]: Path.SØKERSITUASJON }}>
                {children}
            </EsDataContext>
        </MemoryRouter>
    </QueryClientProvider>
);

describe('useEsMellomlagring', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('skal fullføre alle forespørsler som kommer før lagringen rekker å starte', async () => {
        const postMock = vi.spyOn(ky, 'post').mockResolvedValue({} as unknown as KyResponse);
        const { result } = renderHook(() => useEsMellomlagring(PERSONINFO, vi.fn()), { wrapper });

        const onFerdigNeste = vi.fn();
        const onFerdigFortsettSenere = vi.fn();

        let forespørsler: Array<Promise<void>> = [];
        act(() => {
            forespørsler = [
                result.current.mellomlagreOgNaviger({ onFerdig: onFerdigNeste }),
                result.current.mellomlagreOgNaviger({ naviger: false, onFerdig: onFerdigFortsettSenere }),
            ];
        });
        await act(() => Promise.all(forespørsler));

        expect(postMock).toHaveBeenCalledOnce();
        expect(onFerdigNeste).toHaveBeenCalledWith('ok');
        expect(onFerdigFortsettSenere).toHaveBeenCalledWith('ok');
    });
});
