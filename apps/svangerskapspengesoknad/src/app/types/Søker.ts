import { LocaleNo } from '@navikt/fp-types';

import { ArbeidIUtlandetDTO } from './ArbeidIUtlandet';
import { EgenNæringDTO } from './EgenNæring';
import { Frilans } from './Frilans';

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
