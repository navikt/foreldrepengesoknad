import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Provider, Theme } from '@navikt/ds-react';
import { nb, nn } from '@navikt/ds-react/locales';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { observabilityMessages } from '@navikt/fp-observability';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { kvitteringMessages } from '@navikt/fp-steg-kvittering';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { LocaleAll, LocaleNo } from '@navikt/fp-types';
import { ByttBrowserModal, ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { getDecoratorLanguageCookie, utilsMessages } from '@navikt/fp-utils';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan';

import { Foreldrepengesøknad, slettMellomlagringOgLastSidePåNytt } from './Foreldrepengesøknad';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...utilsMessages.nb,
        ...arbeidsforholdOgInntektMessages.nb,
        ...egenNæringMessages.nb,
        ...frilansMessages.nb,
        ...formHookMessages.nb,
        ...kvitteringMessages.nb,
        ...filopplasterMessages.nb,
        ...observabilityMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...utilsMessages.nn,
        ...arbeidsforholdOgInntektMessages.nn,
        ...egenNæringMessages.nn,
        ...frilansMessages.nn,
        ...formHookMessages.nn,
        ...kvitteringMessages.nn,
        ...filopplasterMessages.nn,
        ...observabilityMessages.nn,
    },
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof MESSAGES_GROUPED_BY_LOCALE.nb;
        }
    }
}

dayjs.locale(getDecoratorLanguageCookie('decorator-language'));

export const AppContainer = () => {
    const initialLocale = getDecoratorLanguageCookie('decorator-language') as LocaleAll;
    const [locale, setLocale] = useState<LocaleNo>(initialLocale === 'en' ? 'nb' : initialLocale);

    void setAvailableLanguages([
        { locale: 'nb', handleInApp: true },
        { locale: 'nn', handleInApp: true },
    ]);

    onLanguageSelect((lang) => {
        setLocale(lang.locale as 'nb' | 'nn');
        document.documentElement.setAttribute('lang', lang.locale);
    });

    const { pathname } = useLocation();
    // Scroll til toppen når man endrer side.
    useEffect(() => {
        globalThis.scrollTo(0, 0);
    }, [pathname]);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <Theme theme="light">
                <ErrorBoundary
                    appName="foreldrepengesoknad"
                    retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}
                >
                    <ByttBrowserModal />
                    <Provider locale={locale === 'nb' ? nb : nn}>
                        <Foreldrepengesøknad />
                    </Provider>
                </ErrorBoundary>
            </Theme>
        </IntlProvider>
    );
};
