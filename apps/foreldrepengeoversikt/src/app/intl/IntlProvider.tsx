import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import dayjs from 'dayjs';
import nbMessages from './nb_NO.json';
import { allCommonMessages, Locale } from '@navikt/fp-common';

interface Props {
    children: React.ReactNode;
    locale: Locale;
}

dayjs.locale('nb');

const getLanguageMessages = (_locale: Locale) => {
    return { ...nbMessages, ...allCommonMessages.nb };
};

const IntlProvider: React.FunctionComponent<Props> = ({ locale, children }) => {
    return (
        <Provider locale={locale} messages={getLanguageMessages(locale) || {}}>
            {children}
        </Provider>
    );
};
export default IntlProvider;
