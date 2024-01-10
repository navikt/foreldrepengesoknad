import { ArbeidIUtlandet, ArbeidIUtlandetDTO } from './ArbeidIUtlandet';
import { Frilans, FrilansDTO } from './Frilans';
import { EgenNæring, EgenNæringDTO } from './EgenNæring';
import { LocaleNo } from '@navikt/fp-types';

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
    språkkode: LocaleNo;
    frilansInformasjon?: FrilansDTO;
    selvstendigNæringsdrivendeInformasjon?: EgenNæringDTO[];
    andreInntekterSiste10Mnd?: ArbeidIUtlandetDTO[];
}
