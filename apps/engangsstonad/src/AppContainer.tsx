import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { deleteData } from '@navikt/fp-api';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from '@navikt/fp-utils';

import Engangsstønad from './Engangsstønad';
import { esApi } from './EngangsstønadRoutes';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const localeFromSessionStorage = getLocaleFromSessionStorage();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

dayjs.locale(localeFromSessionStorage);

const retryCallback = async () => {
    try {
        await deleteData(esApi, '/storage/engangsstonad', 'Feil ved sletting av mellomlagret data');
    } catch (error) {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
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
            <ErrorBoundary appName="Engangsstønad" retryCallback={retryCallback}>
                <BrowserRouter>
                    <Engangsstønad locale={locale} onChangeLocale={changeLocale} />
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
