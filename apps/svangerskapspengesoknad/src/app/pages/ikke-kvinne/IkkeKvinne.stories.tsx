import { StoryFn } from '@storybook/react';
import IkkeKvinne, { IkkeKvinneProps } from './IkkeKvinne';
import { withRouter } from 'storybook-addon-react-router-v6';
import SvangerskapspengerContextProvider from 'app/context/SvangerskapspengerContext';
import IntlProvider from 'app/intl/IntlProvider';

import '@navikt/ds-css';
import '../../styles/globals.less';

export default {
    title: 'pages/IkkeMyndig/IkkeKvinne',
    component: IkkeKvinne,
    decorators: [withRouter],
};

const Template: StoryFn<any> = (args: IkkeKvinneProps) => {
    return (
        <SvangerskapspengerContextProvider>
            <IntlProvider locale="nb">
                <IkkeKvinne {...args}></IkkeKvinne>;
            </IntlProvider>
        </SvangerskapspengerContextProvider>
    );
};

export const Default = Template.bind({});
Default.args = {
    fornavn: 'Vakker',
};
