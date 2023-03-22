import React from 'react';
import { Story } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { withRouter } from 'storybook-addon-react-router-v6';
import EngangsstønadContextProvider from '../../context/EngangsstønadContext';
import Søkersituasjon from './Søkersituasjon';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import '../../styles/globals.less';

export default {
  title: 'Søkersituasjon',
  component: Søkersituasjon,
  decorators: [withRouter],
};

const Template: Story<any> = () => {
  return (
    <EngangsstønadContextProvider>
      <IntlProvider språkkode="nb">
        <Søkersituasjon />
      </IntlProvider>
    </EngangsstønadContextProvider>
  )
  };

export const VisSide = Template.bind({});
