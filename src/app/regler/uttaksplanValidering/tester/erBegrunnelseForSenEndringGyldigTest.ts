import { Regelgrunnlag, RegelTestresultat } from '../types';
import { begrunnelseForSenEndringErGyldig } from '../../../util/validation/uttaksplan/begrunnelseForSenEndringValidation';
import { getSeneEndringerSomKreverBegrunnelse } from '../../../util/uttaksplan/uttakUtils';
import { SenEndringÅrsak } from '../../../types/uttaksplan/periodetyper';

export function erBegrunnelseForSenEndringGyldigTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const { begrunnelseForSenEndring } = grunnlag.tilleggsopplysninger;
    const harPerioderSomErSeneEndringer =
        getSeneEndringerSomKreverBegrunnelse(grunnlag.perioder) !== SenEndringÅrsak.Ingen;

    return harPerioderSomErSeneEndringer &&
        (begrunnelseForSenEndring === undefined || !begrunnelseForSenEndringErGyldig(begrunnelseForSenEndring.tekst))
        ? { passerer: false }
        : { passerer: true };
}
