import React from 'react';

import { ByttBrowserModalImpl as ByttBrowserModal } from 'app/pages/byttBrowserModal/ByttBrowserModal';
import withIntlProvider from '../../decorators/withIntl';

export default {
    title: 'pages/ByttBrowserModal',
    component: ByttBrowserModal,
    decorators: [withIntlProvider],
};

export const Default = () => <ByttBrowserModal skalEndreNettleser />;
