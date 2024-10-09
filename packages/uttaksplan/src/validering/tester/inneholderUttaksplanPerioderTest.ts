import {
    Søknadsinfo,
    isHull,
    isInfoPeriode,
    isPeriodeUtenUttak,
    isSkalIkkeHaForeldrepengerFørFødselPeriode,
} from '@navikt/fp-common';
import { isValidTidsperiodeString } from '@navikt/fp-utils';

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
                .filter((periode) => isValidTidsperiodeString(periode.tidsperiode)).length > 0,
    };
};
