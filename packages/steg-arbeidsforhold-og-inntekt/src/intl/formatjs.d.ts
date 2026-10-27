import type { ArbeidsforholdOgInntektMessageId } from './messageIds';

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: ArbeidsforholdOgInntektMessageId;
        }
    }
}
