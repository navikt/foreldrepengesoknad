import type { UiMessageId } from '@navikt/fp-ui';
import type { UtilsMessageId } from '@navikt/fp-utils';

import type nb from './messages/nb_NO.json';

export type FormHooksMessageId = keyof typeof nb | UiMessageId | UtilsMessageId;
