import { renderHook } from '@testing-library/react';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import useAvbrytSøknad from './useAvbrytSøknad';

const mockedNavigator = vi.fn();

vi.mock('react-router-dom', () => ({
    ...(vi.importActual('react-router-dom') as any),
    useNavigate: () => mockedNavigator,
}));

describe('useAvbrytSøknad', () => {
    it('skal returnere funksjon for å avbryte søknad', () => {
        const dispatchMock = vi.fn();

        vi.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state: {
                søkerinfo: {
                    person: {
                        fnr: '123',
                    },
                },
            } as ForeldrepengesøknadContextState,
            dispatch: dispatchMock,
        }));

        const { result } = renderHook(() => useAvbrytSøknad());

        result.current();

        expect(mockedNavigator).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenCalledTimes(1);
    });
});
