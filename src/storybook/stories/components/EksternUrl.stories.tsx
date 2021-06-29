import React from 'react';

import withIntlProvider from '../../decorators/withIntl';
import EksternUrl, { Props } from '../../../app/components/ekstern-url/EksternUrl';

export default {
    title: 'components/EksternUrl',
    component: EksternUrl,
    decorators: [withIntlProvider],
};

const Template = (args: Props) => <EksternUrl {...args} />;

export const Lenketekst = Template.bind({});
Lenketekst.args = {
    url: 'www.test.no',
    lenkeTekst: 'Dette er en lenketekst',
};

export const EkstraTekst = Template.bind({});
EkstraTekst.args = {
    url: 'www.test.no',
    lenkeTekst: 'Dette er en lenketekst',
    tekst: 'hjemmeside',
};
