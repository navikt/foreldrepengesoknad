import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import UttaksplanInfo from 'app/steps/uttaksplan-info/UttaksplanInfo';
import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import stønadskonto100 from './../testdata/stønadskonto100.json';
import stønadskonto80 from './../testdata/stønadskonto80.json';
import stønadskontoPrematurUker100 from './../testdata/stønadskontoPrematurUker100.json';
import stønadskontoPrematurUker80 from './../testdata/stønadskontoPrematurUker80.json';
import stønadskontoDeltUttak80 from './../testdata/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from './../testdata/stønadskontoDeltUttak100.json';
import stønadskontoFlerbarnsuker80 from './../testdata/stønadskontoFlerbarnsuker80.json';
import stønadskontoFlerbarnsuker100 from './../testdata/stønadskontoFlerbarnsuker100.json';
import withIntl from '../../../../decorators/withIntl';
import withRouter from '../../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../../../utils/AxiosMock';
import ForeldrepengerStateMock from '../../../../utils/ForeldrepengerStateMock';
import UttaksplanInfoTestData from '../uttaksplanInfoTestData';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/uttaksplanannen';
const STØNADSKONTO_URL = '/uttak-url/konto';

export default {
    title: 'steps/uttaksplan-info/MorFødsel',
    component: UttaksplanInfo,
    decorators: [withRouter, withIntl, withForeldrepengersøknadContext],
};

const Template: Story<UttaksplanInfoTestData> = (args) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onGet(UTTAKSPLAN_ANNEN_URL).replyOnce(200, {});
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
    context,
    søkerinfo,
};

export const UttaksplanMedPrematurFødsel = Template.bind({});
UttaksplanMedPrematurFødsel.args = {
    stønadskonto100: stønadskontoPrematurUker100,
    stønadskonto80: stønadskontoPrematurUker80,
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            barn: {
                ...context.søknad.barn,
                fødselsdatoer: ['2021-01-11'],
                termindato: '2021-03-11',
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const UttaksplanMedDeltUttak = Template.bind({});
UttaksplanMedDeltUttak.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
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
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const UttaksplanMedFlerbarnsukerTvillinger = Template.bind({});
UttaksplanMedFlerbarnsukerTvillinger.args = {
    stønadskonto100: stønadskontoFlerbarnsuker100,
    stønadskonto80: stønadskontoFlerbarnsuker80,
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                erAleneOmOmsorg: false,
            },
            barn: {
                ...context.søknad.barn,
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
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};
