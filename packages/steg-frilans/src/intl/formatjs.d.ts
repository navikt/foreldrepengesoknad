import type { FormHooksMessageId } from '@navikt/fp-form-hooks';
import type { UiMessageId } from '@navikt/fp-ui';

import type nb from './messages/nb_NO.json';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof nb | FormHooksMessageId | UiMessageId;
        }
    }
}
