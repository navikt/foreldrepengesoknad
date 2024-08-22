import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Label } from '@navikt/ds-react';

interface Props {
    harArbeidsforhold: boolean;
}

const HarIkkeArbeidsforhold: FunctionComponent<Props> = ({ harArbeidsforhold }) => {
    if (harArbeidsforhold) {
        return null;
    }

    return (
        <div className="arbeidsforholdInfoBox" style={{ marginBottom: '1rem' }}>
            <Label>
                <FormattedMessage id="inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold" />
            </Label>
        </div>
    );
};

export default HarIkkeArbeidsforhold;
