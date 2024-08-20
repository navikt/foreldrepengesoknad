import dayjs from 'dayjs';
import { useState } from 'react';

import { setAxiosLocale } from '@navikt/fp-api';
import { allCommonMessages } from '@navikt/fp-common';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { LocaleNo } from '@navikt/fp-types';
import { ByttBrowserModal, ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage, utilsMessages } from '@navikt/fp-utils';
import { uttaksplanMessages } from '@navikt/fp-uttaksplan';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender';

import Foreldrepengesøknad, { retryCallback } from './Foreldrepengesøknad';
import { FpApiDataContext } from './api/context/FpApiDataContext';
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
        <ErrorBoundary appName="Foreldrepenger" retryCallback={retryCallback}>
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
