import dayjs from 'dayjs';
import { useState } from 'react';

import { setAxiosLocale } from '@navikt/fp-api';
import { allCommonMessages, getLocaleFromSessionStorage, setLocaleInSessionStorage } from '@navikt/fp-common';
import { oppsummeringMessages } from '@navikt/fp-oppsummering';
import { LocaleNo } from '@navikt/fp-types';
import { ByttBrowserModal, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { utenlandsoppholdMessages } from '@navikt/fp-utenlandsopphold';
import { utilsMessages } from '@navikt/fp-utils';
import { uttaksplanMessages } from '@navikt/fp-uttaksplan';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender';

import Foreldrepengesøknad from './Foreldrepengesøknad';
import { FpApiDataContext } from './api/context/FpApiDataContext';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

const localeFromSessionStorage = getLocaleFromSessionStorage<LocaleNo>();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...allCommonMessages.nb,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...uttaksplanMessages.nb,
        ...utilsMessages.nb,
        ...uttaksplanKalenderMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...allCommonMessages.nn,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...uttaksplanMessages.nn,
        ...utilsMessages.nn,
        ...uttaksplanKalenderMessages.nn,
    },
};

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleNo>(localeFromSessionStorage);

    return (
        <ErrorBoundary>
            <FpApiDataContext>
                <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ByttBrowserModal />
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
