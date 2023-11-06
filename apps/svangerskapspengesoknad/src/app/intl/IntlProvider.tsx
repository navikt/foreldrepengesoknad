import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import dayjs from 'dayjs';
import nbMessages from './nb_NO.json';
import nnMessages from './nn_NO.json';
import { allCommonMessages } from '@navikt/fp-common';
import { LocaleNo } from '@navikt/fp-types';

interface Props {
    children: React.ReactNode;
    locale: LocaleNo;
}

dayjs.locale('nb');

const getLanguageMessages = (locale: LocaleNo) => {
    if (locale === 'nb') {
        return { ...nbMessages, ...allCommonMessages.nb };
    } else {
        return { ...nnMessages, ...allCommonMessages.nn };
    }
};

const IntlProvider: React.FunctionComponent<Props> = ({ locale, children }) => {
    return (
        <Provider locale={locale} messages={getLanguageMessages(locale)}>
            {children}
        </Provider>
    );
};
export default IntlProvider;
