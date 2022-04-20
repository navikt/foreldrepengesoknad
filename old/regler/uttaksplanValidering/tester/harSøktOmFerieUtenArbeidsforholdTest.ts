import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { isUtsettelsePgaFerie } from 'app/types/uttaksplan/periodetyper';

export const harSøktOmFerieUtenArbeidsforhold: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const harArbeidsforhold = grunnlag.arbeidsforhold.length > 0;
    return {
        passerer: harArbeidsforhold ? true : grunnlag.perioder.some(isUtsettelsePgaFerie) === false,
    };
};
