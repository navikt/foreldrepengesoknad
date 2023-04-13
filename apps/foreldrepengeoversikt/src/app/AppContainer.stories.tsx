import React from 'react';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';

import søkerinfo from '../../mock-api/mock_data/sokerinfo.json';
import saker from '../../mock-api/mock_data/saker.json';
import dokumenter from '../../mock-api/mock_data/dokumenter.json';
import annenPartsVedtak from '../../mock-api/mock_data/annenPartsVedtak.json';
import tidslinjeHendelser from '../../mock-api/mock_data/tidslinjeHendelser.json';
import miniDialog from '../../mock-api/mock_data/miniDialog.json';
import manglendeVedlegg from '../../mock-api/mock_data/manglendeVedlegg.json';

import AppContainer from './AppContainer';
import { AxiosInstance } from './api/apiInterceptor';

import '@navikt/ds-css';

export default {
  title: 'AppContainer',
  component: AppContainer,
};

const Template: StoryFn<any> = () => {
  const apiMock = new MockAdapter(AxiosInstance);
  apiMock.onGet('/sokerinfo').reply(200, søkerinfo);
  apiMock.onGet('/innsyn/v2/saker').reply(200, saker);
  apiMock.onGet('/innsyn/v2/annenPartVedtak').reply(200, annenPartsVedtak);
  apiMock.onGet('/dokument/alle').reply(200, dokumenter);
  apiMock.onGet('/innsyn/tidslinje').reply(200, tidslinjeHendelser);
  apiMock.onGet('/minidialog').reply(200, miniDialog);
  apiMock.onGet('/historikk/vedlegg').reply(200, manglendeVedlegg);

  apiMock.onPost('/soknad/ettersen').reply(200, {});

  return (
    <AppContainer />
  )
  };

export const VisApp = Template.bind({});
