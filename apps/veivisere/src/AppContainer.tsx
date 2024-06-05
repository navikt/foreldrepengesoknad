// import ErrorPage from 'components/error/ErrorPage';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { useBeforeUnload } from '@navikt/fp-utils';

import Veileder from './Veileder';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const allNbMessages = { ...nbMessages, ...uiMessages.nb };

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: { ...nnMessages, ...uiMessages.nn },
    en: { ...enMessages, ...uiMessages.en },
};

const initLocale = (): LocaleAll => {
    const defaultLocale = 'nb';
    dayjs.locale(defaultLocale);
    return defaultLocale;
};

const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleAll>(initLocale());

    useBeforeUnload(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'veivisere',
            team: 'foreldrepenger',
            pageKey: 'page-unload',
        });
    });

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocale(activeLocale);
        dayjs.locale(activeLocale);
        document.documentElement.setAttribute('lang', activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="Foreldrepengeveivisere" customErrorPage={<div>error</div>}>
                <Veileder locale={locale} changeLocale={changeLocale} />
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
