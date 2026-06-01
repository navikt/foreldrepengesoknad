import { createIntlMessagesTest } from '@navikt/fp-utils-test/src/intl/intlMessagesTest';

import en from './messages/en_US.json';
import nb from './messages/nb_NO.json';
import nn from './messages/nn_NO.json';

createIntlMessagesTest({
    name: 'steg-kvittering intl messages',
    locales: { nb_NO: nb, nn_NO: nn, en_US: en },
});
