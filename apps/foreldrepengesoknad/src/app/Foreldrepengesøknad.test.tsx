import { render, screen } from '@testing-library/react';
import Api from './api/api';
import Foreldrepengesøknad from './Foreldrepengesøknad';
import { SøkerinfoDTO } from './types/SøkerinfoDTO';
import ForeldrepengesøknadContextProvider from './context/ForeldrepengesøknadContext';
import { ForeldrepengesøknadContextState } from './context/ForeldrepengesøknadContextConfig';
import IntlProvider from './intl/IntlProvider';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from './api/apiInterceptor';

describe('<Foreldrepengesøknad>', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('skal returnere spinner når data blir hentet', () => {
        vi.spyOn(Api, 'useSøkerinfo').mockImplementationOnce(() => ({
            søkerinfoData: undefined,
            søkerinfoError: null,
        }));
        vi.spyOn(Api, 'useStoredAppState').mockImplementationOnce(() => ({
            storageData: undefined,
            storageError: null,
        }));
        vi.spyOn(Api, 'useGetSaker').mockImplementationOnce(() => ({
            sakerData: undefined,
            sakerError: null,
        }));

        render(
            <ForeldrepengesøknadContextProvider>
                <IntlProvider locale="nb">
                    <Foreldrepengesøknad locale="nb" onChangeLocale={() => ''} />
                </IntlProvider>
            </ForeldrepengesøknadContextProvider>,
        );

        expect(screen.getByText('venter...')).toBeInTheDocument();
    });

    it('skal returnere første rute i app når en har ferdighentet data', () => {
        const søkerinfoData = {
            søkerinfoData: {
                søker: {
                    fornavn: 'Olga',
                    fnr: '12117212090',
                },
                arbeidsforhold: [
                    {
                        arbeidsgiverId: '',
                    },
                ],
            } as SøkerinfoDTO,
            søkerinfoError: null,
        };
        const storageData = {
            storageData: {
                søknad: {},
            } as ForeldrepengesøknadContextState,
            storageError: null,
        };
        const sakerData = {
            sakerData: { engangsstønad: [], foreldrepenger: [], svangerskapspenger: [] },
            sakerError: null,
        };
        vi.spyOn(Api, 'useSøkerinfo').mockImplementation(() => søkerinfoData);
        vi.spyOn(Api, 'useStoredAppState').mockImplementation(() => storageData);
        vi.spyOn(Api, 'useGetSaker').mockImplementation(() => sakerData);

        const apiMock = new MockAdapter(AxiosInstance);
        apiMock.onPost('/storage').reply(200, {});

        render(
            <ForeldrepengesøknadContextProvider>
                <IntlProvider locale="nb">
                    <Foreldrepengesøknad locale="nb" onChangeLocale={() => ''} />
                </IntlProvider>
            </ForeldrepengesøknadContextProvider>,
        );

        expect(screen.getByText('Søknad om foreldrepenger')).toBeInTheDocument();
    });
});
