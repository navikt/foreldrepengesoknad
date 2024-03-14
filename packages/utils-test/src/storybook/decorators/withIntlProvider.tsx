import { RawIntlProvider, createIntl } from 'react-intl';

export const getIntlDecorator = (messagesForAllLanguages: Record<string, Record<string, string>>) => {
    const withIntlProvider = (story: any, context: any) => {
        const locale = context.globals.locale || 'nb';
        const messages = messagesForAllLanguages[locale];
        return <RawIntlProvider value={createIntl({ locale, messages })}>{story()}</RawIntlProvider>;
    };
    return withIntlProvider;
};
