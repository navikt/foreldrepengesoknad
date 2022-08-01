import React from 'react';

import { ByttBrowserModalImpl as ByttBrowserModal } from 'app/pages/byttBrowserModal/ByttBrowserModal';
import withIntlProvider from '../../decorators/withIntl';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
    title: 'pages/ByttBrowserModal',
    component: ByttBrowserModal,
    decorators: [withIntlProvider],
} as ComponentMeta<typeof ByttBrowserModal>;

export const Default: ComponentStory<typeof ByttBrowserModal> = () => <ByttBrowserModal skalEndreNettleser />;
