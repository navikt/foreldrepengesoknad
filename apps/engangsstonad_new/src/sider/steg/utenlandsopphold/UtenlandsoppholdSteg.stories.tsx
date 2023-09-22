import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <UtenlandsoppholdSteg
                lagreUtenlandsopphold={action('button-click')}
                avbrytSøknad={action('button-click')}
            />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
