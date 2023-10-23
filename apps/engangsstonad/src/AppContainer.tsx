import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import { ErrorBoundary } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
import Engangsstønad from './Engangsstønad';
import IntlProvider from './intl/IntlProvider';

const localeFromSessionStorage = getLocaleFromSessionStorage();

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = useState<Locale>(localeFromSessionStorage);

    const changeLocale = useCallback((activeLocale: Locale) => {
        setLocaleInSessionStorage(activeLocale);
        setLocale(activeLocale);
    }, []);

    return (
        <ErrorBoundary>
            <IntlProvider språkkode={locale}>
                <BrowserRouter>
                    <Engangsstønad locale={locale} onChangeLocale={changeLocale} />
                </BrowserRouter>
            </IntlProvider>
        </ErrorBoundary>
    );
};

export default AppContainer;
