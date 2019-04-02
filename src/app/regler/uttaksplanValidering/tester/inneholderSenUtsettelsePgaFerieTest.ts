import { Regelgrunnlag, RegelTestresultat } from '../types';
import { erSenUtsettelsePgaFerieEllerArbeid } from '../../../util/uttaksplan/uttakUtils';
import { Periodetype, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';

export function inneholderSenUtsettelsePgaFerieTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const inneholderSenUtsettelsePgaFerie = grunnlag.perioder
        .filter(erSenUtsettelsePgaFerieEllerArbeid)
        .some((p) => p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Ferie);

    const passerer = inneholderSenUtsettelsePgaFerie === false;
    return {
        passerer,
        info: {
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie'
        }
    };
}
