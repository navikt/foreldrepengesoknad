import { createIntlMessagesTest } from '@navikt/fp-utils-test/intl';

import en from './messages/en_US.json';
import nb from './messages/nb_NO.json';
import nn from './messages/nn_NO.json';

createIntlMessagesTest({
    name: 'uttaksplan intl messages',
    locales: { nb_NO: nb, nn_NO: nn, en_US: en },
    // stønadskvotetype-nøklene er dynamiske i koden og er tungvinte å skrive om.
    ignoreReferenceKey: (key) => key.includes('uttaksplan.stønadskvotetype.'),
});
