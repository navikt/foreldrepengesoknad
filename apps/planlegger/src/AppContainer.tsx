import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, SimpleErrorPage, uiMessages } from '@navikt/fp-ui';
import { useBeforeUnload, utilsMessages } from '@navikt/fp-utils';

import PlanleggerDataInit from './Planlegger';
import Environment from './appData/Environment';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const allNbMessages = { ...nbMessages, ...uiMessages.nb, ...utilsMessages.nb };

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
            app: 'planlegger',
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
            <ErrorBoundary appName="Foreldrepengeplanlegger" customErrorPage={<SimpleErrorPage />}>
                <BrowserRouter basename={Environment.PUBLIC_PATH}>
                    <PlanleggerDataInit locale={locale} changeLocale={changeLocale} />
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
