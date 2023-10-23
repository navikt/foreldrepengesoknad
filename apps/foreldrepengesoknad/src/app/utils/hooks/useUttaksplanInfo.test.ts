import { renderHook } from '@testing-library/react';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import UttaksplanInfo from 'app/context/types/UttaksplanInfo';
import useUttaksplanInfo from './useUttaksplanInfo';
import { Dekningsgrad } from '@navikt/fp-common';

describe('useUttaksplanInfo', () => {
    it('skal hente uttaksplan-info fra state', () => {
        const state = {
            uttaksplanInfo: {
                dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
            } as UttaksplanInfo,
        } as ForeldrepengesøknadContextState;

        vi.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: () => vi.fn(),
        }));

        const { result } = renderHook(() => useUttaksplanInfo());

        expect(result.current).toBe(state.uttaksplanInfo);
    });
});
