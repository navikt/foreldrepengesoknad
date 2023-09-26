import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';

import Velkommen from './Velkommen';

export default {
    title: 'Velkommen',
    component: Velkommen,
    decorators: [withRouterProvider],
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <Velkommen startSøknad={action('button-click')} onChangeLocale={action('button-click')} locale="nb" />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
