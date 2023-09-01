import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Velkommen from './Velkommen';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'Velkommen',
    component: Velkommen,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <Velkommen startSøknad={action('button-click')} onChangeLocale={action('button-click')} locale="nb" />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
