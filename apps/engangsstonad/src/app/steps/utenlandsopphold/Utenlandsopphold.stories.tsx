import { StoryFn } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import EngangsstønadContextProvider from '../../context/EngangsstønadContext';
import Utenlandsopphold from './Utenlandsopphold';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import '../../styles/globals.less';

export default {
    title: 'Utenlandsopphold',
    component: Utenlandsopphold,
    decorators: [withRouter],
};

const Template: StoryFn<any> = () => {
    return (
        <EngangsstønadContextProvider>
            <IntlProvider språkkode="nb">
                <Utenlandsopphold />
            </IntlProvider>
        </EngangsstønadContextProvider>
    );
};

export const VisSide = Template.bind({});
