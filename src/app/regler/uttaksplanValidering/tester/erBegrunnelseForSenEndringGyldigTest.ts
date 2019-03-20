import { Regelgrunnlag, RegelTestresultat } from '../types';
import { begrunnelseForSenEndringErGyldig } from '../../../util/validation/uttaksplan/begrunnelseForSenEndringValidation';

export function erBegrunnelseForSenEndringGyldigTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const { begrunnelseForSenEndring } = grunnlag.tilleggsopplysninger;

    return begrunnelseForSenEndringErGyldig(begrunnelseForSenEndring ? begrunnelseForSenEndring.tekst : '')
        ? { passerer: false }
        : { passerer: true };
}
