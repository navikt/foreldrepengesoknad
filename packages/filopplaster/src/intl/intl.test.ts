import { createIntlMessagesTest } from '@navikt/fp-utils-test/src/intl/intlMessagesTest';

import en from './messages/en_US.json';
import nb from './messages/nb_NO.json';
import nn from './messages/nn_NO.json';

// Noen nøkler settes via i18n-hjelperen i koden og fanges ikke av FormatJS-ekstraksjonen.
const i18nNøkkelRegex = /(?<=(i18n)\(')[^']*/gm;

createIntlMessagesTest({
    name: 'filopplaster intl messages',
    locales: { nb_NO: nb, nn_NO: nn, en_US: en },
    extractAdditionalCodeKeys: (fileContent) => fileContent.match(i18nNøkkelRegex) ?? [],
    // AdopsjonFodselFieldArray-nøklene er dynamiske (ni-delt) og tungvinte å skrive om i koden.
    ignoreReferenceKey: (key) => key.includes('AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.'),
});
