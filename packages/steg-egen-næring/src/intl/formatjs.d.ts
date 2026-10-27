import type { EgenNæringMessageId } from './messageIds';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: EgenNæringMessageId;
        }
    }
}
