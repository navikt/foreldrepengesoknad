import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UtenlandsoppholdForm from './UtenlandsoppholdForm';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'UtenlandsoppholdForm',
    component: UtenlandsoppholdForm,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <UtenlandsoppholdForm
                lagreUtenlandsopphold={action('button-click')}
                avbrytSøknad={action('button-click')}
            />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
