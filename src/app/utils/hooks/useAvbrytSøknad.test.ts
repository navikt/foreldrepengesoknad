import { renderHook } from '@testing-library/react-hooks';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import useAvbrytSøknad from './useAvbrytSøknad';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
    ...(jest.requireActual('react-router') as any),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('useAvbrytSøknad', () => {
    it('skal returnere funksjon for å avbryte søknad', () => {
        const dispatchMock = jest.fn();

        jest.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state: {} as ForeldrepengesøknadContextState,
            dispatch: dispatchMock,
        }));

        const { result } = renderHook(() => useAvbrytSøknad());

        result.current();

        expect(mockHistoryPush).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenCalledTimes(1);
    });
});
