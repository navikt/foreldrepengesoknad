import { BodyShort } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Props {
    harArbeidsforhold: boolean;
}

const HarIkkeArbeidsforhold: FunctionComponent<Props> = ({ harArbeidsforhold }) => {
    const intl = useIntl();

    if (harArbeidsforhold) {
        return null;
    }

    return (
        <div className="arbeidsforholdInfoBox" style={{ marginBottom: '1rem' }}>
            <BodyShort>
                {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold')}
            </BodyShort>
        </div>
    );
};

export default HarIkkeArbeidsforhold;
