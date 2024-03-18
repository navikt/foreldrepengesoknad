import { StoryFn } from '@storybook/react';

import PictureScanningGuide from './PictureScanningGuide';

export default {
    title: 'components/PictureScanningGuide',
    component: PictureScanningGuide,
};

export const Default: StoryFn = (args) => <PictureScanningGuide {...args} backgroundColor="white" />;
