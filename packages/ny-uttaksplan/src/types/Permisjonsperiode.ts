import { Tidsperiode } from '@navikt/fp-common';
import { Forelder } from '@navikt/fp-constants';

import { Planperiode } from './Planperiode';

interface Permisjonsperiode {
    forelder?: Forelder;
    perioder: Planperiode[];
    tidsperiode: Tidsperiode;
    samtidigUttak?: boolean;
    erUtsettelse?: boolean;
    erHull?: boolean;
    erPeriodeUtenUttak?: boolean;
}

export default Permisjonsperiode;
