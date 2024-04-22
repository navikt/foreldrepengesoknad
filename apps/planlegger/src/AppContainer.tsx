import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';

import PlanleggerDataInit from './Planlegger';
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

const getLocale = (): LocaleAll => {
    const queryString = window.location.search;
    const languageParam = new URLSearchParams(queryString).get('language');
    return languageParam ? (languageParam as LocaleAll) : 'nb';
};

const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleAll>(getLocale());

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocale(activeLocale);
        document.documentElement.setAttribute('lang', activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={() => undefined}>
                <BrowserRouter>
                    <PlanleggerDataInit locale={locale} changeLocale={changeLocale} />
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
