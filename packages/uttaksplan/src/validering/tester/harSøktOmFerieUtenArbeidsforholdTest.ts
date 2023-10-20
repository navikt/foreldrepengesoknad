import { isUtsettelsePgaFerie } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const harSøktOmFerieUtenArbeidsforhold: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const harArbeidsforhold = grunnlag.arbeidsforhold.length > 0;
    return {
        passerer: harArbeidsforhold ? true : grunnlag.perioder.some(isUtsettelsePgaFerie) === false,
    };
};
