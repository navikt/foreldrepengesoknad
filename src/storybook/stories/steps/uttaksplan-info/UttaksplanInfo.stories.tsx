import React from 'react';
import withFormik from 'storybook-formik';
import MockAdapter from 'axios-mock-adapter/types';

import søkerinfo from './testdata/søkerinfo.json';
import stønadskontoer from './testdata/stønadskontoer.json';
import søknad from './testdata/soknad.json';
import uttaksplanannen from './testdata/uttaksplanannen.json';
import UttaksplanInfo from '../../../../app/steps/uttaksplan-info/UttaksplanInfo';
import withIntlProvider from '../../../decorators/withIntl';
import withRouterProvider from '../../../decorators/withRouter';
import withForeldrepengersøknadContextProvider from '../../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../../utils/AxiosMock';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';
import { ForeldrepengesøknadContextState } from '../../../../app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from '../../../../app/types/SøkerinfoDTO';

export default {
    title: 'steps/UttaksplanInfo',
    component: UttaksplanInfo,
    decorators: [withFormik, withRouterProvider, withIntlProvider, withForeldrepengersøknadContextProvider],
};

export const visUttaksplanMorFødsel = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet('/innsyn/uttaksplanannen').replyOnce(200, uttaksplanannen);
        apiMock.onGet('/uttak-url/konto').replyOnce(200, stønadskontoer);
        apiMock.onGet('/uttak-url/konto').replyOnce(200, stønadskontoer);
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock
                søknad={søknad as ForeldrepengesøknadContextState}
                søkerinfo={søkerinfo as SøkerinfoDTO}
            >
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};
