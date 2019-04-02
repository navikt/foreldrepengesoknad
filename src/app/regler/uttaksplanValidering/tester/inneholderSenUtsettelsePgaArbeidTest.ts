import { Regelgrunnlag, RegelTestresultat } from '../types';
import { erSenUtsettelsePgaFerieEllerArbeid } from '../../../util/uttaksplan/uttakUtils';
import { Periodetype, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';

export function inneholderSenUtsettelsePgaArbeidTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const inneholderSenUtsettelsePgaArbeid = grunnlag.perioder
        .filter(erSenUtsettelsePgaFerieEllerArbeid)
        .some((p) => p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Arbeid);

    const passerer = inneholderSenUtsettelsePgaArbeid === false;
    return {
        passerer,
        info: {
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid'
        }
    };
}
