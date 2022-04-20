import React, { useState } from 'react';
import dayjs from 'dayjs';
import { getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
import IntlProvider from './intl/IntlProvider';
import ForeldrepengesøknadContextProvider from './context/ForeldrepengesøknadContext';
import Foreldrepengesøknad from './Foreldrepengesøknad';
import ByttBrowserModal from 'app/pages/byttBrowserModal/ByttBrowserModal';

const localeFromSessionStorage = getLocaleFromSessionStorage();

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = useState<Locale>(localeFromSessionStorage);

    return (
        <ForeldrepengesøknadContextProvider>
            <IntlProvider locale={locale}>
                <ByttBrowserModal />
                <Foreldrepengesøknad
                    locale={locale}
                    onChangeLocale={(activeLocale: Locale) => {
                        setLocaleInSessionStorage(activeLocale);
                        setLocale(activeLocale);
                    }}
                />
            </IntlProvider>
        </ForeldrepengesøknadContextProvider>
    );
};

export default AppContainer;
