import type { UiMessageId } from './messageIds';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: UiMessageId;
        }
    }
}
