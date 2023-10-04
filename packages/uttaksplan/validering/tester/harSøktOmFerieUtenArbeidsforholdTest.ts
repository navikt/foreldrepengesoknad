import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { isUtsettelsePgaFerie } from 'uttaksplan/types/Periode';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const harSøktOmFerieUtenArbeidsforhold: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const harArbeidsforhold = grunnlag.arbeidsforhold.length > 0;
    return {
        passerer: harArbeidsforhold ? true : grunnlag.perioder.some(isUtsettelsePgaFerie) === false,
    };
};
