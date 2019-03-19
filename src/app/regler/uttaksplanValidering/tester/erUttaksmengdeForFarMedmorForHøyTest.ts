import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';
import { erUttaksmengdeForFarMedmorForHøy } from '../../../util/validation/uttaksplan/erUttaksmengdeForFarMedmorForHøy';

export const erUttaksmengdeForFarMedmorForHøyTestTestTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
    return erUttaksmengdeForFarMedmorForHøy(
        grunnlag.perioder,
        grunnlag.tilgjengeligeStønadskontoer,
        grunnlag.søknadsinfo.søker.erFarEllerMedmor
    )
        ? regelHarAvvik(regel)
        : regelPasserer(regel);
};
