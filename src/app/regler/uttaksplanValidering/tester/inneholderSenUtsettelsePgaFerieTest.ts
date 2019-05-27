import { Regelgrunnlag, RegelTestresultat } from '../types';
import { erSenUtsettelsePgaFerieEllerArbeid } from '../../../util/uttaksplan/uttakUtils';
import { Periodetype, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';

export function inneholderSenUtsettelsePgaFerieTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const seneUtsettelsePgaFerie = grunnlag.perioder
        .filter(erSenUtsettelsePgaFerieEllerArbeid)
        .filter((p) => p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Ferie);

    const passerer = seneUtsettelsePgaFerie.length === 0;
    return {
        passerer,
        info: seneUtsettelsePgaFerie.map((periode) => ({
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie',
            periodeId: periode.id
        }))
    };
}
