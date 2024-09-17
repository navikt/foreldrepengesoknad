import {
    Søknadsinfo,
    isHull,
    isInfoPeriode,
    isPeriodeUtenUttak,
    isSkalIkkeHaForeldrepengerFørFødselPeriode,
} from '@navikt/fp-common';
import { isValidTidsperiode } from '@navikt/fp-utils';

import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return {
        passerer:
            grunnlag.perioder
                .filter(
                    (p) =>
                        !isInfoPeriode(p) &&
                        !isPeriodeUtenUttak(p) &&
                        !isHull(p) &&
                        !isSkalIkkeHaForeldrepengerFørFødselPeriode(p),
                )
                .filter((periode) => isValidTidsperiode(periode.tidsperiode)).length > 0,
    };
};
