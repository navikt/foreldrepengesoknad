import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { isUttaksperiode } from 'app/types/uttaksplan/periodetyper';

export const harUttaksperiodeStønadskonto: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const uttaksperioderUtenStønadskonto = grunnlag.perioder.filter(
        (periode) => isUttaksperiode(periode) && periode.konto === undefined
    );
    return {
        passerer: uttaksperioderUtenStønadskonto.length === 0,
        info: uttaksperioderUtenStønadskonto.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
