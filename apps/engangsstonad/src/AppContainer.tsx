import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { deleteData } from '@navikt/fp-api';
import { oppsummeringMessages } from '@navikt/fp-oppsummering';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { utenlandsoppholdMessages } from '@navikt/fp-utenlandsopphold';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage, utilsMessages } from '@navikt/fp-utils';

import Engangsstønad from './Engangsstønad';
import { esApi } from './EngangsstønadRoutes';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const allNbMessages = {
    ...nbMessages,
    ...uiMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...oppsummeringMessages.nb,
    ...utilsMessages.nb,
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const localeFromSessionStorage = getLocaleFromSessionStorage();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...utilsMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utenlandsoppholdMessages.en,
        ...oppsummeringMessages.en,
        ...utilsMessages.en,
    },
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
