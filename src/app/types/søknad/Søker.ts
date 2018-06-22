import { SøkerRolle } from './Søknad';
import { AnnenInntekt } from './AnnenInntekt';
import { FrilansInformasjon } from './FrilansInformasjon';

export interface Søker {
    rolle: SøkerRolle;
    erSelvstendigNæringsdrivende: boolean;
    harJobbetSomFrilansSiste10Mnd: boolean;
    frilansInformasjon?: FrilansInformasjon;
    erAleneOmOmsorg: boolean;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd: AnnenInntekt[];
}

export type SøkerPartial = Partial<Søker>;

export default Søker;
