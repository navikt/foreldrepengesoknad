import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';
import { erSenUtsettelsePgaFerieEllerArbeid, erPeriodeInnvilget } from '../../../util/uttaksplan/uttakUtils';
import { Periodetype, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';

export function inneholderSenUtsettelsePgaFerieTest(grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat {
    const seneUtsettelsePgaFerie = grunnlag.perioder
        .filter((p) => !erPeriodeInnvilget(p, grunnlag.eksisterendeSak))
        .filter(erSenUtsettelsePgaFerieEllerArbeid)
        .filter((p) => p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Ferie);

    const passerer = seneUtsettelsePgaFerie.length === 0;
    return {
        passerer,
        info: seneUtsettelsePgaFerie.map((periode) => ({
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie',
            periodeId: periode.id,
        })),
    };
}
