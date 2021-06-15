import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Api from './api/api';
import Foreldrepengesøknad from './Foreldrepengesøknad';
import { SøkerinfoDTO } from './types/SøkerinfoDTO';
import ForeldrepengesøknadContextProvider from './context/ForeldrepengesøknadContext';
import { ForeldrepengesøknadContextState } from './context/ForeldrepengesøknadContextConfig';
import IntlProvider from './intl/IntlProvider';

describe('<Foreldrepengesøknad>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('skal returnere spinner når data blir hentet', () => {
        jest.spyOn(Api, 'useSøkerinfo').mockImplementationOnce(() => ({
            søkerinfoData: undefined,
            søkerinfoError: null,
        }));
        jest.spyOn(Api, 'useStoredAppState').mockImplementationOnce(() => ({
            storageData: undefined,
            storageError: null,
        }));

        act(() => {
            render(
                <ForeldrepengesøknadContextProvider>
                    <IntlProvider locale="nb">
                        <Foreldrepengesøknad locale="nb" onChangeLocale={() => ''} />
                    </IntlProvider>
                </ForeldrepengesøknadContextProvider>
            );
        });

        expect(screen.queryByText('Venter...')).toBeInTheDocument();
    });

    it('skal returnere første rute i app når en har ferdighentet data', () => {
        const søkerinfoData = {
            søkerinfoData: {
                søker: {
                    fornavn: 'Olga',
                    arbeidsforhold: [
                        {
                            arbeidsgiverId: '',
                        },
                    ],
                },
            } as SøkerinfoDTO,
            søkerinfoError: null,
        };
        const storageDAta = {
            storageData: {} as ForeldrepengesøknadContextState,
            storageError: null,
        };
        jest.spyOn(Api, 'useSøkerinfo').mockImplementation(() => søkerinfoData);
        jest.spyOn(Api, 'useStoredAppState').mockImplementation(() => storageDAta);

        act(() => {
            render(
                <ForeldrepengesøknadContextProvider>
                    <IntlProvider locale="nb">
                        <Foreldrepengesøknad locale="nb" onChangeLocale={() => ''} />
                    </IntlProvider>
                </ForeldrepengesøknadContextProvider>
            );
        });

        expect(screen.queryByText('Hei, Olga!')).toBeInTheDocument();
        expect(screen.queryByText('Jeg vil hjelpe deg med å fylle ut søknaden.')).toBeInTheDocument();
    });
});
