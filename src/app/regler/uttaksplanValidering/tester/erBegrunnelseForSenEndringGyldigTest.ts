import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';

import {
    begrunnelseForSenEndringErGyldig,
    begrunnelseSenEndringMaxLength
} from '../../../util/validation/uttaksplan/begrunnelseForSenEndringValidation';

export function erBegrunnelseForSenEndringGyldigTest(grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat {
    const { begrunnelseForSenEndring } = grunnlag.tilleggsopplysninger;

    return begrunnelseForSenEndringErGyldig(begrunnelseForSenEndring ? begrunnelseForSenEndring.tekst : '')
        ? { passerer: true }
        : {
              passerer: false,
              info: {
                  intlKey: 'valideringsfeil.fritekst.kanIkkeVæreLengreEnn',
                  values: { maxLength: begrunnelseSenEndringMaxLength }
              }
          };
}
