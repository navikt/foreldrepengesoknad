import { useMemo } from 'react';
import { IntlProvider as Provider, useIntl } from 'react-intl';

import nbMessages from './messages/nb_NO.json';
import nnMessages from './messages/nn_NO.json';
import enMessages from './messages/en_US.json';

interface Props {
    children: React.ReactNode;
}

const getLanguageMessages = (locale: string) => {
    if (locale === 'nb') {
        return nbMessages;
    } else if (locale === 'nn') {
        return nnMessages;
    } else {
        return enMessages;
    }
};

const OppsummeringIntlProvider: React.FunctionComponent<Props> = ({ children }) => {
    const { locale, messages } = useIntl();

    const messagesPackage = useMemo(() => getLanguageMessages(locale) || {}, [locale]);
    return (
        <Provider locale={locale} messages={{ ...messages, ...messagesPackage }}>
            {children}
        </Provider>
    );
};
export default OppsummeringIntlProvider;
