import { StoryFn } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import '@navikt/ds-css';

import IkkeKvinne from './IkkeKvinne';

export default {
    title: 'pages/IkkeKvinne',
    component: IkkeKvinne,
    decorators: [withRouter],
};

const Template: StoryFn<any> = () => {
    return <IkkeKvinne />;
};

export const Default = Template.bind({});
