import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { isUtsettelsePgaFerie } from 'app/types/uttaksplan/periodetyper';

export const harSøktOmFerieUtenArbeidsforhold: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const harArbeidsforhold = grunnlag.arbeidsforhold.length > 0;
    return {
        passerer: harArbeidsforhold ? true : grunnlag.perioder.some(isUtsettelsePgaFerie) === false
    };
};
