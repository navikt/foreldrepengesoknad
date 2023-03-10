import React from 'react';
import { Story } from '@storybook/react';

import DinePersonopplysningerModal from 'app/pages/modaler/DinePersonopplysningerModal';
import withIntlProvider from '../../decorators/withIntl';

export default {
    title: 'pages/DinePersonopplysningerModal',
    component: DinePersonopplysningerModal,
    decorators: [withIntlProvider],
};

const Template: Story<any> = (args) => <DinePersonopplysningerModal {...args} />;

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    onRequestClose: () => alert('Du prøver å lukke'),
};
