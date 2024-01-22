import { useState } from 'react';
import dayjs from 'dayjs';
import { IntlProvider } from '@navikt/fp-ui';
import { LocaleNo } from '@navikt/fp-types';
import { allCommonMessages, getLocaleFromSessionStorage, setLocaleInSessionStorage } from '@navikt/fp-common';
import Foreldrepengesøknad from './Foreldrepengesøknad';
import ByttBrowserModal from 'app/pages/byttBrowserModal/ByttBrowserModal';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { shouldChangeBrowser } from './utils/browserUtils';
import nnMessages from './intl/nn_NO.json';
import nbMessages from './intl/nb_NO.json';
import { setAxiosLocale } from './api/apiInterceptor';
import { FpApiDataContext } from './api/context/FpApiDataContext';

const localeFromSessionStorage = getLocaleFromSessionStorage<LocaleNo>();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
    nn: { ...nnMessages, ...allCommonMessages.nn },
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
