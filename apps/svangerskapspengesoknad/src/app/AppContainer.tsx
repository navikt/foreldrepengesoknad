import { FunctionComponent, useState } from 'react';
import dayjs from 'dayjs';
import { IntlProvider } from '@navikt/fp-ui';
import { allCommonMessages, getLocaleFromSessionStorage, setLocaleInSessionStorage } from '@navikt/fp-common';
import { LocaleNo } from '@navikt/fp-types';

import Svangerskapspengesøknad from './Svangerskapspengesøknad';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import SvangerskapspengerContextProvider from './context/SvangerskapspengerContext';
import { shouldChangeBrowser } from './utils/browserUtils';
import ByttBrowserModal from './pages/byttBrowserModal/ByttBrowserModal';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

const localeFromSessionStorage = getLocaleFromSessionStorage<LocaleNo>();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
    nn: { ...nnMessages, ...allCommonMessages.nn },
};

dayjs.locale(localeFromSessionStorage);

const AppContainer: FunctionComponent = () => {
    const [locale, setLocale] = useState<LocaleNo>(localeFromSessionStorage);

    return (
        <SvangerskapspengerContextProvider>
            <ErrorBoundary>
                <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
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
