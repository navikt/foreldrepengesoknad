import { Søknadsinfo, isUtsettelsePgaFerie } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const harSøktOmFerieUtenArbeidsforhold: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const harArbeidsforhold = grunnlag.arbeidsforhold.length > 0;
    return {
        passerer: harArbeidsforhold ? true : grunnlag.perioder.some(isUtsettelsePgaFerie) === false,
    };
};
