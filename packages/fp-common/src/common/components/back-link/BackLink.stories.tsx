import { StoryFn } from '@storybook/react';
import { HashRouter } from 'react-router-dom';

import BackLink from './BackLink';

export default {
    title: 'components/BackLink',
    component: BackLink,
};

export const Default: StoryFn<typeof BackLink> = () => (
    <HashRouter>
        {' '}
        <BackLink href="#" />
    </HashRouter>
);
