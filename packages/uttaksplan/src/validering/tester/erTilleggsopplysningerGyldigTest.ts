import { Søknadsinfo } from '@navikt/fp-common';
import { RegelTestresultat } from '../utils/types/regelTypes';

export const tilleggsopplysningerMaxLength = 1000;

export const maxLengthIsGreaterThanOrEqualToStringLength = (maxLength: number, value: string) => {
    return value.length <= maxLength;
};

export const tilleggsopplysningerErGyldig = (begrunnelse?: string) =>
    maxLengthIsGreaterThanOrEqualToStringLength(tilleggsopplysningerMaxLength, begrunnelse || '');

export function erTilleggsopplysningerGyldigTest(grunnlag: Søknadsinfo): RegelTestresultat {
    const { begrunnelseForSenEndring } = grunnlag.tilleggsopplysninger;
    const begrunnelseTekst = begrunnelseForSenEndring ? begrunnelseForSenEndring.tekst : '';
    return tilleggsopplysningerErGyldig(begrunnelseTekst)
        ? { passerer: true }
        : {
              passerer: false,
              info: {
                  intlKey: 'uttaksplan.veileder.fritekst.kanIkkeVæreLengreEnn',
                  values: { maxLength: tilleggsopplysningerMaxLength },
              },
          };
}
