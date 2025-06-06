import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, Heading } from '@navikt/ds-react';

export const BrukerKanIkkeSøke = () => {
    return (
        <Alert variant="warning">
            <Heading spacing size="small" level="3">
                <FormattedMessage id="inntektsinformasjon.alert.ingenArbeidsforhold.tittel" />
            </Heading>
            <BodyLong>
                <FormattedMessage id="inntektsinformasjon.alert.ingenArbeidsforhold" />
            </BodyLong>
        </Alert>
    );
};
