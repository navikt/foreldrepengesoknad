import { renderHook } from '@testing-library/react';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import useSøkerinfo from './useSøkerinfo';
import Person from '@navikt/fp-common/src/common/types/Person';
import { Søkerinfo } from '@navikt/fp-common';

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
