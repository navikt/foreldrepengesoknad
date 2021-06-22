import React from 'react';
import withFormik from 'storybook-formik';
import MockAdapter from 'axios-mock-adapter/types';

import søkerinfo from './testdata/søkerinfoMorFødsel.json';
import context from './testdata/contextMorFødsel.json';
import stønadskontoSøker from './testdata/stønadskontoSøker.json';
import stønadskontoAnnenPart from './testdata/stønadskontoAnnenPart.json';
import UttaksplanInfo from '../../../../app/steps/uttaksplan-info/UttaksplanInfo';
import withIntl from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../../utils/AxiosMock';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';
import { ForeldrepengesøknadContextState } from '../../../../app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from '../../../../app/types/SøkerinfoDTO';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/uttaksplanannen';
const STØNADSKONTO_URL = '/uttak-url/konto';

export default {
    title: 'steps/UttaksplanInfo',
    component: UttaksplanInfo,
    decorators: [withFormik, withRouter, withIntl, withForeldrepengersøknadContext],
};

export const visUttaksplanMorFødsel = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet(UTTAKSPLAN_ANNEN_URL).replyOnce(200, {});
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoSøker);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoAnnenPart);
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock
                søknad={context as ForeldrepengesøknadContextState}
                søkerinfo={søkerinfo as SøkerinfoDTO}
            >
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const visUttaksplanMorFødselMedPrematurFødsel = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet(UTTAKSPLAN_ANNEN_URL).replyOnce(200, {});
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoSøker);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoAnnenPart);
    };
    const originalContext = context as ForeldrepengesøknadContextState;
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock
                søknad={
                    {
                        ...originalContext,
                        søknad: {
                            ...originalContext.søknad,
                            barn: {
                                ...originalContext.søknad.barn,
                                fødselsdatoer: ['2021-01-11'],
                                termindato: '2021-03-11',
                            },
                        },
                    } as ForeldrepengesøknadContextState
                }
                søkerinfo={søkerinfo as SøkerinfoDTO}
            >
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const visUttaksplanMorFødselMedFlerbarnsuker = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet(UTTAKSPLAN_ANNEN_URL).replyOnce(200, {});
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoSøker);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoAnnenPart);
    };
    const originalContext = context as ForeldrepengesøknadContextState;
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock
                søknad={
                    {
                        ...originalContext,
                        søknad: {
                            ...originalContext.søknad,
                            søker: {
                                ...originalContext.søknad.søker,
                                erAleneOmOmsorg: false,
                            },
                            barn: {
                                ...originalContext.søknad.barn,
                                antallBarn: '2',
                            },
                            annenForelder: {
                                fornavn: 'Espen',
                                etternavn: 'Utvikler',
                                fnr: '1212121313',
                                harRettPåForeldrepenger: true,
                                kanIkkeOppgis: false,
                            },
                        },
                    } as ForeldrepengesøknadContextState
                }
                søkerinfo={søkerinfo as SøkerinfoDTO}
            >
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};
