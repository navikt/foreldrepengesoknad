import { FunctionComponent, useState } from 'react';
import Svangerskapspengesøknad from './Svangerskapspengesøknad';
import IntlProvider from './intl/IntlProvider';
import dayjs from 'dayjs';
import ByttBrowserModal from '@navikt/fp-common/src/common/pages/byttBrowserModal/ByttBrowserModal';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { shouldChangeBrowser } from '@navikt/fp-common/src/common/utils/browserUtils';
import SvangerskapspengerContextProvider from './context/SvangerskapspengerContext';
import { getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
const localeFromSessionStorage = getLocaleFromSessionStorage();

dayjs.locale(localeFromSessionStorage);

const AppContainer: FunctionComponent = () => {
    const [locale, setLocale] = useState<Locale>(localeFromSessionStorage);

    return (
        <SvangerskapspengerContextProvider>
            <ErrorBoundary>
                <IntlProvider locale={locale}>
                    <ByttBrowserModal skalEndreNettleser={shouldChangeBrowser()} />
                    <Svangerskapspengesøknad
                        locale={locale}
                        onChangeLocale={(activeLocale: Locale) => {
                            setLocaleInSessionStorage(activeLocale);
                            setLocale(activeLocale);
                        }}
                    />
                </IntlProvider>
            </ErrorBoundary>
        </SvangerskapspengerContextProvider>
    );
};

export default AppContainer;
