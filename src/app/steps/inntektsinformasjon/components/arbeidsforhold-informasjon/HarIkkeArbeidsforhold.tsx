import { intlUtils } from '@navikt/fp-common';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Props {
    harArbeidsforhold: boolean;
}

const HarIkkeArbeidsforhold: FunctionComponent<Props> = ({ harArbeidsforhold }) => {
    if (harArbeidsforhold) {
        return null;
    }

    const intl = useIntl();

    return (
        <div className="arbeidsforholdInfoBox" style={{ marginBottom: '1rem' }}>
            <Element>{intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.ingenRegistrerteArbeidsforhold')}</Element>
        </div>
    );
};

export default HarIkkeArbeidsforhold;
