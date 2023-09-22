import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SisteUtlandsopphold from './SisteUtlandsopphold';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'SisteUtlandsopphold',
    component: SisteUtlandsopphold,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <SisteUtlandsopphold
                lagreSisteUtenlandsopphold={action('button-click')}
                avbrytSøknad={action('button-click')}
            />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
