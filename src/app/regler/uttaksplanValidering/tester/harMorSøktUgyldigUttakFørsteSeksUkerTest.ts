import { Regel, Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { regelHarAvvik, regelPasserer } from '../regelUtils';
import { harMorSøktUgyldigUttakFørsteSeksUker } from '../../../util/validation/uttaksplan/uttakMorValidation';

export const harMorSøktUgyldigUttakFørsteSeksUkerTest: RegelTest = (
    regel: Regel,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    return harMorSøktUgyldigUttakFørsteSeksUker(
        grunnlag.perioder,
        grunnlag.søknadsinfo.søknaden.familiehendelsesdato,
        grunnlag.søknadsinfo.søknaden.situasjon
    )
        ? regelHarAvvik(regel)
        : regelPasserer(regel);
};
