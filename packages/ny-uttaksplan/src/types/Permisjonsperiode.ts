import { Forelder, Periode, Tidsperiode } from '@navikt/fp-common';

interface Permisjonsperiode {
    forelder?: Forelder;
    perioder: Periode[];
    tidsperiode: Tidsperiode;
    samtidigUttak?: boolean;
    erUtsettelse?: boolean;
    erHull?: boolean;
    erPeriodeUtenUttak?: boolean;
}

export default Permisjonsperiode;
