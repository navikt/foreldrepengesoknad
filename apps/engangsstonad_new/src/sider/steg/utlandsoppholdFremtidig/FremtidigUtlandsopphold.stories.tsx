import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FremtidigUtlandsopphold from './FremtidigUtlandsopphold';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'FremtidigUtlandsopphold',
    component: FremtidigUtlandsopphold,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <FremtidigUtlandsopphold
                lagreFremtidigUtenlandsopphold={action('button-click')}
                avbrytSøknad={action('button-click')}
            />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
