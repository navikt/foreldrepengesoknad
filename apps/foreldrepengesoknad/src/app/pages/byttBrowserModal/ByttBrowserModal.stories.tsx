import React from 'react';

import withIntlProvider from 'storybook/decorators/withIntl';
import { StoryFn } from '@storybook/react';
import { ByttBrowserModalImpl as ByttBrowserModal } from './ByttBrowserModal';

export default {
    title: 'pages/ByttBrowserModal',
    component: ByttBrowserModal,
    decorators: [withIntlProvider],
};

export const Default: StoryFn<typeof ByttBrowserModal> = () => <ByttBrowserModal skalEndreNettleser />;
