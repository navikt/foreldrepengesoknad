import { AnnenInntekt } from './AnnenInntekt';
import { Frilans } from './Frilans';
import { Næring } from './Næring';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface Søker {
    rolle: Søkerrolle.MOR;
    harJobbetSomFrilansSiste10Mnd: boolean;
    frilansInformasjon?: Frilans;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    selvstendigNæringsdrivendeInformasjon?: Næring;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: AnnenInntekt[];
}
