import { FormattedMessage } from 'react-intl';

import { Alert } from '@navikt/ds-react';

interface Props {
    harArbeidsforhold: boolean;
}

export const HarIkkeArbeidsforhold = ({ harArbeidsforhold }: Props) => {
    if (harArbeidsforhold) {
        return null;
    }

    return (
        <Alert variant="info" size="small">
            <FormattedMessage id="inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold" />
        </Alert>
    );
};
