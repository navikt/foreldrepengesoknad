import { createIntl, RawIntlProvider } from 'react-intl';

export const getIntlDecorator = (messagesForAllLanguages: Record<string, Record<string, string>>) => {
    const withIntlProvider = (story: any, context: any) => {
        const messages = messagesForAllLanguages[context.globals.locale];
        return (
            <RawIntlProvider value={createIntl({ locale: context.globals.locale, messages })}>
                {story()}
            </RawIntlProvider>
        );
    };
    return withIntlProvider;
};

const withIntlProvider = (story: any, context: any) => {
    return (
        <RawIntlProvider value={createIntl({ locale: context.globals.locale, messages: {} })}>
            {story()}
        </RawIntlProvider>
    );
};

export default withIntlProvider;
