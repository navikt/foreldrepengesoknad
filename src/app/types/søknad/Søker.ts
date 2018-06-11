import { SøkerRolle } from './Søknad';
import { AnnenInntekt } from './AnnenInntekt';

export interface Søker {
    rolle: SøkerRolle;
    erSelvstendigNæringsdrivende: boolean;
    erFrilanser: boolean;
    erAleneOmOmsorg: boolean;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd: AnnenInntekt[];
}

export type SøkerPartial = Partial<Søker>;

export default Søker;
