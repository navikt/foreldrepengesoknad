import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';

import { harMorSøktUgyldigUttakFørsteSeksUker } from '../../../util/validation/uttaksplan/uttakMorValidation';

export const harMorSøktUgyldigUttakFørsteSeksUkerTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    if (grunnlag.søknadsinfo.søker.erMor) {
        return {
            passerer:
                grunnlag.søknadsinfo.søker.erMor &&
                harMorSøktUgyldigUttakFørsteSeksUker(
                    grunnlag.perioder,
                    grunnlag.søknadsinfo.søknaden.familiehendelsesdato,
                    grunnlag.søknadsinfo.søknaden.situasjon
                ) === false
        };
    }

    return { passerer: true };
};
