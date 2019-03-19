import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';
import { begrunnelseForSenEndringErGyldig } from '../../../util/validation/uttaksplan/begrunnelseForSenEndringValidation';
import { getSeneEndringerSomKreverBegrunnelse } from '../../../util/uttaksplan/uttakUtils';

export const erBegrunnelseForSenEndringGyldigTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
    const { begrunnelseForSenEndring } = grunnlag.tilleggsopplysninger;
    const harPerioderSomErSeneEndringer = getSeneEndringerSomKreverBegrunnelse(grunnlag.perioder).length > 0;

    return harPerioderSomErSeneEndringer &&
        (begrunnelseForSenEndring === undefined || !begrunnelseForSenEndringErGyldig(begrunnelseForSenEndring.tekst))
        ? regelHarAvvik(regel)
        : regelPasserer(regel);
};
