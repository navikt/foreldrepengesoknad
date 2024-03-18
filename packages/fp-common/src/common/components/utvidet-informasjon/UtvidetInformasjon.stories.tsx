import { StoryFn } from '@storybook/react';

import UtvidetInformasjon, { UtvidetInformasjonProps } from './UtvidetInformasjon';

export default {
    title: 'components/UtvidetInformasjon',
    component: UtvidetInformasjon,
};

const Template: StoryFn<UtvidetInformasjonProps> = (args) => <UtvidetInformasjon {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: (
        <>
            Noen ting <div>Flere ting</div>{' '}
        </>
    ),
    erApen: true,
    apneLabel: <>Les mer</>,
};
