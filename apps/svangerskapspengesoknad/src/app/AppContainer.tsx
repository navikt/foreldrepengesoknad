import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';

import { deleteData } from '@navikt/fp-api';
import { allCommonMessages } from '@navikt/fp-common';
import { LocaleNo } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage, shouldChangeBrowser } from '@navikt/fp-utils';

import Svangerskapspengesøknad from './Svangerskapspengesøknad';
import { svpApi } from './SvangerskapspengesøknadRoutes';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';
import ByttBrowserModal from './pages/byttBrowserModal/ByttBrowserModal';

const localeFromSessionStorage = getLocaleFromSessionStorage<LocaleNo>();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
    nn: { ...nnMessages, ...allCommonMessages.nn },
};

dayjs.locale(localeFromSessionStorage);

const retryCallback = async () => {
    try {
        await deleteData(svpApi, '/storage/svangerskapspenger', 'Feil ved sletting av mellomlagret data');
    } catch (error) {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

const AppContainer: FunctionComponent = () => {
    const [locale, setLocale] = useState<LocaleNo>(localeFromSessionStorage);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="Svangerskapspenger" retryCallback={retryCallback}>
                <ByttBrowserModal skalEndreNettleser={shouldChangeBrowser()} />
                <Svangerskapspengesøknad
                    locale={locale}
                    onChangeLocale={(activeLocale: LocaleNo) => {
                        setLocaleInSessionStorage(activeLocale);
                        setLocale(activeLocale);
                        document.documentElement.setAttribute('lang', activeLocale);
                    }}
                />
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
