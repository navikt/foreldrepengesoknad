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

const UiIntlProvider: React.FunctionComponent<Props> = ({ children }) => {
    const { locale } = useIntl();

    const messages = useMemo(() => getLanguageMessages(locale) || {}, [locale]);
    return (
        <Provider locale={locale} messages={messages}>
            {children}
        </Provider>
    );
};
export default UiIntlProvider;
