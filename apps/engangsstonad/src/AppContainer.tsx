import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import { ErrorBoundary, IntlProvider } from '@navikt/fp-ui';
import { allCommonMessages, getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
import Engangsstønad from './Engangsstønad';

import nnMessages from './intl/messages/nn_NO.json';
import nbMessages from './intl/messages/nb_NO.json';
import enMessages from './intl/messages/en_US.json';

const localeFromSessionStorage = getLocaleFromSessionStorage();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
    nn: { ...nnMessages, ...allCommonMessages.nn },
    en: { ...enMessages, ...allCommonMessages.en },
};

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = useState<Locale>(localeFromSessionStorage);

    const changeLocale = useCallback((activeLocale: Locale) => {
        setLocaleInSessionStorage(activeLocale);
        setLocale(activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appnavn="Engangsstønad">
                <BrowserRouter>
                    <Engangsstønad locale={locale} onChangeLocale={changeLocale} />
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
