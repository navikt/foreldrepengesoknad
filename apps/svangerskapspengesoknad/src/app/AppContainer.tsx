import { FunctionComponent, useState } from 'react';
import Svangerskapspengesøknad from './Svangerskapspengesøknad';
import IntlProvider from './intl/IntlProvider';
import dayjs from 'dayjs';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import SvangerskapspengerContextProvider from './context/SvangerskapspengerContext';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from '@navikt/fp-common';
import { LocaleNo } from '@navikt/fp-types';
import { shouldChangeBrowser } from './utils/browserUtils';
import ByttBrowserModal from './pages/byttBrowserModal/ByttBrowserModal';

const localeFromSessionStorage = getLocaleFromSessionStorage<LocaleNo>();

dayjs.locale(localeFromSessionStorage);

const AppContainer: FunctionComponent = () => {
    const [locale, setLocale] = useState<LocaleNo>(localeFromSessionStorage);

    return (
        <SvangerskapspengerContextProvider>
            <ErrorBoundary>
                <IntlProvider locale={locale}>
                    <ByttBrowserModal skalEndreNettleser={shouldChangeBrowser()} />
                    <Svangerskapspengesøknad
                        locale={locale}
                        onChangeLocale={(activeLocale: LocaleNo) => {
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
