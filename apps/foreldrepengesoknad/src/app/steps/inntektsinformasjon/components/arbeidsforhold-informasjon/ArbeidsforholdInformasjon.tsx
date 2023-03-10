import React from 'react';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import HarIkkeArbeidsforhold from './HarIkkeArbeidsforhold';
import HarArbeidsforhold from './HarArbeidsforhold';

import './arbeidsforholdInformasjon.less';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { UtvidetInformasjon } from '@navikt/fp-common';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
}
const ArbeidsforholdInformasjon: React.FunctionComponent<Props> = ({ arbeidsforhold }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <>
            <Element>Dine arbeidsforhold</Element>
            <UtvidetInformasjon apneLabel="Les mer om dine arbeidsforhold">
                <Normaltekst>
                    Er det feil eller mangler i informasjonen om dine arbeidsforhold? Da må du be din arbeidsgiver
                    oppdatere med riktig informasjon i Arbeidsgiver- og arbeidstakerregisteret.
                </Normaltekst>
            </UtvidetInformasjon>
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
        </>
    );
};

export default ArbeidsforholdInformasjon;
