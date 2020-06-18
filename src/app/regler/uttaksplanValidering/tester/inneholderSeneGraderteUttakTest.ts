import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';

import { erSentGradertUttak, erPeriodeInnvilget } from '../../../util/uttaksplan/uttakUtils';

export function inneholderSeneGraderteUttakTest(grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat {
    const seneGraderteUttak = grunnlag.perioder
        .filter((p) => !erPeriodeInnvilget(p, grunnlag.eksisterendeSak))
        .filter(erSentGradertUttak);
    const passerer = seneGraderteUttak.length === 0;
    return {
        passerer,
        info: seneGraderteUttak.map((periode) => ({
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUttak',
            periodeId: periode.id,
        })),
    };
}
