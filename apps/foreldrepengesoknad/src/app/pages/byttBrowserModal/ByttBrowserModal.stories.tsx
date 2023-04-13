import React from 'react';

import withIntlProvider from 'storybook/decorators/withIntl';
import { Meta, StoryFn } from '@storybook/react';
import ByttBrowserModal from './ByttBrowserModal';

export default {
    title: 'pages/ByttBrowserModal',
    component: ByttBrowserModal,
    decorators: [withIntlProvider],
} as Meta;

export const Default: StoryFn<typeof ByttBrowserModal> = () => <ByttBrowserModal skalEndreNettleser={true} />;
