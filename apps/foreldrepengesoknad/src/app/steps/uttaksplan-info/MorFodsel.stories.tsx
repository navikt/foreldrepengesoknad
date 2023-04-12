import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import withIntl from 'storybook/decorators/withIntl';
import withRouter from 'storybook/decorators/withRouter';
import withForeldrepengersøknadContext from 'storybook/decorators/withForeldrepengersøknadContext';
import AxiosMock from 'storybook/utils/AxiosMock';
import ForeldrepengerStateMock from 'storybook/utils/ForeldrepengerStateMock';
import { RequestStatus } from 'app/types/RequestState';

import _søkerinfo from 'storybook/storyData/uttaksplan/mor-fødsel/søkerinfo.json';
import _context from 'storybook/storyData/uttaksplan/mor-fødsel/context.json';
import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';
import stønadskontoPrematurUker100 from 'storybook/storyData/stonadskontoer/stønadskontoPrematurUker100.json';
import stønadskontoPrematurUker80 from 'storybook/storyData/stonadskontoer/stønadskontoPrematurUker80.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoFlerbarnsuker80 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker80.json';
import stønadskontoFlerbarnsuker100 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker100.json';

import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/undefined/konto';

const søkerinfo = _søkerinfo as any;
const context = _context as any;

export default {
    title: 'steps/uttaksplan-info/MorFødsel',
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
                harRettPåForeldrepengerINorge: true,
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
                antallBarn: 2,
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
    søkerinfo,
};
