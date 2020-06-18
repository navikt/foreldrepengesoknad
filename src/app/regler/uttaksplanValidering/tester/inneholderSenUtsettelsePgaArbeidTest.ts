import { UttaksplanRegelgrunnlag } from '../types';
import { erSenUtsettelsePgaFerieEllerArbeid, erPeriodeInnvilget } from '../../../util/uttaksplan/uttakUtils';
import { Periodetype, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { RegelTestresultat } from 'shared/regler/regelTypes';

export function inneholderSenUtsettelsePgaArbeidTest(grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat {
    const seneUtsettelserPgaArbeid = grunnlag.perioder
        .filter((p) => !erPeriodeInnvilget(p, grunnlag.eksisterendeSak))
        .filter(erSenUtsettelsePgaFerieEllerArbeid)
        .filter((p) => p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Arbeid);

    const passerer = seneUtsettelserPgaArbeid.length === 0;
    return {
        passerer,
        info: seneUtsettelserPgaArbeid.map((periode) => ({
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid',
            periodeId: periode.id,
        })),
    };
}
