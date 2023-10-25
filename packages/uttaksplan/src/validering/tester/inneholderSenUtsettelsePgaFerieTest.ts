import { RegelTestresultat } from '../utils/types/regelTypes';
import {
    erPeriodeInnvilget,
    erSenUtsettelsePgaFerieEllerArbeid,
    Periodetype,
    Søknadsinfo,
    UtsettelseÅrsakType,
} from '@navikt/fp-common';

export function inneholderSenUtsettelsePgaFerieTest(grunnlag: Søknadsinfo): RegelTestresultat {
    const seneUtsettelsePgaFerie = grunnlag.perioder
        .filter((p) => !erPeriodeInnvilget(p, grunnlag.eksisterendeSak))
        .filter(erSenUtsettelsePgaFerieEllerArbeid)
        .filter((p) => p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Ferie);

    const passerer = seneUtsettelsePgaFerie.length === 0;
    return {
        passerer,
        info: seneUtsettelsePgaFerie.map((periode) => ({
            intlKey: 'uttaksplan.validering.advarsel.planenAdvarerOmUtsettelser.ferie',
            periodeId: periode.id,
        })),
    };
}
