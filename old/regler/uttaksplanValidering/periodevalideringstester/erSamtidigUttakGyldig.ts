import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { samtidigUttaksperiodeErUgyldig } from 'app/util/validation/uttaksplan/uttakSamtidigUttakProsentValidation';

export const erSamtidigUttakGyldig: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) =>
        samtidigUttaksperiodeErUgyldig(periode, grunnlag.søknadsinfo.søker.erFarEllerMedmor)
    );
    return {
        passerer: perioderMedUgyldigTidsperiode.length === 0,
        info: perioderMedUgyldigTidsperiode.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
