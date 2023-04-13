import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
import IntlProvider from './intl/IntlProvider';
import ForeldrepengesøknadContextProvider from './context/ForeldrepengesøknadContext';
import Foreldrepengesøknad from './Foreldrepengesøknad';
import ByttBrowserModal from 'app/pages/byttBrowserModal/ByttBrowserModal';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { Modal } from '@navikt/ds-react';
import { shouldChangeBrowser } from './utils/browserUtils';

const localeFromSessionStorage = getLocaleFromSessionStorage();

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = useState<Locale>(localeFromSessionStorage);

    useEffect(() => {
        if (Modal.setAppElement) {
            Modal.setAppElement('#app');
        }
    });

    return (
        <ForeldrepengesøknadContextProvider>
            <ErrorBoundary>
                <IntlProvider locale={locale}>
                    <ByttBrowserModal skalEndreNettleser={shouldChangeBrowser()} />
                    <Foreldrepengesøknad
                        locale={locale}
                        onChangeLocale={(activeLocale: Locale) => {
                            setLocaleInSessionStorage(activeLocale);
                            setLocale(activeLocale);
                        }}
                    />
                </IntlProvider>
            </ErrorBoundary>
        </ForeldrepengesøknadContextProvider>
    );
};

export default AppContainer;
