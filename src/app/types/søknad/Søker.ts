import { SøkerRolle } from './Søknad';
import { AnnenInntekt, AnnenInntektInnsending } from './AnnenInntekt';
import { FrilansInformasjon, FrilansInformasjonInnsending } from './FrilansInformasjon';
import { Næring, NæringInnsending } from './SelvstendigNæringsdrivendeInformasjon';
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

export interface SøkerInnsending
    extends Omit<Søker, 'selvstendigNæringsdrivendeInformasjon' | 'frilansInformasjon' | 'andreInntekterSiste10Mnd'> {
    selvstendigNæringsdrivendeInformasjon?: NæringInnsending[];
    frilansInformasjon?: FrilansInformasjonInnsending;
    andreInntekterSiste10Mnd?: AnnenInntektInnsending[];
}

export type SøkerPartial = Partial<Søker>;

export default Søker;
