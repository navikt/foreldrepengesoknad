import { ArbeidIUtlandetDTO } from './ArbeidIUtlandet';
import { FrilansDTO } from './Frilans';
import { EgenNæringDTO } from './EgenNæring';
import { LocaleNo } from '@navikt/fp-types';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface SøkerDTO {
    rolle: Søkerrolle.MOR;
    språkkode: LocaleNo;
    frilansInformasjon?: FrilansDTO;
    selvstendigNæringsdrivendeInformasjon?: EgenNæringDTO[];
    andreInntekterSiste10Mnd?: ArbeidIUtlandetDTO[];
}
