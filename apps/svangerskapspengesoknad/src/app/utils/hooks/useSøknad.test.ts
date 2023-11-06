import { renderHook } from '@testing-library/react';
import useSøknad from './useSøknad';
import { Søknad } from 'app/types/Søknad';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import * as context from 'app/context/hooks/useSvangerskapspengerContext';

describe('useSøknad', () => {
    it('skal hente søknad fra state', () => {
        const state = {
            søknad: {
                harGodkjentVilkår: true,
            } as Søknad,
        } as SvangerskapspengerContextState;

        vi.spyOn(context, 'useSvangerskapspengerContext').mockImplementation(() => ({
            state,
            dispatch: () => vi.fn(),
        }));

        const { result } = renderHook(() => useSøknad());

        expect(result.current).toBe(state.søknad);
    });
});
