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
    extends Omit<
        Søker,
        | 'frilansInformasjon'
        | 'selvstendigNæringsdrivendeInformasjon'
        | 'andreInntekter'
        | 'harJobbetSomFrilans'
        | 'harJobbetSomSelvstendigNæringsdrivende'
        | 'harHattAnnenInntekt'
    > {
    frilansInformasjon?: FrilansDTO;
    selvstendigNæringsdrivendeInformasjon?: EgenNæringDTO[];
    andreInntekterSiste10Mnd?: ArbeidIUtlandetDTO[];
    harJobbetSomFrilansSiste10Mnd: boolean;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    harHattAnnenInntektSiste10Mnd: boolean;
}
