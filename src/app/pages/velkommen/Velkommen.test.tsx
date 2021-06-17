import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import { Søknad } from 'app/context/types/Søknad';
import { Søkerinfo } from 'app/types/Søkerinfo';
import SøknadRoutes from 'app/routes/routes';
import ForeldrepengesøknadContextProvider from 'app/context/ForeldrepengesøknadContext';
import IntlProvider from 'app/intl/IntlProvider';
import Velkommen from './Velkommen';

describe('<Velkommen>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('skal vise navn på velkomstsiden', () => {
        render(
            <ForeldrepengesøknadContextProvider>
                <IntlProvider locale="nb">
                    <Velkommen fornavn="Espen" locale="nb" onChangeLocale={() => undefined} />
                </IntlProvider>
            </ForeldrepengesøknadContextProvider>
        );

        expect(screen.queryByText('Hei, Espen!')).toBeInTheDocument();
    });

    xit('skal åpne personopplysninger-modal ved trykk på lenke', () => {
        // jest.spyOn(Api, 'useSøkerinfo').mockImplementationOnce(() => ({
        //     søkerinfoData: undefined,
        //     søkerinfoError: null,
        // }));
        // jest.spyOn(Api, 'useStoredAppState').mockImplementationOnce(() => ({
        //     storageData: undefined,
        //     storageError: null,
        // }));

        render(
            <ForeldrepengesøknadContextProvider>
                <IntlProvider locale="nb">
                    <Velkommen fornavn="Espen" locale="nb" onChangeLocale={() => undefined} />
                </IntlProvider>
            </ForeldrepengesøknadContextProvider>
        );

        userEvent.click(screen.getAllByRole('link')[0]);
    });

    xit('skal lagre data fra form', () => {
        const state = {
            version: 1,
            currentRoute: SøknadRoutes.VELKOMMEN,
            søkerinfo: {} as Søkerinfo,
            søknad: {} as Søknad,
            saker: [],
        };
        const dispatchMock = jest.fn();
        jest.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: dispatchMock,
        }));

        render(
            <ForeldrepengesøknadContextProvider>
                <IntlProvider locale="nb">
                    <Velkommen fornavn="Espen" locale="nb" onChangeLocale={() => undefined} />
                </IntlProvider>
            </ForeldrepengesøknadContextProvider>
        );

        expect(dispatchMock).toHaveBeenCalledTimes(0);

        act(() => {
            //userEvent.click(screen.getByText('Begynn med søknad'));
            fireEvent.submit(screen.getByText('Begynn med søknad'));
        });

        expect(dispatchMock).toHaveBeenCalledTimes(2);

        //fireEvent.submit(screen.getByText('Begynn med søknad'));
    });
});
