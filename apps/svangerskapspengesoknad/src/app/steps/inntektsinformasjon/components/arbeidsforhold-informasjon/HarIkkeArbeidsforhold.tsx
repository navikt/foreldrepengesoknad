import { BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

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
