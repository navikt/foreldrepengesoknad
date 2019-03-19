import { Regel, Regelgrunnlag, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { regelHarAvvik, regelPasserer } from '../regelUtils';
import { harMorSøktUgyldigUttakFørsteSeksUker } from '../../../util/validation/uttaksplan/uttakMorValidation';

export const harMorSøktUgyldigUttakFørsteSeksUkerRegel: Regel = {
    key: RegelKey.harMorSøktUgyldigUttakFørsteSeksUker,
    alvorlighet: RegelAlvorlighet.ULOVLIG,
    test: (regel: Regel, grunnlag: Regelgrunnlag) => {
        return harMorSøktUgyldigUttakFørsteSeksUker(
            grunnlag.perioder,
            grunnlag.søknadsinfo.søknaden.familiehendelsesdato,
            grunnlag.søknadsinfo.søknaden.situasjon
        )
            ? regelPasserer(regel)
            : regelHarAvvik(regel);
    }
};
