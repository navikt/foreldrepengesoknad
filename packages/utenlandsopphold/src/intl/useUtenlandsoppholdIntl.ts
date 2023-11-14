import { useMemo } from 'react';
import { FormatXMLElementFn } from 'intl-messageformat';
import { useIntl, PrimitiveType, createIntl as createReactIntl, createIntlCache, IntlShape } from 'react-intl';
import nbMessages from './messages/nb_NO.json';
import nnMessages from './messages/nn_NO.json';
import enMessages from './messages/en_US.json';

const getLanguageMessages = (locale: string) => {
    if (locale === 'nb') {
        return nbMessages;
    } else if (locale === 'nn') {
        return nnMessages;
    } else {
        return enMessages;
    }
};

const cache = createIntlCache();

const createIntl = (locale: string, messages: Record<string, string>): IntlShape =>
    createReactIntl(
        {
            locale,
            messages,
        },
        cache,
    );

const useUtenlandsoppholdIntl = () => {
    const { locale } = useIntl();

    const intl = useMemo(() => {
        const messages = getLanguageMessages(locale) || {};
        return createIntl(locale, messages);
    }, [locale]);

    return {
        i18n: (i18nId: string, values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>) =>
            intl.formatMessage({ id: i18nId }, values),
    };
};

export default useUtenlandsoppholdIntl;
