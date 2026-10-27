import type { ObservabilityMessageId } from '@navikt/fp-observability';
import type { UtilsMessageId } from '@navikt/fp-utils';

import type nb from './messages/nb_NO.json';

export type UiMessageId = keyof typeof nb | ObservabilityMessageId | UtilsMessageId;
