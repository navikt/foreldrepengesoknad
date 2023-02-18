import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import dayjs from 'dayjs';
import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';
import { allCommonMessages, Locale } from '@navikt/fp-common';

interface Props {
    locale: Locale;
    children: React.ReactNode;
}

dayjs.locale('nb');

const getLanguageMessages = (locale: Locale) => {
    if (locale === 'nb') {
        return { ...nbMessages, ...allCommonMessages.nb };
    } else {
        return { ...nnMessages, ...allCommonMessages.nn };
    }
};

const IntlProvider: React.FunctionComponent<Props> = ({ locale, children }) => {
    return (
        <Provider locale={locale} messages={getLanguageMessages(locale) || {}}>
            {children}
        </Provider>
    );
};
export default IntlProvider;
