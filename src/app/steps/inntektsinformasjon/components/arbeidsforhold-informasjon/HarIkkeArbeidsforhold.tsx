import { intlUtils } from '@navikt/fp-common';
import { Element } from 'nav-frontend-typografi';
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
            <Element>{intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold')}</Element>
        </div>
    );
};

export default HarIkkeArbeidsforhold;
