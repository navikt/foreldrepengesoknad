import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import UttaksplanInfo from 'app/steps/uttaksplan-info/UttaksplanInfo';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import søkerinfoMorSøker from '../testdata/søkerinfoMorSøker.json';
import søkerinfoFarSøker from '../testdata/søkerinfoFarSøker.json';
import contextMorSøkerAdopsjon from '../testdata/contextMorSøkerAdopsjon.json';
import contextFarSøkerAdopsjon from '../testdata/contextFarSøkerAdopsjon.json';
import stønadskonto100 from './../testdata/stønadskonto100.json';
import stønadskonto80 from './../testdata/stønadskonto80.json';
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
    title: 'steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS',
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

export const UttaksplanAdopsjonMorSøkerFarHarRettIEOS = Template.bind({});
UttaksplanAdopsjonMorSøkerFarHarRettIEOS.args = {
    stønadskonto100,
    stønadskonto80,
    context: {
        ...contextMorSøkerAdopsjon,
        søknad: {
            ...contextMorSøkerAdopsjon.søknad,

            annenForelder: {
                fornavn: 'Far',
                etternavn: 'EØS',
                fnr: '1111UUUUU',
                harRettPåForeldrepengerINorge: false,
                harRettPåForeldrepengerIEØS: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: søkerinfoMorSøker,
};

export const UttaksplanAdopsjonFarSøkerMorHarRettIEOS = Template.bind({});
UttaksplanAdopsjonFarSøkerMorHarRettIEOS.args = {
    stønadskonto100,
    stønadskonto80,
    context: {
        ...contextFarSøkerAdopsjon,
        søknad: {
            ...contextFarSøkerAdopsjon.søknad,

            annenForelder: {
                fornavn: 'Mor',
                etternavn: 'EØS',
                fnr: '2222UUUUU',
                harRettPåForeldrepengerINorge: false,
                harRettPåForeldrepengerIEØS: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: søkerinfoFarSøker,
};

export const UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger = Template.bind({});
UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger.args = {
    stønadskonto100,
    stønadskonto80,
    context: {
        ...contextFarSøkerAdopsjon,
        søknad: {
            ...contextFarSøkerAdopsjon.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
            barn: {
                ...contextFarSøkerAdopsjon.søknad.barn,
                fødselsdatoer: ['2022-06-14', '2022-06-14'],
                antallBarn: 2,
                adopsjonsdato: undefined,
                adoptertIUtlandet: undefined,
            },
            annenForelder: {
                fornavn: 'Mor',
                etternavn: 'EØS',
                fnr: '2222UUUUU',
                harRettPåForeldrepengerINorge: false,
                harRettPåForeldrepengerIEØS: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: søkerinfoFarSøker,
};

export const UttaksplanFødselMorSøkerFarHarRettIEOSPrematur = Template.bind({});
UttaksplanFødselMorSøkerFarHarRettIEOSPrematur.args = {
    stønadskonto100,
    stønadskonto80,
    context: {
        ...contextMorSøkerAdopsjon,
        søknad: {
            ...contextMorSøkerAdopsjon.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'mor',
            },
            barn: {
                ...contextMorSøkerAdopsjon.søknad.barn,
                fødselsdatoer: ['2022-06-14'],
                termindato: ['2022-08-14'],
                antallBarn: 1,
                adopsjonsdato: undefined,
                adoptertIUtlandet: undefined,
                type: 'født',
            },
            annenForelder: {
                fornavn: 'Mor',
                etternavn: 'EØS',
                fnr: '2222UUUUU',
                harRettPåForeldrepengerINorge: false,
                harRettPåForeldrepengerIEØS: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: søkerinfoFarSøker,
};
