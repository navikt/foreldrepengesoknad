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

// Eksportert kun for bruk i stories/tester
export const queryClient = createDefaultQueryClient({
    sentryQueryErrorMessage: 'API query-feil i foreldrepengesøknad',
});

export const AppContainer = () => (
    <AppShell
        appName="foreldrepengesoknad"
        availableLocales={['nb', 'nn']}
        messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}
        queryClient={queryClient}
        withByttBrowserModal
        scrollToTopOnNavigation
        retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}
    >
        <Foreldrepengesøknad />
    </AppShell>
);
