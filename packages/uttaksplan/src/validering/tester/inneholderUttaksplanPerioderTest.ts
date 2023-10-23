import { Søknadsinfo, isHull, isInfoPeriode, isPeriodeUtenUttak, isValidTidsperiode } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return {
        passerer:
            grunnlag.perioder
                .filter((p) => !isInfoPeriode(p) && !isPeriodeUtenUttak(p) && !isHull(p))
                .filter((periode) => isValidTidsperiode(periode.tidsperiode)).length > 0,
    };
};
