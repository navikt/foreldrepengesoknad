import type { UiMessageId } from '@navikt/fp-ui';

import type nb from './messages/nb_NO.json';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof nb | UiMessageId;
        }
    }
}
