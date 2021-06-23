import React from 'react';
import MockAdapter from 'axios-mock-adapter/types';

import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import stønadskonto100 from './../testdata/stønadskonto100.json';
import stønadskonto80 from './../testdata/stønadskonto80.json';
import stønadskontoDeltUttak80 from './../testdata/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from './../testdata/stønadskontoDeltUttak100.json';
import UttaksplanInfo from '../../../../../app/steps/uttaksplan-info/UttaksplanInfo';
import withIntl from '../../../../decorators/withIntl';
import withRouter from '../../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../../../utils/AxiosMock';
import ForeldrepengerStateMock from '../../../../utils/ForeldrepengerStateMock';
import { ForeldrepengesøknadContextState } from '../../../../../app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from '../../../../../app/types/SøkerinfoDTO';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/uttaksplanannen';
const STØNADSKONTO_URL = '/uttak-url/konto';

export default {
    title: 'steps/uttaksplan-info/MorFarAdopsjon',
    component: UttaksplanInfo,
    decorators: [withRouter, withIntl, withForeldrepengersøknadContext],
};

export const visUttaksplanAleneomsorg = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet(UTTAKSPLAN_ANNEN_URL).replyOnce(200, {});
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
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

export const visUttaksplanMedDeltUttakDerMorSøker = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet(UTTAKSPLAN_ANNEN_URL).replyOnce(200, {});
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoDeltUttak100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoDeltUttak80);
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

//TODO Skriv ferdig
export const visUttaksplanMedDeltUttakDerFarSøker = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet(UTTAKSPLAN_ANNEN_URL).replyOnce(200, {});
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoDeltUttak100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoDeltUttak80);
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
