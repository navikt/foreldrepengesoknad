import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { samtidigUttaksperiodeErUgyldig } from '../../utils/periodeValideringUtils';

export const erSamtidigUttakGyldig: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) =>
        samtidigUttaksperiodeErUgyldig(periode, grunnlag.søkerErFarEllerMedmor)
    );
    return {
        passerer: perioderMedUgyldigTidsperiode.length === 0,
        info: perioderMedUgyldigTidsperiode.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
