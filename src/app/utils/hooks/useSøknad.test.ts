import { renderHook } from '@testing-library/react-hooks';
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

        jest.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: () => jest.fn(),
        }));

        const { result } = renderHook(() => useSøknad());

        expect(result.current).toBe(state.søknad);
    });
});
