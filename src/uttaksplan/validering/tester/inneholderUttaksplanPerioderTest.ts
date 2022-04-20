import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { isInfoPeriode } from 'uttaksplan/types/Periode';
export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return {
        passerer:
            grunnlag.perioder
                .filter((p) => !isInfoPeriode(p))
                .filter((periode) => isValidTidsperiode(periode.tidsperiode)).length > 0,
    };
};
