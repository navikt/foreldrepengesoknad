import type { FormHooksMessageId } from './messageIds';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: FormHooksMessageId;
        }
    }
}
