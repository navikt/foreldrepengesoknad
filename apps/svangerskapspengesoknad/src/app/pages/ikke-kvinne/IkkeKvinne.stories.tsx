import { StoryFn } from '@storybook/react';

import '@navikt/ds-css';

import IkkeKvinne from './IkkeKvinne';

export default {
    title: 'pages/IkkeKvinne',
    component: IkkeKvinne,
};

const Template: StoryFn<any> = () => {
    return <IkkeKvinne />;
};

export const Default = Template.bind({});
