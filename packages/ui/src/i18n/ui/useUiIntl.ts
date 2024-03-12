import { useMemo } from 'react';
import { IntlShape, createIntlCache, createIntl as createReactIntl, useIntl } from 'react-intl';

import enMessages from './messages/en_US.json';
import nbMessages from './messages/nb_NO.json';
import nnMessages from './messages/nn_NO.json';

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

const useUiIntl = () => {
    const { locale } = useIntl();

    const intl = useMemo(() => {
        const messages = getLanguageMessages(locale) || {};
        return createIntl(locale, messages);
    }, [locale]);

    return intl;
};

export default useUiIntl;
