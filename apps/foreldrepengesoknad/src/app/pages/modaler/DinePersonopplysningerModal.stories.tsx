import { StoryFn } from '@storybook/react';

import DinePersonopplysningerModal from 'app/pages/modaler/DinePersonopplysningerModal';

export default {
    title: 'pages/DinePersonopplysningerModal',
    component: DinePersonopplysningerModal,
};

const Template: StoryFn<any> = (args) => <DinePersonopplysningerModal {...args} />;

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    onRequestClose: () => alert('Du prøver å lukke'),
};
