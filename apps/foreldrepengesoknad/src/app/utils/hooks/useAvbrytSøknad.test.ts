import { renderHook } from '@testing-library/react';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import useAvbrytSøknad from './useAvbrytSøknad';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'app/api/apiInterceptor';

const mockedNavigator = vi.fn();

vi.mock('react-router-dom', async () => {
    const original = await vi.importActual<any>('react-router-dom');
    return {
        ...original,
        useNavigate: () => mockedNavigator,
    };
});

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

        const apiMock = new MockAdapter(AxiosInstance);
        apiMock.onDelete('/storage').reply(200, {});

        const { result } = renderHook(() => useAvbrytSøknad());

        result.current();

        expect(mockedNavigator).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenCalledTimes(1);
    });
});
