import React from 'react';
import { StoryFn } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import EngangsstønadContextProvider from '../../context/EngangsstønadContext';
import Oppsummering from './Oppsummering';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import '../../styles/globals.less';

export default {
  title: 'Oppsummering',
  component: Oppsummering,
  decorators: [withRouter],
};

const Template: StoryFn<any> = () => {
  return (
    <EngangsstønadContextProvider>
      <IntlProvider språkkode="nb">
        <Oppsummering
          person={{
            fnr: '11111111111',
            fornavn: 'Henrikke',
            etternavn: 'Ibsen',
            mellomnavn: '',
            kjønn: 'K',
            fødselsdato: '1979-01-28',
            ikkeNordiskEøsLand: true,
            bankkonto: {
                kontonummer: '49875234987',
                banknavn: 'Storebank',
            },
            adresse: '123 Oslo'
          }}
          locale="nb"
        />
      </IntlProvider>
    </EngangsstønadContextProvider>
  )
  };

export const VisSide = Template.bind({});
