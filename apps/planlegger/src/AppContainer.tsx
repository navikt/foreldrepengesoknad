import { PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from '@navikt/fp-common';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';

import Planlegger from './Planlegger';
import enMessages from './intl/messages/en_NO.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const localeFromSessionStorage = getLocaleFromSessionStorage();

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

const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleAll>(localeFromSessionStorage);

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocaleInSessionStorage(activeLocale);
        setLocale(activeLocale);
        document.documentElement.setAttribute('lang', activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={() => undefined}>
                <BrowserRouter>
                    <PlanleggerDataContext>
                        <Planlegger locale={locale} changeLocale={changeLocale} />
                    </PlanleggerDataContext>
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
