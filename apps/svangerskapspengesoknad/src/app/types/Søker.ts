import { FrilansInformasjonPartial, FrilansInformasjonPartialDTO } from './FrilansInformasjon';
import { Næring, NæringDTO } from './SelvstendigNæringsdrivende';
import { AnnenInntekt } from './AnnenInntekt';
import { Språkkode } from 'common/types';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface Søker {
    rolle: Søkerrolle.MOR;
    harJobbetSomFrilansSiste10Mnd: boolean;
    frilansInformasjon?: FrilansInformasjonPartial;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    selvstendigNæringsdrivendeInformasjon?: Næring[];
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: AnnenInntekt[];
    språkkode: Språkkode;
}

export interface SøkerDTO {
    rolle: Søkerrolle.MOR;
    harJobbetSomFrilansSiste10Mnd: boolean;
    frilansInformasjon?: FrilansInformasjonPartialDTO;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    selvstendigNæringsdrivendeInformasjon?: NæringDTO[];
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: AnnenInntekt[];
    språkkode: Språkkode;
}

export default Søker;
