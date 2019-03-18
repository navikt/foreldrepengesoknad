import { RegelTest, Regel, Regelgrunnlag, RegelTestresultat, RegelAlvorlighet } from '../uttaksplanValidering/types';
import { RegelKey } from '../uttaksplanValidering/regelKeys';
import { harMorSøktUgyldigUttakFørsteSeksUker } from '../../util/validation/uttaksplan/uttakMorValidation';
import { regelHarAvvik, regelPasserer } from '../uttaksplanValidering/regelUtils';

const harMorSøktUgyldigUttakFørsteSeksUkerTest: RegelTest = (
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

export const harMorSøktUgyldigUttakFørsteSeksUkerRegel: Regel = {
    key: RegelKey.harMorSøktUgyldigUttakFørsteSeksUker,
    alvorlighet: RegelAlvorlighet.ULOVLIG,
    test: harMorSøktUgyldigUttakFørsteSeksUkerTest
};
