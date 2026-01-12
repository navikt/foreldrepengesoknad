import { Tidsperiode } from '@navikt/fp-common';
import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';

import { Planperiode } from './Planperiode';

//TODO (TOR) Fjern type når listevisninga er refaktorert
export interface Permisjonsperiode {
    forelder?: BrukerRolleSak_fpoversikt;
    perioder: Planperiode[];
    tidsperiode: Tidsperiode;
    samtidigUttak?: boolean;
    erUtsettelse?: boolean;
    erHull?: boolean;
    erPeriodeUtenUttak?: boolean;
}
