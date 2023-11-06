import { LocaleNo } from '@navikt/fp-types';
import { AnnenInntekt } from './AnnenInntekt';
import { Frilans } from './Frilans';
import { Næring } from './Næring';

interface Søker {
    erAleneOmOmsorg: boolean;
    harJobbetSomFrilansSiste10Mnd: boolean;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    selvstendigNæringsdrivendeInformasjon?: Næring[];
    frilansInformasjon?: Frilans;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: AnnenInntekt[];
    språkkode: LocaleNo;
}

export default Søker;
