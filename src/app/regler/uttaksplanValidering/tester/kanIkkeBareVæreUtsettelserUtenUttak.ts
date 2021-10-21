import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { Periodetype, UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';

export const kanIkkeBareVæreUtsettelserUtenUttak: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const passerer = !grunnlag.perioder.every(
        (p) => (p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Fri) || p.type === Periodetype.Hull
    );

    return {
        passerer,
    };
};
