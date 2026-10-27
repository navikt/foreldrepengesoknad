import type { FormHooksMessageId } from '@navikt/fp-form-hooks';
import type { ObservabilityMessageId } from '@navikt/fp-observability';
import type { UiMessageId } from '@navikt/fp-ui';
import type { UtilsMessageId } from '@navikt/fp-utils';

import type nb from './messages/nb_NO.json';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof nb | FormHooksMessageId | ObservabilityMessageId | UiMessageId | UtilsMessageId;
        }
    }
}
