import { Tidsperiode } from '@navikt/fp-common';
import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';

import { Planperiode } from './Planperiode';

export interface Permisjonsperiode {
    forelder?: BrukerRolleSak_fpoversikt;
    perioder: Planperiode[];
    tidsperiode: Tidsperiode;
    samtidigUttak?: boolean;
    erUtsettelse?: boolean;
    erHull?: boolean;
    erPeriodeUtenUttak?: boolean;
}
