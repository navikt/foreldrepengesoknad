import { createIntlMessagesTest } from '@navikt/fp-utils-test/src/intl/intlMessagesTest';

import nb from '../nb_NO.json';
import nn from '../nn_NO.json';

createIntlMessagesTest({
    name: 'svangerskapspengesoknad intl messages',
    locales: { nb_NO: nb, nn_NO: nn },
});
