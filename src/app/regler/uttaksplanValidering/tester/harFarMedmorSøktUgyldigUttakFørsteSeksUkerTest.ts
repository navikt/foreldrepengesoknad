import { Regel, Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { regelHarAvvik, regelPasserer } from '../regelUtils';
import { harFarMedmorSøktUgyldigUttakFørsteSeksUker } from '../../../util/validation/uttaksplan/uttakFarValidation';

export const harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest: RegelTest = (
    regel: Regel,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const {
        søknadsinfo: { søker, søknaden },
        perioder
    } = grunnlag;

    if (søker.erFarEllerMedmor && søknaden.erDeltUttak) {
        return harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            perioder,
            søknaden.familiehendelsesdato,
            søknaden.antallBarn,
            søknaden.situasjon
        )
            ? regelHarAvvik(regel)
            : regelPasserer(regel);
    }

    return regelPasserer(regel);
};
