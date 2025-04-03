import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, BodyShort, Heading, Label, VStack } from '@navikt/ds-react';

export const IngenDokumentasjonPåkrevd = () => {
    return (
        <VStack gap="2">
            <Label>Dokumentasjon på at mor er i arbeid</Label>
            <BodyLong>
                Du trenger ikke sende inn dokumentasjon. Vi innhenter opplysninger om mors arbeid fra arbeidsgiver og
                arbeidstakerregisteret. Mor vil bli informert når søknaden blir sendt.
                <br />
                <br />
                Vi tar kontakt med deg dersom vi trenger mer informasjon.
                {/*<FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.tittel" />*/}
                {/*<FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.beskrivelse.del1" />*/}
                {/*<FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.beskrivelse.del2" />*/}
            </BodyLong>
        </VStack>
    );
};
