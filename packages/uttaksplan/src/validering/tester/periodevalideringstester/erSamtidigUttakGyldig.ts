import { Søknadsinfo } from '@navikt/fp-common';
import { samtidigUttaksperiodeErUgyldig } from '../../utils/periodeValideringUtils';
import { RegelTest, RegelTestresultat } from '../../utils/types/regelTypes';

export const erSamtidigUttakGyldig: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) =>
        samtidigUttaksperiodeErUgyldig(periode, grunnlag.søkerErFarEllerMedmor),
    );
    return {
        passerer: perioderMedUgyldigTidsperiode.length === 0,
        info: perioderMedUgyldigTidsperiode.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
