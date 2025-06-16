import { isValidTidsperiodeString } from '@navikt/fp-utils';

import { Søknadsinfo } from '../../types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from '../../types/regelTypes';
import { isHull, isPeriodeUtenUttak } from '../../utils/periodeUtils';

export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return {
        passerer:
            grunnlag.perioder
                .filter((p) => !isPeriodeUtenUttak(p) && !isHull(p))
                .filter((periode) => isValidTidsperiodeString({ fom: periode.fom, tom: periode.tom })).length > 0,
    };
};
