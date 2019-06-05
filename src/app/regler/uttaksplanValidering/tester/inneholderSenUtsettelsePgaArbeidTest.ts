import { Regelgrunnlag, RegelTestresultat } from '../types';
import { erSenUtsettelsePgaFerieEllerArbeid } from '../../../util/uttaksplan/uttakUtils';
import { Periodetype, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';

export function inneholderSenUtsettelsePgaArbeidTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const seneUtsettelserPgaArbeid = grunnlag.perioder
        .filter(erSenUtsettelsePgaFerieEllerArbeid)
        .filter((p) => p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Arbeid);

    const passerer = seneUtsettelserPgaArbeid.length === 0;
    return {
        passerer,
        info: seneUtsettelserPgaArbeid.map((periode) => ({
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid',
            periodeId: periode.id
        }))
    };
}
