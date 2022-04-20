import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { isUtsettelsePgaArbeid } from 'uttaksplan/types/Periode';
import { getSamletStillingsprosentForArbeidsforhold } from 'app/utils/arbeidsforholdUtils';

export const harUtsettelsePgaArbeidMedDeltidUtenAvtale: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
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
