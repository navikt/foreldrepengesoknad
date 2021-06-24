import React from 'react';
import MockAdapter from 'axios-mock-adapter/types';

import UttaksplanInfo from 'app/steps/uttaksplan-info/UttaksplanInfo';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import søkerinfoMorSøker from './testdata/søkerinfoMorSøker.json';
import contextMorSøker from './testdata/contextMorSøker.json';
import søkerinfoFarSøker from './testdata/søkerinfoFarSøker.json';
import contextFarSøker from './testdata/contextFarSøker.json';
import stønadskonto100 from './../testdata/stønadskonto100.json';
import stønadskonto80 from './../testdata/stønadskonto80.json';
import stønadskontoDeltUttak80 from './../testdata/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from './../testdata/stønadskontoDeltUttak100.json';
import withIntl from '../../../../decorators/withIntl';
import withRouter from '../../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../../../utils/AxiosMock';
import ForeldrepengerStateMock from '../../../../utils/ForeldrepengerStateMock';

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
                søknad={contextMorSøker as ForeldrepengesøknadContextState}
                søkerinfo={søkerinfoMorSøker as SøkerinfoDTO}
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
    const originalContext = contextMorSøker as ForeldrepengesøknadContextState;
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
                søkerinfo={søkerinfoMorSøker as SøkerinfoDTO}
            >
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const visUttaksplanMedDeltUttakDerFarSøker = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet(UTTAKSPLAN_ANNEN_URL).replyOnce(200, {});
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoDeltUttak100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoDeltUttak80);
    };
    const originalContext = contextFarSøker as ForeldrepengesøknadContextState;
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
                                fornavn: 'TALENTFULL',
                                etternavn: 'MYGG',
                                fnr: '19047815714',
                                harRettPåForeldrepenger: true,
                                kanIkkeOppgis: false,
                            },
                        },
                    } as ForeldrepengesøknadContextState
                }
                søkerinfo={søkerinfoFarSøker as SøkerinfoDTO}
            >
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};
