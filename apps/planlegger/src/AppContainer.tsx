import { AppShell, createDefaultQueryClient } from '@navikt/fp-app-shell';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { observabilityMessages } from '@navikt/fp-observability';
import { SimpleErrorPage, uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan';

import { PlanleggerDataInit } from './Planlegger';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const allNbMessages = {
    ...nbMessages,
    ...uiMessages.nb,
    ...utilsMessages.nb,
    ...nyUttaksplanMessages.nb,
    ...formHookMessages.nb,
    ...observabilityMessages.nb,
};

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
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utilsMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...formHookMessages.nn,
        ...observabilityMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utilsMessages.en,
        ...nyUttaksplanMessages.en,
        ...formHookMessages.en,
        ...observabilityMessages.en,
    },
};

const queryClient = createDefaultQueryClient();

export const AppContainer = () => (
    <AppShell
        appName="planlegger"
        availableLocales={['nb', 'nn', 'en']}
        messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}
        queryClient={queryClient}
        customErrorPage={<SimpleErrorPage retryCallback={() => location.reload()} />}
    >
        <PlanleggerDataInit />
    </AppShell>
);
