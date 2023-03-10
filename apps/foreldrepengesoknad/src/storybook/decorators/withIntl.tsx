import React from 'react';

import IntlProvider from '../../app/intl/IntlProvider';

const withIntlProvider = (Story: any) => (
    <IntlProvider locale="nb">
        <Story />
    </IntlProvider>
);

export default withIntlProvider;
