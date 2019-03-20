import { Regelgrunnlag, RegelTestresultat } from '../types';
import {
    begrunnelseForSenEndringErGyldig,
    begrunnelseSenEndringMaxLength
} from '../../../util/validation/uttaksplan/begrunnelseForSenEndringValidation';

export function erBegrunnelseForSenEndringGyldigTest(grunnlag: Regelgrunnlag): RegelTestresultat {
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
