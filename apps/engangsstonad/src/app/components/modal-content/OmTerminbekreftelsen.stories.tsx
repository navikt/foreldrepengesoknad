import React from 'react';
import { Story } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import IntlProvider from 'intl/IntlProvider';

import OmTerminbekreftelsen from './OmTerminbekreftelsen';

export default {
  title: 'OmTerminbekreftelsen',
  component: OmTerminbekreftelsen,
};

const Template: Story = () => (
  <IntlProvider språkkode="nb">
    <OmTerminbekreftelsen />
  </IntlProvider>
);

export const VisInfo = Template.bind({});
