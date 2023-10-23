import { RegelTestresultat } from '../utils/types/regelTypes';
import {
    erPeriodeInnvilget,
    erSenUtsettelsePgaFerieEllerArbeid,
    Periodetype,
    Søknadsinfo,
    UtsettelseÅrsakType,
} from '@navikt/fp-common';

export function inneholderSenUtsettelsePgaArbeidTest(grunnlag: Søknadsinfo): RegelTestresultat {
    const seneUtsettelserPgaArbeid = grunnlag.perioder
        .filter((p) => !erPeriodeInnvilget(p, grunnlag.eksisterendeSak))
        .filter(erSenUtsettelsePgaFerieEllerArbeid)
        .filter((p) => p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Arbeid);

    const passerer = seneUtsettelserPgaArbeid.length === 0;
    return {
        passerer,
        info: seneUtsettelserPgaArbeid.map((periode) => ({
            intlKey: 'uttaksplan.validering.advarsel.planenAdvarerOmUtsettelser.arbeid',
            periodeId: periode.id,
        })),
    };
}
