import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';

import { harFarMedmorSøktUgyldigUttakFørsteSeksUker } from '../../../util/validation/uttaksplan/uttakFarValidation';

export const harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest: RegelTest = (
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const {
        søknadsinfo: { søker, søknaden },
        perioder
    } = grunnlag;

    if (søker.erFarEllerMedmor) {
        return {
            passerer:
                harFarMedmorSøktUgyldigUttakFørsteSeksUker(
                    perioder,
                    søknaden.familiehendelsesdato,
                    søknaden.antallBarn,
                    søknaden.situasjon
                ) === false
        };
    }

    return { passerer: true };
};
