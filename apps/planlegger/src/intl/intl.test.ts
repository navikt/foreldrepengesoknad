import { createIntlMessagesTest } from '@navikt/fp-utils-test';

import en from './messages/en_US.json';
import nb from './messages/nb_NO.json';
import nn from './messages/nn_NO.json';

createIntlMessagesTest({
    name: 'planlegger intl messages',
    locales: { nb_NO: nb, nn_NO: nn, en_US: en },
});
