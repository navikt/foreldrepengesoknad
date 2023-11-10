import { StoryFn } from '@storybook/react';
import IkkeKvinne from './IkkeKvinne';
import { withRouter } from 'storybook-addon-react-router-v6';
import SvangerskapspengerContextProvider from 'app/context/SvangerskapspengerContext';

import '@navikt/ds-css';

export default {
    title: 'pages/IkkeKvinne',
    component: IkkeKvinne,
    decorators: [withRouter],
};

const Template: StoryFn<any> = () => {
    return (
        <SvangerskapspengerContextProvider>
            <IkkeKvinne />;
        </SvangerskapspengerContextProvider>
    );
};

export const Default = Template.bind({});
