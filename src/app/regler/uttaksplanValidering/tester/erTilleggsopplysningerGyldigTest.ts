import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';

import {
    tilleggsopplysningerErGyldig,
    tilleggsopplysningerMaxLength,
} from '../../../util/validation/uttaksplan/tilleggsopplysningerValidation';

export function erTilleggsopplysningerGyldigTest(grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat {
    const { begrunnelseForSenEndring } = grunnlag.tilleggsopplysninger;

    return tilleggsopplysningerErGyldig(begrunnelseForSenEndring ? begrunnelseForSenEndring.tekst : '')
        ? { passerer: true }
        : {
              passerer: false,
              info: {
                  intlKey: 'valideringsfeil.fritekst.kanIkkeVæreLengreEnn',
                  values: { maxLength: tilleggsopplysningerMaxLength },
              },
          };
}
