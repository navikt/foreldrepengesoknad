import { StoryFn } from '@storybook/react';
import ByttBrowserModal from './ByttBrowserModal';
import withIntlProvider from 'storybook/decorators/withIntl';

export default {
    title: 'pages/ByttBrowserModal',
    component: ByttBrowserModal,
    decorators: [withIntlProvider],
};

export const Default: StoryFn<typeof ByttBrowserModal> = () => <ByttBrowserModal skalEndreNettleser />;
