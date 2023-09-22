import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NesteUtlandsopphold from './NesteUtlandsopphold';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'NesteUtlandsopphold',
    component: NesteUtlandsopphold,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <NesteUtlandsopphold
                lagreNesteUtenlandsopphold={action('button-click')}
                avbrytSøknad={action('button-click')}
            />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
