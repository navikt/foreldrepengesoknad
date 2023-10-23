import { PrimitiveType, useIntl } from 'react-intl';
import { FormatXMLElementFn } from 'intl-messageformat';

export type I18nFn = (
    i18nId: string,
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
) => string;

export type CustomIntlShape = {
    i18n: I18nFn;
};

export const useCustomIntl = (): CustomIntlShape => {
    const intl = useIntl();
    return {
        i18n: (i18nId: string, values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>) =>
            intl.formatMessage({ id: i18nId }, values),
    };
};
