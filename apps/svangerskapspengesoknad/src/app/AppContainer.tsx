import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';

import { deleteData } from '@navikt/fp-api';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { LocaleNo } from '@navikt/fp-types';
import { ByttBrowserModal, ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage, utilsMessages } from '@navikt/fp-utils';

import Svangerskapspengesøknad from './Svangerskapspengesøknad';
import { svpApi } from './SvangerskapspengesøknadRoutes';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

const allNbMessages = {
    ...nbMessages,
    ...uiMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...oppsummeringMessages.nb,
    ...utilsMessages.nb,
    ...frilansMessages.nb,
    ...egenNæringMessages.nb,
    ...arbeidsforholdOgInntektMessages.nb,
};
const allNnMessages = {
    ...nnMessages,
    ...uiMessages.nn,
    ...utenlandsoppholdMessages.nn,
    ...oppsummeringMessages.nn,
    ...utilsMessages.nn,
    ...frilansMessages.nn,
    ...egenNæringMessages.nn,
    ...arbeidsforholdOgInntektMessages.nn,
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const localeFromSessionStorage = getLocaleFromSessionStorage<LocaleNo>();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: allNnMessages,
};

dayjs.locale(localeFromSessionStorage);

const retryCallback = async () => {
    try {
        await deleteData(svpApi, '/rest/storage/svangerskapspenger', 'Feil ved sletting av mellomlagret data');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                <ByttBrowserModal />
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
