import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
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

const initLocale = (): LocaleAll => {
    const queryString = window.location.search;
    const languageParam = new URLSearchParams(queryString).get('language');
    const locale =
        languageParam === 'nb' || languageParam === 'nn' || languageParam === 'en'
            ? (languageParam as LocaleAll)
            : 'nb';

    dayjs.locale(locale);
    document.documentElement.setAttribute('lang', locale);

    return locale;
};

const retryCallback = async () => {
    window.location.href = window.location.origin;
};

const AppContainer = () => {
    const origLocale = useMemo(() => initLocale(), []);
    const [locale, setLocale] = useState<LocaleAll>(origLocale);

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocale(activeLocale);
        dayjs.locale(activeLocale);
        document.documentElement.setAttribute('lang', activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={retryCallback}>
                <BrowserRouter>
                    <PlanleggerDataInit locale={locale} changeLocale={changeLocale} />
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
