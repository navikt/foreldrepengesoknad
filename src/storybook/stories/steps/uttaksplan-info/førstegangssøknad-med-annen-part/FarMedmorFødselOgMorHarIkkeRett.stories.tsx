import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import UttaksplanInfo from 'app/steps/uttaksplan-info/UttaksplanInfo';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import søkerinfoFarSøker from './testdata/søkerinfoFarSøker.json';
import contextFarSøker from './testdata/contextFarSøker.json';
import stønadskonto100 from './../testdata/stønadskonto100.json';
import stønadskonto80 from './../testdata/stønadskonto80.json';
import withIntl from '../../../../decorators/withIntl';
import withRouter from '../../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../../../utils/AxiosMock';
import ForeldrepengerStateMock from '../../../../utils/ForeldrepengerStateMock';
import FarMedmorFødselOgMorHarIkkeRett from 'app/steps/uttaksplan-info/components/scenarios/far-medmor-fødsel-og-mor-har-ikke-rett/FarMedmorFødselOgMorHarIkkeRett';
import UttaksplanInfoTestData from '../uttaksplanInfoTestData';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/uttaksplanannen';
const STØNADSKONTO_URL = '/uttak-url/konto';

export default {
    title: 'steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett',
    component: FarMedmorFødselOgMorHarIkkeRett,
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

export const UttaksplanDerMorIkkeHarRettPåForeldrepenger = Template.bind({});
UttaksplanDerMorIkkeHarRettPåForeldrepenger.args = {
    stønadskonto100,
    stønadskonto80,
    context: contextFarSøker,
    søkerinfo: søkerinfoFarSøker,
};

export const UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør = Template.bind({});
UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør.args = {
    stønadskonto100,
    stønadskonto80,
    context: {
        ...contextFarSøker,
        søknad: {
            ...contextFarSøker.søknad,
            annenForelder: {
                ...contextFarSøker.søknad.annenForelder,
                erUfør: true,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: søkerinfoFarSøker,
};
