import { StoryFn } from '@storybook/react';

import EksternUrl, { Props } from './EksternUrl';

export default {
    title: 'components/EksternUrl',
    component: EksternUrl,
};

const Template: StoryFn<Props> = (args) => <EksternUrl {...args} />;

export const Default = Template.bind({});
Default.args = {
    url: 'www.test.no',
    lenkeTekst: 'Dette er en lenketekst',
};

export const EkstraTekst = Template.bind({});
EkstraTekst.args = {
    url: 'www.test.no',
    lenkeTekst: 'Dette er en lenketekst',
    tekst: 'hjemmeside',
};
