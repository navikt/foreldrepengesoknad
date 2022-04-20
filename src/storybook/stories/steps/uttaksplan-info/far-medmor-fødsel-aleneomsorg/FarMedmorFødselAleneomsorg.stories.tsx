import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
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
import UttaksplanInfoTestData from '../uttaksplanInfoTestData';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/uttaksplanannen';
const STØNADSKONTO_URL = '/uttak-url/konto';

export default {
    title: 'steps/uttaksplan-info/FarMedmorFødselAleneomsorg',
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

export const UttaksplanInfoFarMedmorFødselAleneomsorg = Template.bind({});
UttaksplanInfoFarMedmorFødselAleneomsorg.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    context,
    søkerinfo,
};
