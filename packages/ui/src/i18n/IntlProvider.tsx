import { IntlProvider as Provider } from 'react-intl';
import { Locale } from '@navikt/fp-types';

interface Props {
    locale: Locale;
    messagesGroupedByLocale: Record<Locale, Record<string, string>>;
    children: React.ReactNode;
}

const IntlProvider: React.FunctionComponent<Props> = ({ locale, messagesGroupedByLocale, children }) => {
    const messages = messagesGroupedByLocale[locale];
    return (
        <Provider locale={locale} messages={messages || {}}>
            {children}
        </Provider>
    );
};
export default IntlProvider;
