import { ComponentMeta, Story } from '@storybook/react';
import UtvidetInformasjon, { UtvidetInformasjonProps } from './UtvidetInformasjon';

export default {
    title: 'components/UtvidetInformasjon',
    component: UtvidetInformasjon,
} as ComponentMeta<typeof UtvidetInformasjon>;

const Template: Story<UtvidetInformasjonProps> = (args) => <UtvidetInformasjon {...args} />;

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
