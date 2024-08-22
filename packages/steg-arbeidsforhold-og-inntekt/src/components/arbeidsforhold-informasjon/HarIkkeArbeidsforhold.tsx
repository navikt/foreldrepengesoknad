import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert } from '@navikt/ds-react';

interface Props {
    harArbeidsforhold: boolean;
}

const HarIkkeArbeidsforhold: FunctionComponent<Props> = ({ harArbeidsforhold }) => {
    if (harArbeidsforhold) {
        return null;
    }

    return (
        <Alert variant="info" size="small">
            <FormattedMessage id="inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold" />
        </Alert>
    );
};

export default HarIkkeArbeidsforhold;
