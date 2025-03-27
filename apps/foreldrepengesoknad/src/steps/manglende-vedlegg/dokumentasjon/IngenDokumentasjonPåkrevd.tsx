import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, Heading } from '@navikt/ds-react';

export const IngenDokumentasjonPåkrevd = () => {
    return (
        <>
            <BodyLong>
                <FormattedMessage id="dokumentasjon.ikke.påkrevd.tittel" />
            </BodyLong>
            <Alert variant="info">
                <Heading level="2" size="small">
                    <FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.tittel" />
                </Heading>
                <BodyLong spacing>
                    <FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.beskrivelse.del1" />
                </BodyLong>
                <BodyLong>
                    <FormattedMessage id="dokumentasjon.ikke.påkrevd.alert.beskrivelse.del2" />
                </BodyLong>
            </Alert>
        </>
    );
};
