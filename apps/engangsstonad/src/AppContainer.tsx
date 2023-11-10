import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import { ErrorBoundary, IntlProvider } from '@navikt/fp-ui';
import { LocaleAll } from '@navikt/fp-types';
import { allCommonMessages, getLocaleFromSessionStorage, setLocaleInSessionStorage } from '@navikt/fp-common';

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

const tryAgainCallback = () => location.reload();

const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleAll>(localeFromSessionStorage);

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocaleInSessionStorage(activeLocale);
        setLocale(activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="Engangsstønad" tryAgainCallback={tryAgainCallback}>
                <BrowserRouter>
                    <Engangsstønad locale={locale} onChangeLocale={changeLocale} />
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
