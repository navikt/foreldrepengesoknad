import React from 'react';
import withFormik from 'storybook-formik';
import MockAdapter from 'axios-mock-adapter/types';

import søkerinfo from './testdata/søkerinfoMorFødsel.json';
import søknad from './testdata/søknadMorFødsel.json';
import UttaksplanInfo from '../../../../app/steps/uttaksplan-info/UttaksplanInfo';
import withIntl from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../../utils/AxiosMock';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';
import { ForeldrepengesøknadContextState } from '../../../../app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from '../../../../app/types/SøkerinfoDTO';

export default {
    title: 'steps/UttaksplanInfo',
    component: UttaksplanInfo,
    decorators: [withFormik, withRouter, withIntl, withForeldrepengersøknadContext],
};

export const visUttaksplanMorFødsel = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet('/innsyn/uttaksplanannen').replyOnce(200, {});
        apiMock.onGet('/uttak-url/konto').replyOnce(200, {
            kontoer: {
                MØDREKVOTE: 75,
                FEDREKVOTE: 75,
                FELLESPERIODE: 80,
                FORELDREPENGER_FØR_FØDSEL: 15,
            },
        });
        apiMock.onGet('/uttak-url/konto').replyOnce(200, {
            kontoer: {
                MØDREKVOTE: 95,
                FEDREKVOTE: 95,
                FELLESPERIODE: 90,
                FORELDREPENGER_FØR_FØDSEL: 15,
            },
        });
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
