import { createIntlMessagesTest } from '@navikt/fp-utils-test/src/intl/intlMessagesTest';

import nb from './messages/nb_NO.json';

// Enkelte nøkler settes dynamisk i koden via intlUtils-hjelperen og fanges ikke av
// den vanlige defineMessages/FormattedMessage-ekstraksjonen. Plukk dem opp via regex.
const ekstraIntlNøklerRegex = /(?<=(intlUtils\(intl,\s'))[^']*/gm;

createIntlMessagesTest({
    name: 'foreldrepengeoversikt intl messages',
    locales: { nb_NO: nb },
    extractAdditionalCodeKeys: (fileContent) => fileContent.match(ekstraIntlNøklerRegex) ?? [],
    // ettersendelse.*-nøkler er dynamiske i koden og er tungvinte å skrive om
    ignoreReferenceKey: (key) => key.includes('ettersendelse.'),
});
