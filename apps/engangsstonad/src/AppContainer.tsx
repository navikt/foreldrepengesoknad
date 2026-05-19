import { AppShell, createDefaultQueryClient } from '@navikt/fp-app-shell';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { observabilityMessages } from '@navikt/fp-observability';
import { kvitteringMessages } from '@navikt/fp-steg-kvittering';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';

import { Engangsstønad, slettMellomlagringOgLastSidePåNytt } from './Engangsstønad';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...utilsMessages.nb,
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
        ...utilsMessages.nn,
        ...formHookMessages.nn,
        ...kvitteringMessages.nn,
        ...filopplasterMessages.nn,
        ...observabilityMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utenlandsoppholdMessages.en,
        ...oppsummeringMessages.en,
        ...utilsMessages.en,
        ...formHookMessages.en,
        ...kvitteringMessages.en,
        ...filopplasterMessages.en,
        ...observabilityMessages.en,
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

const queryClient = createDefaultQueryClient({
    sentryQueryErrorMessage: 'API query-feil i engangsstønad',
});

export const AppContainer = () => (
    <AppShell
        appName="engangsstonad"
        availableLocales={['nb', 'nn', 'en']}
        messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}
        queryClient={queryClient}
        scrollToTopOnNavigation
        retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}
    >
        <Engangsstønad />
    </AppShell>
);
