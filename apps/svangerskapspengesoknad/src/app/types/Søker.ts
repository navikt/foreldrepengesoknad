import { ArbeidIUtlandet } from './ArbeidIUtlandet';
import { Frilans } from './Frilans';
import { Næring } from './Næring';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface Søker {
    rolle: Søkerrolle.MOR;
    harJobbetSomFrilans: boolean;
    frilansInformasjon?: Frilans;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
    selvstendigNæringsdrivendeInformasjon?: Næring;
    harHattAnnenInntekt: boolean;
    andreInntekter?: ArbeidIUtlandet[];
}
