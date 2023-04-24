import { renderHook } from '@testing-library/react';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import { Søknad } from 'app/context/types/Søknad';
import useSøknad from './useSøknad';

describe('useSøknad', () => {
    it('skal hente søknad fra state', () => {
        const state = {
            søknad: {
                harGodkjentVilkår: true,
            } as Søknad,
        } as ForeldrepengesøknadContextState;

        vi.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: () => vi.fn(),
        }));

        const { result } = renderHook(() => useSøknad());

        expect(result.current).toBe(state.søknad);
    });
});
