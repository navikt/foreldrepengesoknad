import { renderHook } from '@testing-library/react';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import Person from 'app/types/Person';
import { Søkerinfo } from 'app/types/Søkerinfo';
import useSøkerinfo from './useSøkerinfo';

describe('useSøkerinfo', () => {
    it('skal hente søkerinfo fra state', () => {
        const state = {
            søkerinfo: {
                person: {
                    fornavn: 'Espen',
                } as Person,
            } as Søkerinfo,
        } as ForeldrepengesøknadContextState;

        vi.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: () => vi.fn(),
        }));

        const { result } = renderHook(() => useSøkerinfo());

        expect(result.current).toBe(state.søkerinfo);
    });
});
