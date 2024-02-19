import { ArbeidIUtlandetDTO } from './ArbeidIUtlandet';
import { Frilans } from './Frilans';
import { EgenNæringDTO } from './EgenNæring';
import { LocaleNo } from '@navikt/fp-types';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface SøkerDTO {
    rolle: Søkerrolle.MOR;
    språkkode: LocaleNo;
    frilansInformasjon?: Frilans;
    selvstendigNæringsdrivendeInformasjon?: EgenNæringDTO[];
    andreInntekterSiste10Mnd?: ArbeidIUtlandetDTO[];
}
