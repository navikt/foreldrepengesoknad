import dayjs from 'dayjs';
import { getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
import Engangsstønad from './Engangsstønad';
import EngangsstønadContextProvider from './context/EngangsstønadContext';
import IntlProvider from './intl/IntlProvider';
import { useState } from 'react';

const localeFromSessionStorage = getLocaleFromSessionStorage();

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = useState<Locale>(localeFromSessionStorage);

    return (
        <EngangsstønadContextProvider>
            <IntlProvider språkkode={locale}>
                <Engangsstønad
                    locale={locale}
                    onChangeLocale={(activeLocale: Locale) => {
                        setLocaleInSessionStorage(activeLocale);
                        setLocale(activeLocale);
                    }}
                />
            </IntlProvider>
        </EngangsstønadContextProvider>
    );
};

export default AppContainer;
