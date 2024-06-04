import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';

import { deleteData } from '@navikt/fp-api';
import { oppsummeringMessages } from '@navikt/fp-oppsummering';
import { LocaleNo } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { utenlandsoppholdMessages } from '@navikt/fp-utenlandsopphold';
import {
    getLocaleFromSessionStorage,
    setLocaleInSessionStorage,
    shouldChangeBrowser,
    utilsMessages,
} from '@navikt/fp-utils';

import Svangerskapspengesøknad from './Svangerskapspengesøknad';
import { svpApi } from './SvangerskapspengesøknadRoutes';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';
import ByttBrowserModal from './pages/byttBrowserModal/ByttBrowserModal';

const allNbMessages = {
    ...nbMessages,
    ...uiMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...oppsummeringMessages.nb,
    ...utilsMessages.nb,
};
const allNnMessages = {
    ...nnMessages,
    ...uiMessages.nn,
    ...utenlandsoppholdMessages.nn,
    ...oppsummeringMessages.nn,
    ...utilsMessages.nn,
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const localeFromSessionStorage = getLocaleFromSessionStorage<LocaleNo>();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: allNnMessages,
};

dayjs.locale(localeFromSessionStorage);

const retryCallback = async () => {
    try {
        await deleteData(svpApi, '/storage/svangerskapspenger', 'Feil ved sletting av mellomlagret data');
    } catch (error) {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

const AppContainer: FunctionComponent = () => {
    const [locale, setLocale] = useState<LocaleNo>(localeFromSessionStorage);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="Svangerskapspenger" retryCallback={retryCallback}>
                <ByttBrowserModal skalEndreNettleser={shouldChangeBrowser()} />
                <Svangerskapspengesøknad
                    locale={locale}
                    onChangeLocale={(activeLocale: LocaleNo) => {
                        setLocaleInSessionStorage(activeLocale);
                        setLocale(activeLocale);
                        document.documentElement.setAttribute('lang', activeLocale);
                    }}
                />
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
