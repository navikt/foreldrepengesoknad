import { render, screen } from '@testing-library/react';
import Api, { FpMellomlagretData } from './api/api';
import Foreldrepengesøknad from './Foreldrepengesøknad';
import { SøkerinfoDTO } from './types/SøkerinfoDTO';
import { allCommonMessages } from '@navikt/fp-common';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from './api/apiInterceptor';
import { IntlProvider } from '@navikt/fp-ui';
import nbMessages from './intl/nb_NO.json';
import { RequestStatus } from './types/RequestState';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
};

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
            storageStatus: RequestStatus.UNFETCHED,
        }));
        vi.spyOn(Api, 'useGetSaker').mockImplementationOnce(() => ({
            sakerData: undefined,
            sakerError: null,
        }));

        render(
            <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                <Foreldrepengesøknad locale="nb" onChangeLocale={() => ''} />
            </IntlProvider>,
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
            } as FpMellomlagretData,
            storageError: null,
            storageStatus: RequestStatus.FINISHED,
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
            <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                <Foreldrepengesøknad locale="nb" onChangeLocale={() => ''} />
            </IntlProvider>,
        );

        expect(screen.getByText('Søknad om foreldrepenger')).toBeInTheDocument();
    });
});
