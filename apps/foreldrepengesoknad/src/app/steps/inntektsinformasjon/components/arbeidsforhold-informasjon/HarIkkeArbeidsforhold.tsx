import { Label } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
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
            <Label>{intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold')}</Label>
        </div>
    );
};

export default HarIkkeArbeidsforhold;
