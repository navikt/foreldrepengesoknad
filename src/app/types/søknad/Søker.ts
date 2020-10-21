import { SøkerRolle } from './Søknad';
import { AnnenInntekt } from './AnnenInntekt';
import { FrilansInformasjon } from './FrilansInformasjon';
import { Næring } from './SelvstendigNæringsdrivendeInformasjon';
import { Språkkode } from 'common/types';

export interface Søker {
    rolle: SøkerRolle;
    harJobbetSomFrilansSiste10Mnd: boolean;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    selvstendigNæringsdrivendeInformasjon?: Næring[];
    frilansInformasjon?: FrilansInformasjon;
    erAleneOmOmsorg: boolean;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: AnnenInntekt[];
    språkkode: Språkkode;
}

export type SøkerPartial = Partial<Søker>;

export default Søker;
