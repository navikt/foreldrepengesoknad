import { Søknadsinfo, getIllegalChars, validateTextHasLegalChars } from '@navikt/fp-common';
import { RegelTestresultat } from '../utils/types/regelTypes';

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
