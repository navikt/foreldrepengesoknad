import { Regelgrunnlag, RegelTestresultat } from '../types';
import { begrunnelseForSenEndringErGyldig } from '../../../util/validation/uttaksplan/begrunnelseForSenEndringValidation';
import { getSeneEndringerSomKreverBegrunnelse } from '../../../util/uttaksplan/uttakUtils';

export function erBegrunnelseForSenEndringGyldigTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const { begrunnelseForSenEndring } = grunnlag.tilleggsopplysninger;
    const harPerioderSomErSeneEndringer = getSeneEndringerSomKreverBegrunnelse(grunnlag.perioder).length > 0;

    return harPerioderSomErSeneEndringer &&
        (begrunnelseForSenEndring === undefined || !begrunnelseForSenEndringErGyldig(begrunnelseForSenEndring.tekst))
        ? { passerer: false }
        : { passerer: true };
}
