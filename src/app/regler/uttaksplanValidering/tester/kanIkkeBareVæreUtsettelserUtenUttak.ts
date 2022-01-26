import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { Periodetype, UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import { skalPeriodeSendesInn } from 'app/util/cleanup/cleanupSøknad';

export const kanIkkeBareVæreUtsettelserUtenUttak: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const { perioder } = grunnlag;
    const filtrertePerioder = perioder.filter(skalPeriodeSendesInn);
    const inneholderKunUtsettelser = filtrertePerioder.every(
        (p) => p.type == Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Fri
    );

    if (perioder.length !== 0 && inneholderKunUtsettelser) {
        return {
            passerer: false,
        };
    }

    return {
        passerer: true,
    };
};
