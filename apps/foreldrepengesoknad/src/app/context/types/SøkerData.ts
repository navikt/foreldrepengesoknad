import { LocaleNo } from '@navikt/fp-types';

import { AnnenInntekt } from './AnnenInntekt';
import { Frilans } from './Frilans';
import { Næring } from './Næring';

// TODO (TOR) Denne bør fjernast. Data bør ligga i typane som er knytta til dei ulike formene
interface SøkerData {
    harJobbetSomFrilansSiste10Mnd: boolean;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    selvstendigNæringsdrivendeInformasjon?: Næring[];
    frilansInformasjon?: Frilans;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: AnnenInntekt[];
    språkkode?: LocaleNo;
}

export default SøkerData;
