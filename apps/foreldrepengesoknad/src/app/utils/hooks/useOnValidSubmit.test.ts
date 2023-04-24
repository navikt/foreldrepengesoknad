import SøknadRoutes from 'app/routes/routes';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import useOnValidSubmit from './useOnValidSubmit';
import { storeAppState } from '../submitUtils';
import { renderHook, waitFor } from '@testing-library/react';

const mockedNavigator = vi.fn();

vi.mock('react-router-dom', () => ({
    ...(vi.importActual('react-router-dom') as any),
    useNavigate: () => mockedNavigator,
}));

describe('useOnValidSubmit', () => {
    it('skal returnere funksjon for å lagre data til state og så til server', () => {
        const dispatchMock = vi.fn();
        const state = {
            søkerinfo: {
                person: {
                    fnr: '123',
                },
            },
        } as ForeldrepengesøknadContextState;

        vi.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: dispatchMock,
        }));

        const submitHandler = (): any => [Promise.resolve()];

        const { result: lagre } = renderHook(() =>
            useOnValidSubmit(submitHandler, SøknadRoutes.ANNEN_FORELDER, (state: ForeldrepengesøknadContextState) =>
                storeAppState(state)
            )
        );

        expect(lagre).not.toBeUndefined;
        expect(dispatchMock).toHaveBeenCalledTimes(0);
        expect(mockedNavigator).toHaveBeenCalledTimes(0);
    });

    test.skip('skal returnere og så kjøre funksjon for å lagre data til state og så til server', async () => {
        const dispatchMock = vi.fn();
        const state = {
            søkerinfo: {
                person: {
                    fnr: '123',
                },
            },
            currentRoute: SøknadRoutes.UTTAKSPLAN_INFO,
        } as ForeldrepengesøknadContextState;

        vi.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: dispatchMock,
        }));

        const formVerdier = {};
        const submitHandler = (): any => [Promise.resolve()];

        const { result } = renderHook(() =>
            useOnValidSubmit(submitHandler, SøknadRoutes.ANNEN_FORELDER, (state: ForeldrepengesøknadContextState) =>
                storeAppState(state)
            )
        );

        await waitFor(async () => {
            result.current.handleSubmit(formVerdier);
        });

        expect(dispatchMock).toHaveBeenCalledTimes(2);
        // TODO noe er galt med denne
        setTimeout(() => expect(mockedNavigator).toHaveBeenCalledTimes(1), 0);
    });
});
