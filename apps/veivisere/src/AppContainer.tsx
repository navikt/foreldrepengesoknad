import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, SimpleErrorPage, uiMessages } from '@navikt/fp-ui';

import Veiviser from './Veiviser';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const allNbMessages = { ...nbMessages, ...uiMessages.nb };

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: { ...nnMessages, ...uiMessages.nn },
    en: { ...enMessages, ...uiMessages.en },
};

const initLocale = (): LocaleAll => {
    const defaultLocale = 'nb';
    dayjs.locale(defaultLocale);
    return defaultLocale;
};

const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleAll>(initLocale());

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocale(activeLocale);
        dayjs.locale(activeLocale);
        document.documentElement.setAttribute('lang', activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary
                appName="Foreldrepengeveivisere"
                customErrorPage={<SimpleErrorPage retryCallback={() => location.reload()} />}
            >
                <Veiviser locale={locale} changeLocale={changeLocale} />
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
