import React from 'react';

import withIntlProvider from '../../decorators/withIntl';
import EksternUrl from '../../../app/components/ekstern-url/EksternUrl';

export default {
    title: 'components/EksternUrl',
    component: EksternUrl,
    decorators: [withIntlProvider],
};

export const visLenketekst = () => <EksternUrl url="www.test.no" lenkeTekst="Dette er en lenketekst" />;

export const visEkstraTekst = () => (
    <EksternUrl url="www.test.no" lenkeTekst="Dette er en lenketekst" tekst="hjemmeside" />
);
