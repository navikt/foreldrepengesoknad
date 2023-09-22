import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SøkersituasjonSteg from './SøkersituasjonSteg';
import IntlProvider from '../../../intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'SøkersituasjonSteg',
    component: SøkersituasjonSteg,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <SøkersituasjonSteg lagreSøkersituasjon={action('button-click')} avbrytSøknad={action('button-click')} />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
