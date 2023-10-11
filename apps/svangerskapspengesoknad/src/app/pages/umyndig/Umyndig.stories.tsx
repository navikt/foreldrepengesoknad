import { StoryFn } from '@storybook/react';
import Umyndig from './Umyndig';
import { withRouter } from 'storybook-addon-react-router-v6';
import SvangerskapspengerContextProvider from 'app/context/SvangerskapspengerContext';
import IntlProvider from 'app/intl/IntlProvider';

import '@navikt/ds-css';
import '../../styles/globals.less';

export default {
    title: 'pages/IkkeMyndig/Umyndig',
    component: Umyndig,
    decorators: [withRouter],
};

const Template: StoryFn<any> = () => {
    return (
        <SvangerskapspengerContextProvider>
            <IntlProvider locale="nb">
                <Umyndig></Umyndig>;
            </IntlProvider>
        </SvangerskapspengerContextProvider>
    );
};

export const Default = Template.bind({});
Default.args = {};
