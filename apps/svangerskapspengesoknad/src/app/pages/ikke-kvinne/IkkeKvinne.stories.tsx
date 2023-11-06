import { StoryFn } from '@storybook/react';
import IkkeKvinne from './IkkeKvinne';
import { withRouter } from 'storybook-addon-react-router-v6';
import SvangerskapspengerContextProvider from 'app/context/SvangerskapspengerContext';
import IntlProvider from 'app/intl/IntlProvider';

import '@navikt/ds-css';

export default {
    title: 'pages/IkkeKvinne',
    component: IkkeKvinne,
    decorators: [withRouter],
};

const Template: StoryFn<any> = () => {
    return (
        <SvangerskapspengerContextProvider>
            <IntlProvider locale="nb">
                <IkkeKvinne></IkkeKvinne>;
            </IntlProvider>
        </SvangerskapspengerContextProvider>
    );
};

export const Default = Template.bind({});
Default.args = {};
