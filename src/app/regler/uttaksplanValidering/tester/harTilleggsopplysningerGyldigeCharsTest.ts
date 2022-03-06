import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';
import { getIllegalChars, validateTextHasLegalChars } from 'app/validation/fieldValidations';

export function harTilleggsopplysningerGyldigeCharsTest(grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat {
    const { begrunnelseForSenEndring } = grunnlag.tilleggsopplysninger;
    const tekst = begrunnelseForSenEndring ? begrunnelseForSenEndring.tekst : '';
    return validateTextHasLegalChars(tekst)
        ? { passerer: true }
        : {
              passerer: false,
              info: {
                  intlKey: 'valideringsfeil.begrunnelseForSenEnding.kanIkkeInneholdeTegn',
                  values: {
                      ugyldigeTegn: getIllegalChars(tekst),
                  },
              },
          };
}
