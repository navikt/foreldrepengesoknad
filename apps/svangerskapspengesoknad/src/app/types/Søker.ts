import { Språkkode } from 'app/intl/types';
import { ArbeidIUtlandet, ArbeidIUtlandetDTO } from './ArbeidIUtlandet';
import { Frilans, FrilansDTO } from './Frilans';
import { EgenNæring, EgenNæringDTO } from './EgenNæring';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface Søker {
    rolle: Søkerrolle.MOR;
    harJobbetSomFrilans: boolean;
    frilansInformasjon?: Frilans;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
    selvstendigNæringsdrivendeInformasjon?: EgenNæring;
    harHattAnnenInntekt: boolean;
    andreInntekter?: ArbeidIUtlandet[];
    språkkode: Språkkode;
}

export interface SøkerDTO
    extends Omit<Søker, 'frilansInformasjon' | 'selvstendigNæringsdrivendeInformasjon' | 'andreInntekterSiste10Mnd'> {
    frilansInformasjon?: FrilansDTO;
    selvstendigNæringsdrivendeInformasjon?: EgenNæringDTO[];
    andreInntekterSiste10Mnd?: ArbeidIUtlandetDTO[];
}
