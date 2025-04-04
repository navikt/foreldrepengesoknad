import { FormattedMessage } from 'react-intl';

import { BodyLong, Label, VStack } from '@navikt/ds-react';

export const IngenDokumentasjonPåkrevd = () => {
    return (
        <VStack gap="2">
            <Label>
                <FormattedMessage id="dokumentasjon.ikke.påkrevd.label" />
            </Label>
            <BodyLong className="text-text-subtle">
                <FormattedMessage id="dokumentasjon.ikke.påkrevd.beskrivelse.1" />
            </BodyLong>
            <BodyLong className="text-text-subtle">
                <FormattedMessage id="dokumentasjon.ikke.påkrevd.beskrivelse.2" />
            </BodyLong>
        </VStack>
    );
};
