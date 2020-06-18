import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { isUtsettelsePgaArbeid } from 'app/types/uttaksplan/periodetyper';
import { getSamletStillingsprosentForArbeidsforhold } from 'app/util/domain/arbeidsforhold';

export const harUtsettelsePgaArbeidMedDeltidUtenAvtale: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const utsettelserMedDeltidUtenAvtale = grunnlag.perioder
        .filter(isUtsettelsePgaArbeid)
        .filter((periode) =>
            periode.orgnumre
                ? getSamletStillingsprosentForArbeidsforhold(periode.orgnumre, grunnlag.arbeidsforhold) < 100 &&
                  periode.harAvtaleOmFulltidForDeltidsstilling === false
                : false
        );

    return {
        passerer: utsettelserMedDeltidUtenAvtale.length === 0,
        info: utsettelserMedDeltidUtenAvtale.map((periode) => ({
            periodeId: periode.id,
            values: { antall: periode.orgnumre ? periode.orgnumre.length : 0 },
        })),
    };
};
