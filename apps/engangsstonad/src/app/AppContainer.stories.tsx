import React from 'react';
import { Story } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';

import AppContainer from './AppContainer';
import { foreldrepengersoknadApi } from './api/api';

import '@navikt/ds-css';
import './styles/globals.less';

export default {
  title: 'AppContainer',
  component: AppContainer,
};

const Template: Story<any> = () => {
    const apiMock = new MockAdapter(foreldrepengersoknadApi);
    apiMock.onGet('/personinfo').reply(200, {
      fnr: '11111111111',
      fornavn: 'Henrikke',
      etternavn: 'Ibsen',
      kjønn: 'K',
      fødselsdato: '1979-01-28',
      ikkeNordiskEøsLand: true,
      bankkonto: {
          kontonummer: '49875234987',
          banknavn: 'Storebank',
      },
  });

  apiMock.onPost('/soknad').reply(200, {
    mottattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941',
});

  return (
    <AppContainer />
  )
  };

export const VisApp = Template.bind({});
