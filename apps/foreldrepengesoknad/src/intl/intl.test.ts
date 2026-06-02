import { createIntlMessagesTest } from '@navikt/fp-utils-test/intl';

import nb from './nb_NO.json';
import nn from './nn_NO.json';

createIntlMessagesTest({
    name: 'foreldrepengesoknad intl messages',
    locales: { nb_NO: nb, nn_NO: nn },
});
