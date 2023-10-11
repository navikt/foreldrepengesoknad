import { Frilans } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { EgenNæring } from 'app/types/EgenNæring';
import HarArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarArbeidsforhold';
import EgenNæringVisning from 'app/components/egen-næring-visning/EgenNæringVisning';
import FrilansVisning from 'app/components/frilans-visning/FrilansVisning';

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
    switch (currentTilrettelegging.arbeidsforhold.type) {
        case Arbeidsforholdstype.VIRKSOMHET:
        case Arbeidsforholdstype.PRIVAT:
            const currentArbeidsForhold = arbeidsforhold.find(
                (a) => a.arbeidsgiverNavn === currentTilrettelegging?.arbeidsforhold.navn,
            );
            return <HarArbeidsforhold harArbeidsforhold={true} arbeidsforhold={[currentArbeidsForhold!]} />;

        case Arbeidsforholdstype.FRILANSER:
            if (frilans) {
                return <FrilansVisning frilans={frilans} />;
            }
            return null;

        case Arbeidsforholdstype.SELVSTENDIG:
            if (egenNæring) {
                return <EgenNæringVisning næring={egenNæring} />;
            }
            return null;
        default:
            return null;
    }
};

export default ArbeidsgiverVisning;
