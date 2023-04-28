import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import ErrorBoundary from 'app/components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import countries from 'i18n-iso-countries';
import { withRouter } from 'storybook-addon-react-router-v6';
import IntlProvider from 'app/intl/IntlProvider';
import { getAxiosInstance } from 'app/api/api';
import store from 'app/redux/store';
import Svangerskapspengesøknad from './Svangerskapspengesøknad';

import '@navikt/ds-css';

import '../../styles/global.less';
import '../../styles/app.less';
import { BodyShort } from '@navikt/ds-react';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

const søkerinfo = {
    søker: {
        fnr: '30088930610',
        fornavn: 'ERLINGA-MASK',
        etternavn: 'ORAVAKANGAS',
        kjønn: 'K',
        fødselsdato: '1989-08-30',
        land: 'NO',
        bankkonto: {
            kontonummer: '10824223373',
        },
    },
    arbeidsforhold: [
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD HF, PSYKIATRISK AVDELING, TØNSBERG',
            stillingsprosent: 32.63,
            fom: '2014-05-22',
            tom: '2019-05-31',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD HF, PSYKIATRISK AVDELING, TØNSBERG',
            stillingsprosent: 0,
            fom: '2018-04-09',
            tom: '2018-09-09',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD HF, PSYKIATRISK AVDELING, TØNSBERG',
            stillingsprosent: 80,
            fom: '2018-06-25',
            tom: '2018-08-05',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD HF, PSYKIATRISK AVDELING, TØNSBERG',
            stillingsprosent: 85.09,
            fom: '2019-06-01',
        },
        {
            arbeidsgiverId: '990322244',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'OMSORGSPARTNER VESTFOLD AS',
            stillingsprosent: 100,
            fom: '2017-04-05',
        },
        {
            arbeidsgiverId: '995090910',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'RE KOMMUNE BRÅR 12 OG 13',
            stillingsprosent: 0,
            fom: '2018-06-01',
        },
    ],
};

export default {
    title: 'Svangerskapspengesoknad',
    component: Svangerskapspengesøknad,
    decorators: [withRouter],
};

const Template: StoryFn<any> = () => {
    const apiMock = new MockAdapter(getAxiosInstance());
    apiMock.onGet('/sokerinfo').reply(200, søkerinfo);

    apiMock.onPost('/soknad').reply(200, {
        mottattDato: '2019-02-20T20:39:42.757',
        referanseId: 'bddfa0bb-e00c-4982-b0cc-4a09654803c2',
        leveranseStatus: 'GOSYS',
        journalId: '439775108',
    });

    return (
        <ErrorBoundary>
            <Provider store={store}>
                <IntlProvider>
                    <BodyShort>
                        <Svangerskapspengesøknad />
                    </BodyShort>
                </IntlProvider>
            </Provider>
        </ErrorBoundary>
    );
};

export const VisApp = Template.bind({});
