import { getBokmålLocale, getNynorskLocale } from 'common/utils/localeUtils';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { appMessages } from './messages';

export interface IntlProviderProps {
    locale: string;
    onError?: (error: any) => void;
    children: React.ReactNode;
}

const AppIntlProvider: React.FunctionComponent<IntlProviderProps> = ({ locale, onError, children }) => {
    const messages = locale === 'nb' ? appMessages.nb : appMessages.nn;
    const localeToUse = locale === 'nb' ? getBokmålLocale() : getNynorskLocale();
    return (
        <IntlProvider locale={localeToUse} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default AppIntlProvider;
