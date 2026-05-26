import { AppShell, createDefaultQueryClient } from '@navikt/fp-app-shell';
import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { observabilityMessages } from '@navikt/fp-observability';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { kvitteringMessages } from '@navikt/fp-steg-kvittering';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';

import { Svangerskapspengesøknad, slettMellomlagringOgLastSidePåNytt } from './Svangerskapspengesøknad';
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
    ...formHookMessages.nb,
    ...kvitteringMessages.nb,
    ...filopplasterMessages.nb,
    ...observabilityMessages.nb,
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
    ...formHookMessages.nn,
    ...kvitteringMessages.nn,
    ...filopplasterMessages.nn,
    ...observabilityMessages.nn,
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
    nn: allNnMessages,
};

const queryClient = createDefaultQueryClient({
    sentryQueryErrorMessage: 'API query-feil i svangerskapspengesøknad',
});

export const AppContainer = () => (
    <AppShell
        appName="svangerskapspengesoknad"
        availableLocales={['nb', 'nn']}
        messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}
        queryClient={queryClient}
        withByttBrowserModal
        scrollToTopOnNavigation
        retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}
    >
        <Svangerskapspengesøknad />
    </AppShell>
);
