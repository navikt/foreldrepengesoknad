import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import { getAxiosInstance } from '@navikt/fp-api';
import { allCommonMessages } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { SøkerBarn, Søkerinfo } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import Foreldrepengesøknad from './Foreldrepengesøknad';
import Api, { FpMellomlagretData } from './api/api';
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
        initAmplitude();
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
        initAmplitude();
        const søkerinfoData = {
            søkerinfoData: {
                søker: {
                    fornavn: 'Olga',
                    fnr: '12117212090',
                    barn: [] as SøkerBarn[],
                },
                arbeidsforhold: [
                    {
                        arbeidsgiverId: '',
                    },
                ],
            } as Søkerinfo,
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

        const apiMock = new MockAdapter(getAxiosInstance());
        apiMock.onPost('/rest/storage/foreldrepenger').reply(200, {});

        render(
            <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                <Foreldrepengesøknad locale="nb" onChangeLocale={() => ''} />
            </IntlProvider>,
        );

        expect(screen.getByText('Søknad om foreldrepenger')).toBeInTheDocument();
    });
});
