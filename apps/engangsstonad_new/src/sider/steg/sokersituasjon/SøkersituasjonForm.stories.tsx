import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SøkersituasjonForm from './SøkersituasjonForm';
import IntlProvider from '../../../intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'SøkersituasjonForm',
    component: SøkersituasjonForm,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <SøkersituasjonForm lagreSøkersituasjon={action('button-click')} avbrytSøknad={action('button-click')} />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
