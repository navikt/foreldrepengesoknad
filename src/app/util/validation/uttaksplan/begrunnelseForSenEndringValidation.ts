import { maxLengthIsGreaterThanOrEqualToStringLength } from 'app/util/stringUtils';

export const begrunnelseSenEndringMaxLength = 10;

export const begrunnelseForSenEndringErGyldig = (begrunnelse?: string) =>
    maxLengthIsGreaterThanOrEqualToStringLength(begrunnelseSenEndringMaxLength, begrunnelse || '');
