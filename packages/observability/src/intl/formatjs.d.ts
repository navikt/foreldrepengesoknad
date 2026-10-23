import type { ObservabilityMessageId } from './messageIds';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: ObservabilityMessageId;
        }
    }
}
