import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, BodyShort, Heading, Label, VStack } from '@navikt/ds-react';

export const IngenDokumentasjonPåkrevd = () => {
    return (
        <VStack gap="2">
            <Label>
                <FormattedMessage id="dokumentasjon.ikke.påkrevd.tittel" />
            </Label>
            <BodyLong>
                <FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.tittel" />
                <FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.beskrivelse.del1" />
                <FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.beskrivelse.del2" />
            </BodyLong>
        </VStack>
    );
};
