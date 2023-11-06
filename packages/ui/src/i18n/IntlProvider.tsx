import { IntlProvider as Provider } from 'react-intl';
import { LocaleAll } from '@navikt/fp-types';

interface Props<T extends LocaleAll> {
    locale: T;
    messagesGroupedByLocale: Record<T, Record<string, string>>;
    children: React.ReactNode;
}

const IntlProvider = <T extends LocaleAll>({ locale, messagesGroupedByLocale, children }: Props<T>) => {
    const messages = messagesGroupedByLocale[locale];
    return (
        <Provider locale={locale} messages={messages || {}}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
