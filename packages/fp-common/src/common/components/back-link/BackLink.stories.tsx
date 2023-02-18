import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HashRouter } from 'react-router-dom';
import BackLink from './BackLink';

export default {
    title: 'components/BackLink',
    component: BackLink,
} as ComponentMeta<typeof BackLink>;

export const Default: ComponentStory<typeof BackLink> = () => (
    <HashRouter>
        {' '}
        <BackLink href="#" />
    </HashRouter>
);
