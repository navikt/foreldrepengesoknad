import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelHarAvvik, regelPasserer } from '../regelUtils';
import { harMorSøktUgyldigUttakFørsteSeksUker } from '../../../util/validation/uttaksplan/uttakMorValidation';

export const harMorSøktUgyldigUttakFørsteSeksUkerTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
    return harMorSøktUgyldigUttakFørsteSeksUker(
        grunnlag.perioder,
        grunnlag.søknadsinfo.søknaden.familiehendelsesdato,
        grunnlag.søknadsinfo.søknaden.situasjon
    )
        ? regelPasserer(regel)
        : regelHarAvvik(regel);
};
