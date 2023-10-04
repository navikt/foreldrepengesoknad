import { getIllegalChars, validateTextHasLegalChars } from 'app/utils/validationUtil';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export function harTilleggsopplysningerGyldigeCharsTest(grunnlag: Søknadsinfo): RegelTestresultat {
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
