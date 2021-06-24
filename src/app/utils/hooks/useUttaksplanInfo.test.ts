import { renderHook } from '@testing-library/react-hooks';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import UttaksplanInfo from 'app/context/types/UttaksplanInfo';
import useUttaksplanInfo from './useUttaksplanInfo';

describe('useUttaksplanInfo', () => {
    it('skal hente uttaksplan-info fra state', () => {
        const state = {
            uttaksplanInfo: {
                dekningsgrad: 80,
            } as UttaksplanInfo,
        } as ForeldrepengesøknadContextState;

        jest.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: () => jest.fn(),
        }));

        const { result } = renderHook(() => useUttaksplanInfo());

        expect(result.current).toBe(state.uttaksplanInfo);
    });
});
