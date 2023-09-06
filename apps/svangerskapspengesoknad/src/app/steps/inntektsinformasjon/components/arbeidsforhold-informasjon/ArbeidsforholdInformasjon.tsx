import Arbeidsforhold from 'app/types/Arbeidsforhold';
import HarIkkeArbeidsforhold from './HarIkkeArbeidsforhold';
import HarArbeidsforhold from './HarArbeidsforhold';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import './arbeidsforholdInformasjon.css';
import { Block } from '@navikt/fp-common';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    visManglerInfo?: boolean;
}
const ArbeidsforholdInformasjon: React.FunctionComponent<Props> = ({ arbeidsforhold, visManglerInfo = true }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <Block padBottom="xl">
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            {visManglerInfo && (
                <ReadMore header="Finner du feil eller mangler?">
                    <BodyShort>
                        Informasjonen er hentet fra Arbeidsgiver- og arbeidstakerregisteret. Derfor må du be din
                        arbeidsgiver oppdatere med riktig informasjon i Arbeidsgiver- og arbeidstakerregisteret.
                    </BodyShort>
                </ReadMore>
            )}
        </Block>
    );
};

export default ArbeidsforholdInformasjon;
