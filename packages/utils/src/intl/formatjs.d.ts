import type { UtilsMessageId } from './messageIds';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: UtilsMessageId;
        }
    }
}
