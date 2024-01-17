import HarIkkeArbeidsforhold from './HarIkkeArbeidsforhold';
import HarArbeidsforhold from './HarArbeidsforhold';
import { BodyShort, ReadMore } from '@navikt/ds-react';
import { Arbeidsforhold, Block } from '@navikt/fp-common';

import './arbeidsforholdInformasjon.less';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
}
const ArbeidsforholdInformasjon: React.FunctionComponent<Props> = ({ arbeidsforhold }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <Block padBottom="xl">
            <BodyShort style={{ fontWeight: 'bold' }}>Dine arbeidsforhold</BodyShort>
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
