import { ReactRenderer } from '@storybook/react';
import { RawIntlProvider, createIntl } from 'react-intl';
import { DecoratorFunction } from 'storybook/internal/csf';

export const getIntlDecorator = (messagesForAllLanguages: Record<string, Record<string, string>>) => {
    const withIntlProvider: DecoratorFunction<ReactRenderer> = (story, context) => {
        const locale = (context.globals.locale as string) || 'nb';
        const messages = messagesForAllLanguages[locale];
        return <RawIntlProvider value={createIntl({ locale, messages })}>{story()}</RawIntlProvider>;
    };
    return withIntlProvider;
};
