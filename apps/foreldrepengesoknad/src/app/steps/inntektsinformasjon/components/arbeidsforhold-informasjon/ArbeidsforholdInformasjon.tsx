import React from 'react';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import HarIkkeArbeidsforhold from './HarIkkeArbeidsforhold';
import HarArbeidsforhold from './HarArbeidsforhold';
import { BodyShort, Label, ReadMore } from '@navikt/ds-react';

import './arbeidsforholdInformasjon.less';
import { Block } from '@navikt/fp-common';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
}
const ArbeidsforholdInformasjon: React.FunctionComponent<Props> = ({ arbeidsforhold }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <Block padBottom="l">
            <Label>Dine arbeidsforhold</Label>
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            <ReadMore header="Finner du feil eller mangler?">
                <BodyShort>
                    Informasjonen er hentet fra Arbeidsgiver- og arbeidstakerregisteret. Derfor må du be din
                    arbeidsgiver oppdatere med riktig informasjon i Arbeidsgiver- og arbeidstakerregisteret.
                </BodyShort>
            </ReadMore>
        </Block>
    );
};

export default ArbeidsforholdInformasjon;
