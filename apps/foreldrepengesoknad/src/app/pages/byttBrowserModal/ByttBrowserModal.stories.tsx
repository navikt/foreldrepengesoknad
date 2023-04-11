import React from 'react';

import withIntlProvider from 'storybook/decorators/withIntl';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ByttBrowserModalImpl as ByttBrowserModal } from './ByttBrowserModal';

export default {
    title: 'pages/ByttBrowserModal',
    component: ByttBrowserModal,
    decorators: [withIntlProvider],
} as ComponentMeta<typeof ByttBrowserModal>;

export const Default: ComponentStory<typeof ByttBrowserModal> = () => <ByttBrowserModal skalEndreNettleser />;
