import React from 'react';
import { Story } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { withRouter } from 'storybook-addon-react-router-v6';
import EngangsstønadContextProvider from '../../context/EngangsstønadContext';
import OmBarnet from './OmBarnet';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import '../../styles/globals.less';

export default {
  title: 'OmBarnet',
  component: OmBarnet,
  decorators: [withRouter],
};

const Template: Story<any> = () => {
  return (
    <EngangsstønadContextProvider>
      <IntlProvider språkkode="nb">
        <OmBarnet
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
        />
      </IntlProvider>
    </EngangsstønadContextProvider>
  )
  };

export const VisSide = Template.bind({});
