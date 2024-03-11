import { StoryFn } from '@storybook/react';

import ByttBrowserModal from './ByttBrowserModal';

export default {
    title: 'pages/ByttBrowserModal',
    component: ByttBrowserModal,
};

export const Default: StoryFn<typeof ByttBrowserModal> = () => <ByttBrowserModal skalEndreNettleser />;
