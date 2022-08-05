import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { isHull, isInfoPeriode, isPeriodeUtenUttak } from 'uttaksplan/types/Periode';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return {
        passerer:
            grunnlag.perioder
                .filter((p) => !isInfoPeriode(p) && !isPeriodeUtenUttak(p) && !isHull(p))
                .filter((periode) => isValidTidsperiode(periode.tidsperiode)).length > 0,
    };
};
