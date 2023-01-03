import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import UttaksplanInfo from 'app/steps/uttaksplan-info/UttaksplanInfo';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import søkerinfoMorSøker from '../testdata/søkerinfoMorSøker.json';
import contextMorSøkerAdopsjon from '../testdata/contextMorSøkerAdopsjon.json';
import søkerinfoFarSøker from '../testdata/søkerinfoFarSøker.json';
import contextFarSøkerAdopsjon from '../testdata/contextFarSøkerAdopsjon.json';
import stønadskonto100 from './../testdata/stønadskonto100.json';
import stønadskonto80 from './../testdata/stønadskonto80.json';
import stønadskontoDeltUttak80 from './../testdata/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from './../testdata/stønadskontoDeltUttak100.json';
import withIntl from '../../../../decorators/withIntl';
import withRouter from '../../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../../../utils/AxiosMock';
import ForeldrepengerStateMock from '../../../../utils/ForeldrepengerStateMock';
import UttaksplanInfoTestData from '../uttaksplanInfoTestData';
import { RequestStatus } from 'app/types/RequestState';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/uttak-url/konto';

export default {
    title: 'steps/uttaksplan-info/MorFarAdopsjon',
    component: UttaksplanInfo,
    decorators: [withRouter, withIntl, withForeldrepengersøknadContext],
};

const Template: Story<UttaksplanInfoTestData> = (args) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock
                søknad={args.context as ForeldrepengesøknadContextState}
                søkerinfo={args.søkerinfo as SøkerinfoDTO}
            >
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const UttaksplanMedAleneomsorg = Template.bind({});
UttaksplanMedAleneomsorg.args = {
    stønadskonto100,
    stønadskonto80,
    context: contextMorSøkerAdopsjon,
    søkerinfo: søkerinfoMorSøker,
};

export const UttaksplanMedDeltUttakDerMorSøker = Template.bind({});
UttaksplanMedDeltUttakDerMorSøker.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    context: {
        ...contextMorSøkerAdopsjon,
        søknad: {
            ...contextMorSøkerAdopsjon.søknad,
            søker: {
                ...contextMorSøkerAdopsjon.søknad.søker,
                erAleneOmOmsorg: false,
            },
            annenForelder: {
                fornavn: 'Espen',
                etternavn: 'Utvikler',
                fnr: '1212121313',
                harRettPåForeldrepengerINorge: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: søkerinfoMorSøker,
};

export const UttaksplanMedDeltUttakDerFarSøker = Template.bind({});
UttaksplanMedDeltUttakDerFarSøker.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    context: {
        ...contextFarSøkerAdopsjon,
        søknad: {
            ...contextFarSøkerAdopsjon.søknad,
            søker: {
                ...contextFarSøkerAdopsjon.søknad.søker,
                erAleneOmOmsorg: false,
            },
            annenForelder: {
                fornavn: 'TALENTFULL',
                etternavn: 'MYGG',
                fnr: '19047815714',
                harRettPåForeldrepengerINorge: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: søkerinfoFarSøker,
};
