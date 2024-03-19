import dayjs from 'dayjs';
import { useState } from 'react';

import { allCommonMessages, getLocaleFromSessionStorage, setLocaleInSessionStorage } from '@navikt/fp-common';
import { oppsummeringMessages } from '@navikt/fp-oppsummering';
import { LocaleNo } from '@navikt/fp-types';
import { IntlProvider, uiMessages } from '@navikt/fp-ui';
import { utenlandsoppholdMessages } from '@navikt/fp-utenlandsopphold';

import ByttBrowserModal from 'app/pages/byttBrowserModal/ByttBrowserModal';

import Foreldrepengesøknad from './Foreldrepengesøknad';
import { setAxiosLocale } from './api/apiInterceptor';
import { FpApiDataContext } from './api/context/FpApiDataContext';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';
import { shouldChangeBrowser } from './utils/browserUtils';

const localeFromSessionStorage = getLocaleFromSessionStorage<LocaleNo>();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...allCommonMessages.nb,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...allCommonMessages.nn,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
    },
};

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleNo>(localeFromSessionStorage);

    return (
        <ErrorBoundary>
            <FpApiDataContext>
                <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ByttBrowserModal skalEndreNettleser={shouldChangeBrowser()} />
                    <Foreldrepengesøknad
                        locale={locale}
                        onChangeLocale={(activeLocale: LocaleNo) => {
                            setLocaleInSessionStorage(activeLocale);
                            setLocale(activeLocale);
                            setAxiosLocale(activeLocale);
                            document.documentElement.setAttribute('lang', activeLocale);
                        }}
                    />
                </IntlProvider>
            </FpApiDataContext>
        </ErrorBoundary>
    );
};

export default AppContainer;
