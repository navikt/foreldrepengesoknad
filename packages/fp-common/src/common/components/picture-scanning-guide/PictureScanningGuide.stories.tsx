import { ComponentMeta, Story } from '@storybook/react';
import PictureScanningGuide from './PictureScanningGuide';

export default {
    title: 'components/PictureScanningGuide',
    component: PictureScanningGuide,
} as ComponentMeta<typeof PictureScanningGuide>;

export const Default: Story = (args) => <PictureScanningGuide {...args} />;
