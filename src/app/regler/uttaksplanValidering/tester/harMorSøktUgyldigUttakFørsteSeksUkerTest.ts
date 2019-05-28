import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { getUgyldigUttakFørsteSeksUkerForMor } from '../../../util/validation/uttaksplan/uttakMorValidation';

export const harMorSøktUgyldigUttakFørsteSeksUkerTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    if (grunnlag.søknadsinfo.søker.erMor) {
        const ugyldigePerioder = getUgyldigUttakFørsteSeksUkerForMor(
            grunnlag.perioder,
            grunnlag.søknadsinfo.søknaden.familiehendelsesdato,
            grunnlag.søknadsinfo.søknaden.situasjon
        );
        const passerer = ugyldigePerioder.length === 0;
        return {
            passerer,
            info: ugyldigePerioder.map((periode) => ({
                periodeId: periode.id
            }))
        };
    }

    return { passerer: true };
};
