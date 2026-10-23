import type { FormHooksMessageId } from '@navikt/fp-form-hooks';
import type { ObservabilityMessageId } from '@navikt/fp-observability';
import type { EgenNæringMessageId } from '@navikt/fp-steg-egen-naering';
import type { UiMessageId } from '@navikt/fp-ui';
import type { UtilsMessageId } from '@navikt/fp-utils';

import type nb from './messages/nb_NO.json';

export type ArbeidsforholdOgInntektMessageId =
    keyof typeof nb | EgenNæringMessageId | FormHooksMessageId | ObservabilityMessageId | UiMessageId | UtilsMessageId;
