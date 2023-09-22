import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TidligereUtlandsopphold from './TidligereUtlandsopphold';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'TidligereUtlandsopphold',
    component: TidligereUtlandsopphold,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <TidligereUtlandsopphold
                lagreFremtidigUtenlandsopphold={action('button-click')}
                avbrytSøknad={action('button-click')}
            />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
