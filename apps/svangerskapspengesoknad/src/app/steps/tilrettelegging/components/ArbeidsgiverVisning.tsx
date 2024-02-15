import { Frilans } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { EgenNæring } from 'app/types/EgenNæring';
import HarArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarArbeidsforhold';
import EgenNæringVisning from 'app/components/egen-næring-visning/EgenNæringVisning';
import FrilansVisning from 'app/components/frilans-visning/FrilansVisning';
import { Arbeidsforhold } from '@navikt/fp-types';

interface Props {
    currentTilrettelegging: Tilrettelegging;
    arbeidsforhold: Arbeidsforhold[];
    frilans: Frilans | undefined;
    egenNæring: EgenNæring | undefined;
}

const ArbeidsgiverVisning: FunctionComponent<Props> = ({
    currentTilrettelegging,
    arbeidsforhold,
    frilans,
    egenNæring,
}) => {
    const currentArbeidsForhold = arbeidsforhold.find(
        (a) => a.arbeidsgiverNavn === currentTilrettelegging.arbeidsforhold.navn,
    );
    switch (currentTilrettelegging.arbeidsforhold.type) {
        case Arbeidsforholdstype.VIRKSOMHET:
        case Arbeidsforholdstype.PRIVAT:
            return <HarArbeidsforhold harArbeidsforhold={true} arbeidsforhold={[currentArbeidsForhold!]} />;
        case Arbeidsforholdstype.FRILANSER:
            return frilans ? <FrilansVisning frilans={frilans} /> : null;
        case Arbeidsforholdstype.SELVSTENDIG:
            return egenNæring ? <EgenNæringVisning næring={egenNæring} /> : null;
        default:
            return null;
    }
};

export default ArbeidsgiverVisning;
