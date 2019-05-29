import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { samtidigUttaksperiodeErUgyldig } from 'app/util/validation/uttaksplan/uttakSamtidigUttakProsentValidation';

export const erSamtidigUttakGyldig: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) =>
        samtidigUttaksperiodeErUgyldig(periode, grunnlag.søknadsinfo.søker.erFarEllerMedmor)
    );
    return {
        passerer: perioderMedUgyldigTidsperiode.length === 0,
        info: perioderMedUgyldigTidsperiode.map((periode) => ({
            periodeId: periode.id
        }))
    };
};
