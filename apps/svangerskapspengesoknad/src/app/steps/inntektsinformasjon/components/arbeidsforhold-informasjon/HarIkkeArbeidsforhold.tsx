import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

interface Props {
    harArbeidsforhold: boolean;
}

const HarIkkeArbeidsforhold: FunctionComponent<Props> = ({ harArbeidsforhold }) => {
    if (harArbeidsforhold) {
        return null;
    }

    return (
        <div className="arbeidsforholdInfoBox" style={{ marginBottom: '1rem' }}>
            <BodyShort>
                <FormattedMessage id="inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold" />
            </BodyShort>
        </div>
    );
};

export default HarIkkeArbeidsforhold;
