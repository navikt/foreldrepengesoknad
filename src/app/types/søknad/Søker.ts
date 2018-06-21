import { SøkerRolle } from './Søknad';
import { AnnenInntekt } from './AnnenInntekt';

export interface Søker {
    rolle: SøkerRolle;
    erSelvstendigNæringsdrivende: boolean;
    harJobbetSomFrilansSiste10Mnd: boolean;
    frilansInformasjon?: FrilansInformasjon;
    erAleneOmOmsorg: boolean;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd: AnnenInntekt[];
}

export interface FrilansInformasjon {
    jobberFremdelesSomFrilans: boolean;
    driverFosterhjem: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
}

export type SøkerPartial = Partial<Søker>;
export type FrilansInformasjonPartial = Partial<FrilansInformasjon>;

export default Søker;
